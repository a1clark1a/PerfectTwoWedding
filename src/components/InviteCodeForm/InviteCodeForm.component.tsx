import React, { useContext } from "react";

import { VerifiedCodeContext } from "../../context/verifiedCode.context";

import "./InviteCodeForm.styles.scss";
import FormInput from "../FormInput/index.component";

const InviteCodeForm = ({ closeForm }: { closeForm?: () => void }) => {
  const { getCode, inviteCode, setInviteCode } =
    useContext(VerifiedCodeContext);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value;
    setInviteCode(newCode);
  };

  const handleInviteCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getCode();
    if (closeForm) {
      closeForm();
    }
  };

  return (
    <form onSubmit={handleInviteCode} className="inviteCodeForm">
      <div className="inviteTitleContainer">
        <h3>Welcome!</h3>
        <h4>TO SARA & CLARK'S WEDDING</h4>
        <h6>we would love for you to share this memory with us.</h6>
      </div>
      <div className="inviteInputContainer">
        <FormInput
          label="Please enter your one of a kind Code"
          inputOptions={{
            type: "text",
            onChange: handleInput,
            name: "InviteCode",
            value: inviteCode,
            required: true,
            placeholder: "Invite Code",
            autoComplete: "on",
            className: "inviteFormInput",
          }}
        />
        <button type="submit">Enter</button>
      </div>
    </form>
  );
};

export default InviteCodeForm;
