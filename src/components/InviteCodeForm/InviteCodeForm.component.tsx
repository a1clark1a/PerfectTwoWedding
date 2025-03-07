import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

import FormInput from "../FormInput/index.component";
import ErrorComponent from "../Error/Error.component";

import { VerifiedCodeContext } from "../../context/verifiedCode.context";

import "./InviteCodeForm.styles.scss";
import logo from "../../images/logo.png";
import Loading from "../Loading/Loading.component";

const InviteCodeForm = ({
  closeForm,
  isFullPage,
}: {
  closeForm?: () => void;
  isFullPage?: boolean;
}) => {
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { getCode, inviteCode, setInviteCode, error } =
    useContext(VerifiedCodeContext);
  const navigate = useNavigate();

  const validateInput = (input: string) => {
    const pattern = /^[A-Za-z0-9&]*$/; // Allow only alphanumeric and "&" symbol
    if (input.length > 20) {
      return false;
    }
    if (!pattern.test(input)) {
      return false;
    }
    return true;
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value;
    validateInput(newCode) && setInviteCode(newCode);
    setShowError(false);
  };

  const handleInviteCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await getCode();

      // for small version
      closeForm && closeForm();

      // for landing page
      setTimeout(() => {
        setLoading(false);
        isFullPage && navigate("/home");
      }, 1000);
    } catch (err) {
      setLoading(false);
      setShowError(true);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleInviteCode}
        className={`inviteCodeForm ${isFullPage ? "fullPage" : ""}`}
      >
        {isFullPage && (
          <div className="imgContainer">
            <img
              src={logo ? logo : "https://fakeimg.pl/300x300?text=i+broke"}
              sizes=""
              alt="logo"
              className="logoImage"
            />
          </div>
        )}
        <div className="inviteTitleContainer">
          <h3>Welcome!</h3>
          <h4>TO SARA & CLARK'S WEDDING</h4>
          <h6>we would love for you to share this memory with us.</h6>
        </div>
        <div className="inviteInputContainer">
          <FormInput
            label="Please enter your one of a kind code"
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
          <button
            type="submit"
            disabled={loading}
            className={loading ? "buttonDisabled" : ""}
          >
            Enter
          </button>
        </div>
      </form>
      {!isFullPage && (
        <div className="modal">
          <button className="close" onClick={closeForm}>
            &times;
          </button>
        </div>
      )}
      <Loading loading={loading} />
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
    </div>
  );
};

export default InviteCodeForm;
