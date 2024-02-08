import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useContext(AuthContext);

    const login = async (username, password) => {
        const success = handleInputErrors(username, password);
        if (!success) return;
        setLoading(true);
        try {
            const res = await axios.post("/api/login", {
                username, password,
            });
            const data = await res.data;

            localStorage.setItem("chat-user", JSON.stringify(data));

            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, login };
}

export default useLogin;

function handleInputErrors(username, password) {
    if (!username || !password) {
        toast.error('please fill in all field');
        return false
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false
    }
    return true
}