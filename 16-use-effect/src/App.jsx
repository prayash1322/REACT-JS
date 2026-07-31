import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  // const [num, setNum] = useState(0);
  // const [num2, setNum2] = useState(100);

  // useEffect(() => {
  //   console.log("Use effect is running!!");
  // },[num]);

  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  function aChaning() {
    console.log("A ki value change hogai saar");
  }
  
  function bChaning() {
    console.log("B ki value change hogai saar");
  }

  useEffect(() => {
    console.log("Use effect is running my friend");
  },[a])
  
  return (
    <div>
      {/* <h1>{num}</h1>
      <h1>{num2}</h1>
      <button
        onMouseEnter={() => {
          setNum(num + 1);
        }}
        onMouseLeave={() => {
          setNum2(num2 + 10);
        }}
      >
        Hover Me
      </button> */}
      <h1>A is {a}</h1>
      <h1>A is {b}</h1>
      <button onClick={() => {
        setA(a+1);
      }}>Change A</button>
      <button onClick={() => {
        setB(b-1);
      }}>Change B</button>
    </div>
  );
};

export default App;
