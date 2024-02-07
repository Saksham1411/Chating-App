import useGetContacts from "../hooks/useGetContacts";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversation } = useGetContacts();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversation.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversation.length - 1}
        />
      ))}
    </div>
  );
};
export default Conversations;
