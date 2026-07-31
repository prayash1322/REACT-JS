import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const App = () => {
  
  // async function getData() {
    
  //   console.log(response);
  
  // }
  
  // const getData = async () => {
  //   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  //   const data = await response.json()
  //   console.log(data);
  // }

  // const getData = async () => {
  //   const response = await axios.get('https://jsonplaceholder.typicode.com/users')  
  //   console.log(response.data);
  // }

  const [data, setData] = useState([])
  const getData = async () => {
    const response = await axios.get('https://picsum.photos/v2/list')
    console.log(response.data)

    setData(response.data)
  }
  return (
    <div>
      <button onClick={getData}>Get data</button>
      <div>
        {data.map((elem,idx) => {
          return <div key={idx}>
            <h3>Author: {elem.author}</h3>
            <img src={elem.download_url} alt="images" width={300} height={200}/>
          </div>
        })}
      </div>
    </div>
  )
}

export default App
