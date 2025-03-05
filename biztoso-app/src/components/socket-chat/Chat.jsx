import { useEffect, useRef, useState } from "react";

const Chat = ({ socket, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState("");
  // console.log(socket);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        username: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((prev) => [...prev, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const fetchedUsername = JSON.parse(localStorage.getItem("username"));
    if (fetchedUsername) {
      setUsername(fetchedUsername);
    }
  }, []);

  useEffect(() => {
    // console.log("change in socket!");
    socket.on("receive_message", (data) => {
      // console.log(data);
      setMessageList((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message"); // Cleanup
    };
  }, [socket]);

  // console.log(messageList);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-2 border-gray-500 w-96 h-96">
        {/* top */}
        <div className="flex justify-center items-center bg-black py-2">
          <h2 className="text-xl font-sans text-white">Live Chat</h2>
        </div>
        {/* center */}
        <div className="h-[41vh] overflow-y-scroll scrollbar-hide p-4">
          {messageList.map((data) => {
            // console.log(data.username);
            // console.log(username);
            const isSentByMe = data.username === username;
            return (
              <div
                className={`flex flex-col mb-4 ${
                  isSentByMe ? "items-end" : "items-start"
                }`}
              >
                <div className="mb-1">
                  <span
                    className={`rounded-sm px-2 text-base text-white py-1 ${
                      isSentByMe ? "bg-blue-800" : "bg-green-700"
                    }`}
                  >
                    {data.message}
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="text-xs">{data.time}</span>
                  <span
                    className={`text-sm font-semibold ${
                      isSentByMe ? "hidden" : ""
                    }`}
                  >
                    {data.username}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* bottom */}
        <div className="flex items-center mt-auto">
          <input
            type="text"
            placeholder="Hey..."
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="border-1 border-gray-500 bg-white rounded-sm flex-1 px-2 py-2 outline-none"
          />
          <div className="flex justify-center items-center bg-blue-800 text-white w-20 py-1.75 rounded-sm">
            <button
              onClick={() => {
                sendMessage();
              }}
              className="text-xl outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;