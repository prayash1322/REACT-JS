import React from 'react'

const App = () => {
  const user = {
    name:"prayash",
    age:19,
    city:"Surat",
    state:"Gujrat"
  }

  localStorage.setItem('user', JSON.stringify(user))
  const users = JSON.parse(localStorage.getItem('user'))

  

  return (
    <div>
      <h1>{users.name} ,{users.age}</h1>
    </div>
  )
}

export default App
