import React, { useState, useEffect } from "react";

interface anyProps {
  [key: string]: any;
}

const Chat = ({ socket, username, room }: anyProps) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const sendMessage = async () => {
    const messageData = {
      room: room,
      author: username,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("sendMessage", messageData);
  };

  socket.on("receiveMessage", (data: any) => {
    console.log(data);
    console.log("Reiceive Message Client");
  });

  return (
    <div>
      <h3>Chat socket</h3>
      <div className="chat-body"></div>
      <div className="chat-input">
        <input
          onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
            setCurrentMessage(event.currentTarget.value);
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
