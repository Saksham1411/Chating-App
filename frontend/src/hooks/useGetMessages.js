import React, { useContext,useEffect,useState } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios';
import toast from 'react-hot-toast';


const useGetMessages = () => {
    
    const [loading,setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useContext(UserContext);

    useEffect(()=>{
        const getMessages = async()=>{
            setLoading(true);
            try {
                const res = await axios.get(`/${selectedConversation._id}`);
                const data = await res.data.messages;
                if(!data) return;
                setMessages(data);

            } catch (error) {
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }

        if(selectedConversation?._id) getMessages();
    },[selectedConversation?._id,setMessages])

    return{messages,loading};
}

export default useGetMessages