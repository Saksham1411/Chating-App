import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';


const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useContext(AuthContext);
    const { setSelectedConversation } = useContext(UserContext);
    const logout = async () => {
        setLoading(true);
        try {
            const res = axios.post('/logout');
            // const data = await res.data;

            localStorage.removeItem("chat-user");
            setAuthUser(null);
            setSelectedConversation(null);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }
    return { loading, logout };
}

export default useLogout