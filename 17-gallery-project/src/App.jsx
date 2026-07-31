import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import Buttons from "./components/Buttons";

const App = () => {
  const [userdata, setUserdata] = useState([]);
  const [index, setIndex] = useState(1);

  const getData = async () => {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=12`,
    );

    setUserdata(response.data);
  };

  useEffect(() => {
    getData();
  }, [index]);
  let printUserData = <h3 className="text-gray-400 text-xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading.....</h3>;

  if (userdata.length > 0) {
    printUserData = userdata.map((elem, idx) => {
      return (
        <div key={idx}>
          <Card elem={elem} />
        </div>
      );
    });
  }

  return (
    <div className="bg-black text-white h-screen p-4 overflow-auto scrollbar-none">
      <h1 className="font-bold text-4xl text-center">Image Gallery</h1>
      <div className="rounded flex h-[82%] flex-wrap shrink-0 items-center gap-4 px-14 p-3">
        {printUserData}
      </div>
      <Buttons index={index} setIndex={setIndex} setUserdata={setUserdata} />
    </div>
  );
};

export default App;
