import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";

export default function Room() {
  const location = useLocation();
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { userID, roomID } = location.state || {};

  useEffect(() => {
    if (!userID || !roomID) {
      navigate("/");
    }
    const newSocket = io("http://localhost:3000");
    newSocket.emit("join-room", roomID, userID);
    setSocket(newSocket);
  }, [userID, roomID, navigate]);

  useEffect(() => {
    if (socket == null) return;

    socket.on("connect", () => {
      setIsConnected(true);
    });

    return () => {
      socket.off("connect");
    };
  }, [socket]);
  return (
    <>
      <p>
        Here are the values: {userID} {roomID}
      </p>
      <p>{isConnected ? "Connected" : "not Connected"}</p>
    </>
  );
}
