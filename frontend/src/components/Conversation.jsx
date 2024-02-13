import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } =
    useContext(UserContext);

  const { onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
      <div className="divider py-0 h-1" />
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded py-1 pl-2 cursor-pointer
            ${
              selectedConversation?._id === conversation._id ? "bg-sky-500 p-2" : ""
            }`}
        onClick={(e) => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full max-[525px]:w-6">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Conversation;
