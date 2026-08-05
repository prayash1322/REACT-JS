import { useState } from "react";

function StateNumber() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
  }

  function resetCount() {
    setCount(0);
  }

  return (
    <div className="state-box">
      <h3>Number State</h3>
      <p>Count: {count}</p>
      <button onClick={increaseCount} className="btn">Add</button>
      <button onClick={resetCount}className="btn btn-reset">Reset</button>
    </div>
  );
}

export default StateNumber;
