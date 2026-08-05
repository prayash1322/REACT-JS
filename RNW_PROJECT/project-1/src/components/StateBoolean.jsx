import { useState } from "react";

function StateBoolean() {
  const [isVisible, setIsVisible] = useState(false);

  function toggleVisible() {
    setIsVisible(!isVisible);
  }

  function resetVisible() {
    setIsVisible(false);
  }

  return (
    <div className="state-box">
      <h3>Boolean State</h3>
      <p>Status: {isVisible ? "Visible" : "Hidden"}</p>
      {isVisible && <p>You can see this text now.</p>}
      <button onClick={toggleVisible} className="btn">Toggle</button>
      <button onClick={resetVisible} className="btn btn-reset">Reset</button>
    </div>
  );
}

export default StateBoolean;
