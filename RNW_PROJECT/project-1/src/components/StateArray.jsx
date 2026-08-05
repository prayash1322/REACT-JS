import { useState } from "react";

function StateArray() {
  const [items, setItems] = useState(["Apple", "Banana"]);

  function addItem() {
    setItems([...items, "Item " + (items.length + 1)]);
  }

  function resetItems() {
    setItems(["Apple", "Banana"]);
  }

  return (
    <div className="state-box">
      <h3>Array State</h3>
      <ul className="student-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={addItem} className="btn">Add Item</button>
      <button onClick={resetItems}className="btn btn-reset">Reset</button>
    </div>
  );
}

export default StateArray;
