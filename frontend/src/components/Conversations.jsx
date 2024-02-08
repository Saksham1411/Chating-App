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
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  );
};
export default Conversations;
