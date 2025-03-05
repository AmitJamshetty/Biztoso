import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:5000");

const Room = () => {
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      console.log("room joined", room);
      setShowChat(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 min-h-screen bg-linear-to-r from-red-500 to-blue-500">
      {!showChat ? (
        <div>
          <h2 className="text-lg font-semibold">Join a chat</h2>
          <div className="my-6">
            <input
              type="text"
              placeholder="Enter room id..."
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="bg-white px-4 py-1.5 rounded-sm outline-none text-base"
            />
            <button
              onClick={() => {
                joinRoom();
              }}
              className="bg-blue-800 px-4 py-1.5 text-white rounded-sm text-base outline-none"
            >
              Join a room!
            </button>
          </div>
        </div>
      ) : (
        <Chat socket={socket} room={room} />
      )}
    </div>
  );
};

export default Room;