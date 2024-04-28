import React from "react";

import "./Footnote.styles.scss";

const Footnote = () => {
  return (
    <footer className="footer">
      <div>Sara & Clark Wedding 2024</div>
      <div>
        Copyright @ {new Date().getFullYear()} | Sara Tantisalidchai & Anthony
        Clark Perfecto
      </div>
    </footer>
  );
};

export default Footnote;
