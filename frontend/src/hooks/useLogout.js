import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useContext(AuthContext);

    const logout = async () => {
        setLoading(true);
        try {
            const res = axios.post('/logout');
            const data = await res.data;

            localStorage.removeItem("chat-user");
            setAuthUser(null);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }
    return {loading,logout};
}

export default useLogout