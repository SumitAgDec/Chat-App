import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext.jsx'
import sound from '../assets/notification.mp3'
import useConversation from '../zustand/useConversation.js'
function useGetSocketMessage() {
    const { socket } = useSocketContext()
    const { messages, setMessage } = useConversation()

    useEffect(() => {
        socket.on("newMessage", (newMessage) => {
            const notification = new Audio(sound);
            notification.play()
            setMessage([...messages, newMessage]);
        });
        return () => {
            socket.off("newMessage");
        }
    }, [socket, messages, setMessage])
}

export default useGetSocketMessage;
