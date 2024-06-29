import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<string[]>([])
useEffect(()=>{

  const socket =  new WebSocket("ws://localhost:8080")

  socket.onopen=()=>{
    console.log("connected....")
    setSocket(socket)
  }
  socket.onmessage = (message)=>{
    console.log("message Recieved",message.data)
    // update the previous message 
   setMessages(prev=>[...prev,message.data])
  }
  return ()=>{
     socket.close() //cleanup
  }
},[])
  return (
    <>
    <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value);}} />
    <button onClick={()=>{socket?.send(message);setMessage("")}}>send </button>
{messages.map((msg)=><div>
  {msg}
</div>)}
    </>
  )
}

export default App
