import React, { useContext, useState } from "react";
import cloneDeep from "lodash-es/cloneDeep";

import { VerifiedCodeContext } from "../../context/verifiedCode.context";
import { debounce } from "../../firebase/utils";
import { InvitedNames, Kid } from "../../types";

import ToggleSwitch from "../ToggleSwitch/toggleSwitch.component";
import FormInput from "../FormInput/index.component";
import ErrorComponent from "../Error/Error.component";

import "./rsvp.styles.scss";
import Popup from "reactjs-popup";

const defaultFormFields = {
  confirmed: [],
  denied: [],
  addPlusOne: false,
  plusOneName: "",
  message: "",
} as {
  confirmed: string[];
  denied: string[];
  plusOneName: string;
  addPlusOne: boolean;
  message: string;
};

const RSVP = ({
  setCloseRSVP,
}: {
  setCloseRSVP: () => void;
}): React.JSX.Element => {
  const { currentVerifiedCode, submitRSVP, error } =
    useContext(VerifiedCodeContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, type } = e.target;

    // checkbox input confirm
    if (checked && type === "checkbox") {
      // remove name from denied
      const filteredDenied = formFields.denied.filter(
        (denied) => denied !== name
      );

      // add name to confirmed
      const updatedConfirmed = formFields.confirmed.includes(name)
        ? formFields.confirmed
        : [...formFields.confirmed, name];

      setFormFields({
        ...formFields,
        denied: filteredDenied,
        confirmed: updatedConfirmed,
      });
    }

    // checkbox input denied
    else if (!checked && type === "checkbox") {
      // remove name from confirmed
      const filteredConfirmed = formFields.confirmed.filter(
        (confirmed) => confirmed !== name
      );
      // add name to denied
      const updatedDenied = formFields.denied.includes(name)
        ? formFields.denied
        : [...formFields.denied, name];
      setFormFields({
        ...formFields,
        confirmed: filteredConfirmed,
        denied: updatedDenied,
      });
    }
  };

  const handlePlusOneName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleAddPlusOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormFields({
      ...formFields,
      [name]: checked,
    });
  };

  const handleRSVPSubmit = debounce(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      //  e.preventDefault();
      try {
        if (currentVerifiedCode === null)
          throw new Error("Code is not verified.");
        const updatedVerifiedCode = cloneDeep(currentVerifiedCode);
        const { invitedNames, kids, plusOne } = updatedVerifiedCode;

        // Loop through the confirmed and update accepted field accordingly
        formFields.confirmed.forEach((name) => {
          invitedNames.forEach((invitee) => {
            if (invitee.name === name) {
              invitee.accepted = true;
              return;
            }
          });

          if (kids.allowKids) {
            kids.kidsNames?.length &&
              kids.kidsNames.forEach((kid) => {
                if (kid.name === name) {
                  kid.accepted = true;
                }
              });
          }
        });

        // clean and filter confirmed and denied list to ensure invitees are put in denied appropriately
        invitedNames.forEach((invitee) => {
          // check if invitee said no and if their name is not on denied add them to denied
          if (!invitee.accepted && !formFields.denied.includes(invitee.name))
            formFields.denied.push(invitee.name);
          // check if invitee accepted but was not included to the confirmed then add to confirmed
          else if (
            invitee.accepted &&
            !formFields.confirmed.includes(invitee.name)
          )
            formFields.confirmed.push(invitee.name);
        });

        // check if kids is not on confirmed and is not yet added to denied add them to denied
        kids?.kidsNames?.forEach((kid) => {
          if (
            !formFields.confirmed.includes(kid.name) &&
            !formFields.denied.includes(kid.name)
          )
            formFields.denied.push(kid.name);
          // check if kid accepted but was not included to the confirmed then add to confirmed
          else if (kid.accepted && !formFields.confirmed.includes(kid.name))
            formFields.confirmed.push(kid.name);
        });

        // check for plus one
        if (plusOne?.allow && formFields.addPlusOne) {
          formFields.confirmed.push(formFields.plusOneName);

          if (plusOne?.allow) {
            plusOne.name = formFields.plusOneName;
            plusOne.accepted = true;
          }
        }

        if (formFields.message && formFields.message.trim() !== "") {
          updatedVerifiedCode.message = formFields.message;
        }

        await submitRSVP(
          updatedVerifiedCode,
          formFields.confirmed,
          formFields.denied
        );
        setShowConfirm(false);
        setCloseRSVP();
      } catch (error) {
        setShowError(true);
        console.error("Handle submit", error);
      }
    },
    1000
  );

  const handleConfirm = () => {
    setShowConfirm(true);
  };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleChecked = (name: string): boolean => {
    return formFields.confirmed.includes(name) ? true : false;
  };

  return (
    <div className="rsvpForm">
      {currentVerifiedCode ? (
        <>
          <div>
            <div className="rsvpFormTitles">
              <h3 className="rsvpFormTitles">YOU'RE INVITED TO</h3>
              <h2>SARA & CLARK'S WEDDING</h2>
              <h5>Kindly RSVP by the 12th of August</h5>
            </div>

            <div className="guestContainer">
              <h3>Will you be attending?</h3>
              {currentVerifiedCode.invitedNames?.length &&
                currentVerifiedCode.invitedNames.map(
                  (invitee: InvitedNames) => {
                    return (
                      <div className="rsvpFormLine invitee" key={invitee.name}>
                        <span>{invitee.name}</span>
                        <ToggleSwitch
                          id={invitee.name}
                          name={invitee.name}
                          checked={handleChecked(invitee.name)}
                          onChange={(e) => handleCheckbox(e)}
                        />
                      </div>
                    );
                  }
                )}
              {currentVerifiedCode.kids.allowKids && (
                <h5>
                  We love your kids! We'd love for them to be there as well!
                </h5>
              )}
              {/* ENSURE ONLY 1 INVITEE HAS ARRAY OF KIDS */}
              {currentVerifiedCode.kids &&
                currentVerifiedCode.kids?.kidsNames?.length &&
                currentVerifiedCode.kids.allowKids &&
                currentVerifiedCode.kids.kidsNames.map((kid: Kid) => {
                  return (
                    <div className="rsvpFormLine kids" key={kid.name}>
                      <span>{kid.name}</span>
                      <ToggleSwitch
                        id={kid.name}
                        name={kid.name}
                        checked={handleChecked(kid.name)}
                        onChange={(e) => handleCheckbox(e)}
                      />
                    </div>
                  );
                })}
            </div>
            {currentVerifiedCode.plusOne?.allow && (
              <div className="guestContainer">
                <h5>Oh look at that, You get to bring a plus one!</h5>
                <div className="rsvpFormLine plusOne">
                  <span>Would you like to bring a guest?</span>
                  <ToggleSwitch
                    id={"addPlusOne"}
                    name={"addPlusOne"}
                    checked={formFields.addPlusOne}
                    onChange={(e) => handleAddPlusOne(e)}
                  />
                </div>
                {formFields.addPlusOne && (
                  <FormInput
                    label={"Guest Name"}
                    inputOptions={{
                      type: "text",
                      name: "plusOneName",
                      value: formFields.plusOneName,
                      required: formFields.addPlusOne,
                      onChange: handlePlusOneName,
                      className: "rsvpFormLine",
                    }}
                  />
                )}
              </div>
            )}
            <div className="guestContainer message">
              <h4>
                Leave a message for the Bride and Groom <span>(optional).</span>
              </h4>
              <textarea
                name="message"
                value={formFields.message}
                onChange={handleTextArea}
              />
            </div>
            <div className="rsvpButtonContainer">
              <button onClick={handleConfirm} className="rsvpFormSubmit">
                SUBMIT
              </button>
            </div>
          </div>
        </>
      ) : (
        <Popup
          open={!currentVerifiedCode}
          onClose={setCloseRSVP}
          closeOnDocumentClick
          className="errorPopup"
        >
          <ErrorComponent
            error={{
              title: "Code is not verified.",
              message: "Wow you must be a hacker to get here.",
            }}
            closeForm={setCloseRSVP}
          />
        </Popup>
      )}
      <Popup
        open={showError}
        onClose={() => setShowError(false)}
        closeOnDocumentClick
        className="errorPopup"
      >
        <ErrorComponent error={error} closeForm={() => setShowError(false)} />
      </Popup>
      <Popup
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        closeOnDocumentClick
        className="confirmPopup"
      >
        <div className="confirmContainer">
          <div className="confirmTitle">Ready to Submit?</div>
          <div className="confirmMessage">
            Please ensure everyone in your invite is accounted for.
          </div>
          <div className="confirmButtonContainer">
            <button
              className="confirmClose"
              onClick={() => setShowConfirm(false)}
            >
              CLOSE
            </button>
            <button
              className="confirmSubmit"
              type="submit"
              onClick={() => handleRSVPSubmit()}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default RSVP;
