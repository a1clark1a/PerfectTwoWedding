import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

import FormInput from "../FormInput/index.component";
import ErrorComponent from "../Error/Error.component";

import { VerifiedCodeContext } from "../../context/verifiedCode.context";

import "./InviteCodeForm.styles.scss";

const InviteCodeForm = ({
  closeForm,
  isFullPage,
}: {
  closeForm?: () => void;
  isFullPage?: boolean;
}) => {
  const [showError, setShowError] = useState<boolean>(false);
  const { getCode, inviteCode, setInviteCode, error } =
    useContext(VerifiedCodeContext);
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value;
    setInviteCode(newCode);
    setShowError(false);
  };

  const handleInviteCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await getCode();
      isFullPage && navigate("/home");
      closeForm && closeForm();
    } catch (err) {
      setTimeout(() => {
        setShowError(true);
      }, 500);
    }
  };

  return (
    <>
      <form
        onSubmit={handleInviteCode}
        className={`inviteCodeForm ${isFullPage ? "fullPage" : ""}`}
      >
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
      {!isFullPage && (
        <div className="modal">
          <button className="close" onClick={closeForm}>
            &times;
          </button>
        </div>
      )}
      <Popup
        open={showError}
        onClose={() => {
          setShowError(false);
        }}
        closeOnDocumentClick
        className="errorPopup"
      >
        <ErrorComponent error={error} closeForm={() => setShowError(false)} />
      </Popup>
    </>
  );
};

export default InviteCodeForm;
