import React, { useState } from "react";
import { Trash2,SunMoon } from 'lucide-react';


const App = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [task, setTask] = useState([])


  const submitHandler = (e) => {
    e.preventDefault();
    
    const copyTask = [...task];
    copyTask.push({title,desc})
    setTask(copyTask)

    setTitle('')
    setDesc('')
  }

  const deleteTask = (idx) => {
    const copyTask = [...task];
    
    copyTask.splice(idx, 1)
    setTask(copyTask)
  }

  return (
    <div className="h-screen lg:flex bg-gray-900 text-white dark:bg-black dark:text-white">
      <form className="flex lg:w-1/2 items-center flex-col gap-5 p-10" onSubmit={(e) => {
        submitHandler(e)
      }
    }>
        <h1 className="text-4xl  font-bold">Add Notes</h1>
          <input
            type="text"
            placeholder="Enter Notes Heading"
            value={title}
            className="px-5 w-full py-2 border-2 outline-none rounded font-medium"
            onChange={(e) => 
              setTitle(e.target.value)
            }
          />
          <textarea
            placeholder="Write Details here"
            name=""
            id=""
            value={desc}
            className="px-5 w-full h-32 py-2  border-2 rounded outline-none font-medium"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>

          <button className="bg-emerald-500 text-black active:scale-96 cursor-pointer font-medium px-5 py-2 w-1/2 rounded outline-none">
            Add Notes
          </button>        
      </form>
      <div className="flex-col p-10 lg:border-l-2">
        <h1 className="text-4xl font-bold relative">Recent Notes</h1>
        <div className="flex lg:h-[90%]  flex-wrap items-start justify-items-start gap-5 mt-5 overflow-auto scrollbar-none">
            {task.map((elem,idx) => {
              
              return <div key={idx} className="relative flex justify-between flex-col h-50 w-42 rounded-2xl bg-cover text-black py-5 px-3.5 bg-[url('https://static.vecteezy.com/system/resources/thumbnails/024/584/462/small/blank-space-white-sticky-note-png.png')]">
                <div>
                  <h3 className="leading-tight text-lg font-bold">{elem.title}</h3>
                  <p className="mt-1.5 text-wrap max-w-fit text-xs leading-tight font-semibold text-gray-500">{elem.desc}</p>
                </div>
                <button onClick={() => {
                  deleteTask(idx)
                }} className="absolute bottom-5 right-5 bg-amber-300 text-xs font-medium p-1 rounded-full cursor-pointer active:scale-97"><Trash2 color="#000000" /></button>
              </div>
            })}
        </div>
        </div>
    </div>
  );
};

export default App;
