import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children})=>{
    const [selectedConversation,setSelectedConversation] = useState(null);
    const [messages,setMessages] = useState([]);
    return(
        <UserContext.Provider value={{selectedConversation,setSelectedConversation,messages,setMessages}}>
            {children} 
        </UserContext.Provider>
    )
}