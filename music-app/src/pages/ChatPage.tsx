import { useState } from "react";

interface Message {
  sender: string;
  message: string;
}

interface User {
  name: string;
  avatar: string;
}

const users: User[] = [
  { name: "Jeremy Ballin", avatar: "/kato.png" },
  { name: "Habib Rizieq", avatar: "/asdasd.jpg" },
  { name: "ilovebimay", avatar: "/5e16ca10995c5509708b56b9fbfe0d7f2da8d7e6.jpg" },
];

const ChatRoomPage = () => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Record<string, Message[]>>({
    "Jeremy Ballin": [{ sender: "You", message: "Hey bro!" }],
    "Habib Rizieq": [{ sender: "Habib Rizieq", message: "Sudah makan Firza?" }],
    "ilovebimay": [{ sender: "ilovebimay", message: "kerjain gslc dengerin lagu" }],
  });
  const [input, setInput] = useState<string>("");

  const sendMessage = () => {
    if (!input.trim() || !activeUser) return;
    setChats((prev) => ({
      ...prev,
      [activeUser.name]: [...(prev[activeUser.name] || []), { sender: "You", message: input }],
    }));
    setInput("");
  };

  if (activeUser) {
    return (
      <div className="flex flex-col min-h-screen bg-[#1B1B1B] text-white p-4 gap-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setActiveUser(null)}
            className="text-white font-semibold hover:underline"
          >
            &larr; Back
          </button>
          <div className="text-xl font-bold font-ethos">{activeUser.name}</div>
          <div />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 px-2">
          {chats[activeUser.name]?.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[75%] px-3 py-2 rounded-lg ${
                msg.sender === "You"
                  ? "bg-green-600 self-end ml-auto"
                  : "bg-gray-700 self-start"
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs text-white/60">{msg.sender}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 rounded-lg bg-black text-white outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 px-4 py-2 rounded-lg text-white font-bold"
          >
            Send
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen from-[#2B2B2B] to-[#202020] bg-gradient-to-b p-4 md:p-20 text-white">
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-bold font-ethos mb-4">Messages</h1>
        {users.map((user) => (
          <div
            key={user.name}
            onClick={() => setActiveUser(user)}
            className="flex items-center gap-4 p-3 bg-black/50 rounded-xl cursor-pointer hover:bg-black/70"
          >
            <img src={user.avatar} alt="" className="size-12 rounded-full aspect-square" />
            <div className="flex flex-col">
              <h1 className="font-ethos font-bold">{user.name}</h1>
              <p className="text-sm text-white/70">
                {chats[user.name]?.slice(-1)[0]?.message || "No messages yet"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoomPage;
