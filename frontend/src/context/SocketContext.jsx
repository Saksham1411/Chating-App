import io from 'socket.io-client';
import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    if(authUser){
        const socket = io("https://chatapp-backend-sabz.onrender.com",{
          transports: ["websocket"],
            withCredentials:true,

        });
        socket.auth = {userId:authUser._id};
        setSocket(socket);

        socket.on("getOnlineUsers",(users)=>{
          setOnlineUsers(users);
        })

        // return ()=> socket.close();
    }else{
        if(socket){
            socket.close();
            setSocket(null);
        }
    }

  }, [authUser]);

  return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>;
};
 