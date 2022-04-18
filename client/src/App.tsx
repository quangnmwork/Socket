import React, { useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import Chat from "./Chat";
const socket = io("http://localhost:8080");
function App() {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const joinRoom = () => {
    socket.emit("joinRoom", parseInt(room));
  };
  return (
    <div className="App">
      <h2>Hello guys</h2>
      <input
        type={"text"}
        placeholder={"Username"}
        onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
          setUsername(event.currentTarget.value);
        }}
      />
      <input
        type={"text"}
        placeholder={"Username"}
        onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
          setRoom(event.currentTarget.value);
        }}
      />
      <button onClick={joinRoom}>Join</button>
      <Chat socket={socket} room={room} username={username} />
    </div>
  );
}

export default App;

