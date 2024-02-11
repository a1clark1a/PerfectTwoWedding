import React, { useContext, useState } from "react";

import { UserContext } from "../../context/user.context";

import "./rsvp.styles.scss";
import ToggleSwitch from "../ToggleSwitch/toggleSwitch.component";
import FormInput from "../FormInput/index.component";

const defaultFormFields = {
  confirmed: [],
  denied: [],
  plusOne: "",
  addPlusOne: false,
  message: "",
} as {
  confirmed: string[];
  denied: string[];
  plusOne: string;
  addPlusOne: boolean;
  message: string;
};

const RSVP = (): React.JSX.Element => {
  const { currentUser, updateUserInviteAcceptance } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const handleGuest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    console.log(type);
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

    // text input input
    if (type === "text") {
      setFormFields({
        ...formFields,
        [name]: value,
      });
    }

    updateUserInviteAcceptance(currentUser, name, checked);
  };

  const handleAddPlusOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({
      ...formFields,
      addPlusOne: e.target.checked,
    });
  };

  const handleRSVPSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // clean and filter confirmed and denied list to ensure invitees are put in denied appropriately
    currentUser?.verifiedCode.forEach((invitee) => {
      if (!invitee.accepted && !formFields.denied.includes(invitee.name))
        formFields.denied.push(invitee.name);

      invitee?.kids?.kidsNames.forEach((kid) => {
        if (
          !formFields.confirmed.includes(kid) &&
          !formFields.denied.includes(kid)
        )
          formFields.denied.push(kid);
      });
    });

    //TODO handle Firebase call to save unto DB
  };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  console.log("formFields", formFields);

  return (
    <div className="popup-content">
      {currentUser ? (
        <form onSubmit={handleRSVPSubmit}>
          <h1>RSVP</h1>
          <div>
            <h2>Will you be attending?</h2>
            {currentUser?.verifiedCode.length &&
              currentUser.verifiedCode.map((invitee) => {
                return (
                  <div>
                    <div>
                      <h3>{invitee.name}</h3>
                      <ToggleSwitch
                        id={invitee.name}
                        name={invitee.name}
                        checked={invitee.accepted}
                        onChange={handleGuest}
                      />
                    </div>
                    {invitee.kids &&
                      invitee.kids.kidsNames.length &&
                      invitee.kids.allowKids && (
                        <div>
                          <h3>Kids</h3>
                          {/* ENSURE ONLY 1 INVITEE HAS ARRAY OF KIDS */}
                          {invitee.kids.kidsNames.map((kid) => {
                            return (
                              <div>
                                <h4>{kid}</h4>
                                <ToggleSwitch
                                  id={kid}
                                  name={kid}
                                  checked={formFields.confirmed.includes(kid)}
                                  onChange={handleGuest}
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
                          onChange={handleAddPlusOne}
                        />
                        {formFields.addPlusOne && (
                          <FormInput
                            label={"Guest Name"}
                            inputOptions={{
                              type: "text",
                              name: "plusOne",
                              value: formFields.plusOne,
                              required: formFields.addPlusOne,
                              onChange: handleGuest,
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
