import { useState } from "react";

function StateString() {
  const [text, setText] = useState("Hello");

  function updateText() {
    setText("Updated text at " + new Date().toLocaleTimeString());
  }

  function resetText() {
    setText("Hello");
  }

  return (
    <div className="state-box">
      <h3>String State</h3>
      <p>{text}</p>
      <button onClick={updateText} className="btn">Update</button>
      <button onClick={resetText} className="btn btn-reset">Reset</button>
    </div>
  );
}

export default StateString;
