import axios from "axios";
import { useEffect, useState } from "react"

const useGetContacts = () => {
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        const getContacts = async () => {
            setLoading(true);
            try {
                const res = await axios.get('/users');
                const data = await res.data.filteredUsers;
                // console.log(res,data);
                setConversation(data);
            } catch (error) {
                toast.error(error.message);
            }finally{
                setLoading(false);
            }

        }

        getContacts();
    }, [])
    return {loading,conversation};
}

export default useGetContacts