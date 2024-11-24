import React from "react";
import ChatUser from "./ChatUser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import Loading from "../../components/Loading.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  return (
    <div className="w-[70%] bg-slate-900 text-gray-300">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div>
          <ChatUser />
          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(92vh - 8vh)" }}
          >
            <Messages />
          </div>
          <Typesend />
        </div>
      )}
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-center text-xl">
          Welcom <span>{authUser.user.fullName}</span>
          <br />
          No chat selected, please start conversation by selecting anyone to
          your contacts
        </h1>
      </div>
    </>
  );
};
