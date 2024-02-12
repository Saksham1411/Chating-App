import { useState, useContext } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { UserContext } from "../context/UserContext";
import useGetContacts from "../hooks/useGetContacts";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useContext(UserContext);
  const { conversation } = useGetContacts();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error("Search term must be at least 3 charachter");
      return;
    }
    const searchConversation = conversation.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    
    if (searchConversation) {
      setSelectedConversation(searchConversation);
      setSearch("");
    } else {
      toast.error("No such user found!");
    }
  };
  return (
    <form className="flex items-center gap-2" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search…"
        className="max-[525px]:w-1/4 input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
