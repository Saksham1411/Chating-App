import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';

const useSignup = () => {
    const [loading, setLoading] = useState(false);

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success) return;
        setLoading(true);
        try {
            // const resp = await axios.get("/users");
            const res = await axios.post("/signup", {
                fullName, username, password, confirmPassword, gender
            });
            const data = await res.data;
            console.log(res);
            console.log(data);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, signup };
}

export default useSignup

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('please fill in all field');
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Password do not match')
        return false
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false
    }

    return true
}