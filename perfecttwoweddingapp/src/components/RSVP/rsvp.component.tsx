import React, { useContext, useState } from "react";

import { UserContext } from "../../context/user.context";

import "./rsvp.styles.scss";
import ToggleSwitch from "../ToggleSwitch/toggleSwitch.component";
import FormInput from "../FormInput/index.component";
import { debounce, submitRSVPToFirebase } from "../../firebase/utils";
import { Kid } from "../../types";

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
  const { currentUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);

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
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (currentUser === null) throw new Error("No User detected");
        const updatedCurrentUser = currentUser;

        // Loop through the confirmed and update accepted field accordingly
        formFields.confirmed.forEach((name) => {
          updatedCurrentUser?.verifiedCode.forEach((invitee) => {
            if (invitee.name === name) {
              invitee.accepted = true;
              return;
            } else if (invitee?.kids?.allowKids) {
              invitee.kids.kidsNames.length &&
                invitee.kids.kidsNames.forEach((kid) => {
                  if (kid.name === name) {
                    kid.accepted = true;
                  }
                });
            }
          });
        });

        // clean and filter confirmed and denied list to ensure invitees are put in denied appropriately
        updatedCurrentUser?.verifiedCode.forEach((invitee) => {
          // check if invitee said no and if their name is not on denied add them to denied
          if (!invitee.accepted && !formFields.denied.includes(invitee.name))
            formFields.denied.push(invitee.name);
          // check if invitee accepted but was not included to the confirmed then add to confirmed
          else if (
            invitee.accepted &&
            !formFields.confirmed.includes(invitee.name)
          )
            formFields.confirmed.push(invitee.name);

          // check if kids is not on confirmed and is not yet added to denied add them to denied
          invitee?.kids?.kidsNames.forEach((kid) => {
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
          if (invitee?.plusOne?.allow && formFields.addPlusOne) {
            formFields.confirmed.push(formFields.plusOneName);
            updatedCurrentUser?.verifiedCode.forEach((invitee) => {
              if (invitee?.plusOne?.allow) {
                invitee.plusOne.name = formFields.plusOneName;
                invitee.plusOne.accepted = true;
              }
            });
          }
        });

        updatedCurrentUser.submit = {
          submittedOn: new Date(),
          submitted: true,
        };

        if (formFields.message && formFields.message.trim() !== "") {
          updatedCurrentUser.message = formFields.message;
        }
        await submitRSVPToFirebase(
          updatedCurrentUser,
          formFields.confirmed,
          formFields.denied
        );

        console.log("RSVP Submitted");

        setCloseRSVP();
      } catch (error) {
        console.error("Handle submit error", error);
      }
    },
    1000
  );

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
    <div className="popup-content">
      {currentUser ? (
        <form
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            //TODO ADD A CONFIRMATION WARNING
            await handleRSVPSubmit(e);
          }}
        >
          <h1>RSVP</h1>
          <div>
            <h2>Will you be attending?</h2>
            {currentUser?.verifiedCode?.length &&
              currentUser.verifiedCode.map((invitee) => {
                return (
                  <div>
                    <div>
                      <h3>{invitee.name}</h3>
                      <ToggleSwitch
                        id={invitee.name}
                        name={invitee.name}
                        checked={handleChecked(invitee.name)}
                        onChange={(e) => handleCheckbox(e)}
                      />
                    </div>
                    {invitee.kids &&
                      invitee.kids.kidsNames.length &&
                      invitee.kids.allowKids && (
                        <div>
                          <h3>Kids</h3>
                          {/* ENSURE ONLY 1 INVITEE HAS ARRAY OF KIDS */}
                          {invitee.kids.kidsNames.map((kid: Kid) => {
                            return (
                              <div>
                                <h4>{kid.name}</h4>
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
                      )}

                    {invitee.plusOne?.allow && (
                      <div>
                        <h3>Would you like to bring a guest?</h3>
                        <ToggleSwitch
                          id={"addPlusOne"}
                          name={"addPlusOne"}
                          checked={formFields.addPlusOne}
                          onChange={(e) => handleAddPlusOne(e)}
                        />
                        {formFields.addPlusOne && (
                          <FormInput
                            label={"Guest Name"}
                            inputOptions={{
                              type: "text",
                              name: "plusOneName",
                              value: formFields.plusOneName,
                              required: formFields.addPlusOne,
                              onChange: handlePlusOneName,
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            <label>
              Leave a message for the Bride and Groom.<span>(optional)</span>
            </label>
            <textarea
              name="message"
              value={formFields.message}
              onChange={handleTextArea}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>No User Detected</div>
      )}
    </div>
  );
};

export default RSVP;
