import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../context/SocketContext'
import { UserContext } from '../context/UserContext';

const useListenMessages = () => {
    const { socket } = useContext(SocketContext);
    const { messages, setMessages } = useContext(UserContext);

    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            setMessages([...messages,newMessage]);
        })

        return ()=> socket?.off("newMessage");
    },[socket,setMessages,messages])
}

export default useListenMessages