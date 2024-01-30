import React, { useContext } from "react";

import { UserContext } from "../../context/user.context";

import "./rsvp.styles.scss";

const RSVP = (): React.JSX.Element => {
  const { currentUser } = useContext(UserContext);

  const RenderInvitees = () => {
    if (currentUser) {
      return (
        <div>
          <h2>Will you be attending?</h2>
          {currentUser.verifiedCode.length &&
            currentUser.verifiedCode.map((invitee) => {
              return (
                <div>
                  <div>
                    <h3>{invitee.name}</h3>
                    <button>Yes</button>
                    <button>No</button>
                  </div>
                  {invitee.kids &&
                    invitee.kids.kidsNames.length &&
                    invitee.kids.allowKids && (
                      <div>
                        <h3>Kids</h3>
                        {invitee.kids.kidsNames.map((kid) => {
                          return (
                            <div>
                              <h4>{kid}</h4>
                              <button>Yes</button>
                              <button>No</button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  {invitee.plusOne && (
                    <div>
                      <h3>Plus One</h3>
                      <button>Yes</button>
                      <button>No</button>
                      <label>Name</label>
                      <input type="text" />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      );
    }
    return <div></div>;
  };
  return (
    <div className="popup-content">
      <form>
        <h1>RSVP</h1>
        <RenderInvitees />
      </form>
    </div>
  );
};

export default RSVP;
