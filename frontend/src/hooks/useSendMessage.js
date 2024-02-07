import React, { useContext,useState } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios';
import toast from 'react-hot-toast';


const useSendMessage = () => {

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useContext(UserContext);
    
    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await axios.post(`/send/${selectedConversation._id}`, { message });
            const data = await res.data;

            setMessages([...messages,data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { sendMessage, loading };
}

export default useSendMessage