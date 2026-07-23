import React from 'react'
import Card from './components/card'

const App = () => {
  return (
    <div className="parent">
      <Card username="Prayash" age={19} img="https://images.unsplash.com/photo-1780174604929-42437e465a44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8Q0R3dXdYSkFiRXd8fGVufDB8fHx8fA%3D%3D"/>
      <Card username="Priyanshu" age={18} img="https://images.unsplash.com/photo-1782235640284-60045a6e4cfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8Q0R3dXdYSkFiRXd8fGVufDB8fHx8fA%3D%3D"/>
      <Card username="Om" age={18} img="https://images.unsplash.com/photo-1774816064876-10a893fc79e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D"/>
      <Card username="Naved" age={17} img="https://images.unsplash.com/photo-1784032754239-4cdcd0df1348?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D"/>
    </div>
  )
}

export default App  