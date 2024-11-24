import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Erro in logged out");
    }
  };
  return (
    <div className="h-[10vh] bg-slate-800">
      <div>
        <BiLogOutCircle
          onClick={handleLogout}
          className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300"
        />
      </div>
    </div>
  );
}

export default Logout;
