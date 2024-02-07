import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

const Message = ({ message }) => {
  const { authUser } = useContext(AuthContext);
  const { selectedConversation } = useContext(UserContext);

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const bubblebgColor = fromMe ? "bg-blue-500" : "";

  const date = new Date(message.createdAt);
  const formattedTime = date.toLocaleTimeString("en-US");

  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
          </div>
        </div>
        <div className={`chat-bubble text-white ${bubblebgColor}`}>
          {message.message}
        </div>
        <div className="chat-footer opacity-50 flex gap-1 items-center text-xs">{formattedTime}</div>
      </div>
    </>
  );
};

export default Message;
