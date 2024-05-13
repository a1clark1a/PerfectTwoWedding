import React from "react";
import { Error } from "../../types";
import "./Error.styles.scss";
import errorImage from "../../images/errorhandling-robots-01.png";

const ErrorComponent = ({
  error,
  closeForm,
}: {
  error: Error;
  closeForm: () => void;
}) => {
  return (
    <div className="errorComp">
      <img
        src={
          errorImage ? errorImage : "https://fakeimg.pl/300x300?text=i+broke"
        }
        sizes=""
        alt="Error"
        className="errorImage"
      />
      <div className="errorCompTitle">Oh no!</div>
      <div className="errorCompTitle">{error.title}</div>
      <div className="errorCompMessage">{error.message}</div>
      <div className="errorButtonContainer">
        <button className="goBackButton" onClick={closeForm}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
