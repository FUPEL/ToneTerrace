import { useState } from "react";
import { renderImage } from "@/lib/cdn";
import { House } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
    sender: string;
    message: string;
}

interface User {
    name: string;
    avatar: string;
}

const chatUsers: User[] = [
    { name: "Jeremy Ballin", avatar: "/kato.png" },
    { name: "Habib Rizieq", avatar: "/asdasd.jpg" },
    { name: "ilovebimay", avatar: "/5e16ca10995c5509708b56b9fbfe0d7f2da8d7e6.jpg" },
];

const leaderboardUsers = [
    { name: "Fupel", rank: 1 },
    { name: "Jeremi Ballin", rank: 2 },
    { name: "Lillith (You)", rank: 3 },
    { name: "mrroblok28", rank: 4 },
    { name: "ravicolle", rank: 5 },
    { name: "Kanyewestlover911", rank: 6 },
    { name: "ilovebimay", rank: 7 },
    { name: "Andy", rank: 8 },
    { name: "Toml Suyorki", rank: 9 },
    { name: "PLayBoIKiTTY7", rank: 10 },
    { name: "manggaerok", rank: 11 },
    { name: "luveea", rank: 12 },
    { name: "kucinglierliwil", rank: 13 },
    { name: "mlawmwlaw", rank: 14 },
];

const SocialPage = () => {
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
                    <button onClick={() => setActiveUser(null)} className="text-white font-semibold hover:underline">
                        &larr; Back
                    </button>
                    <div className="text-xl font-bold font-ethos">{activeUser.name}</div>
                    <div />
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 px-2">
                    {chats[activeUser.name]?.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`max-w-[75%] px-3 py-2 rounded-lg ${msg.sender === "You" ? "bg-green-600 self-end ml-auto" : "bg-gray-700 self-start"}`}
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
                    <button onClick={sendMessage} className="bg-green-600 px-4 py-2 rounded-lg text-white font-bold">
                        Send
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen from-[#2B2B2B] to-[#202020] bg-gradient-to-b p-4 md:p-20 text-white">
            <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto w-full">
                <div className="flex flex-col gap-12 w-full">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between items-center mb-4">
                            <Link to="/">
                                <House color="#ffffff" />
                            </Link>
                            <h1 className="font-ethos font-bold text-2xl">Social</h1>
                        </div>
                        <div className="bg-[#1B1B1B] p-4 rounded-2xl w-full flex flex-col">
                            {/* <div className="grid grid-cols-3 justify-evenly gap-2 md:gap-8"> */}
                                <div className="grid grid-cols-3 justify-evenly gap-2 md:gap-8">
                                    <Link to={`/profile/${"Jeremy Ballin"}`} className="flex flex-col items-center">
                                        <div className="relative aspect-square">
                                            <img src={renderImage('/kato.png', 'image')} className="rounded-full aspect-square w-fit" alt="" />
                                            <div className="absolute size-8 rounded-full bg-green-400 right-4 bottom-0"></div>
                                        </div>
                                        <h1 className="font-ethos text-xs md:text-sm font-bold">Jeremy Ballin</h1>
                                        <h2 className="font-ethos text-xs md:text-sm">I Hope You Ejac</h2>
                                    </Link>
                                    <Link to={`/profile/${"Habib Rizieq"}`} className="flex flex-col items-center">
                                        <img src={renderImage('/asdasd.jpg', 'image')} className="rounded-full aspect-square w-fit" alt="" />
                                        <h1 className="font-ethos text-xs md:text-sm font-bold">Habib Rizieq</h1>
                                    </Link>
                                    <Link to={`/profile/${"ilovebimay"}`} className="flex flex-col items-center">
                                        <img src={renderImage('/5e16ca10995c5509708b56b9fbfe0d7f2da8d7e6.jpg', 'image')} className="rounded-full aspect-square w-fit" alt="" />
                                        <h1 className="font-ethos text-xs md:text-sm font-bold">ilovebimay</h1>
                                    </Link>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1B1B1B] py-4 rounded-2xl w-full">
                        <h1 className="font-ethos font-black text-xl md:text-4xl px-4 mb-2">Messages</h1>
                        <div className="flex flex-col font-ethos">
                            {chatUsers.map((user) => (
                                <div key={user.name} className="flex flex-row items-center p-3 bg-black/50 gap-4 cursor-pointer" onClick={() => setActiveUser(user)}>
                                    <img src={renderImage(user.avatar, "image")} className="size-12 rounded-full aspect-square w-fit" alt="" />
                                    <div className="flex flex-col gap-0.5">
                                        <h1 className="font-ethos text-xs md:text-sm font-bold">{user.name}</h1>
                                        <h1 className="font-ethos text-xs md:text-sm text-white/70">
                                            {chats[user.name]?.slice(-1)[0]?.sender === "You" ? "You: " : ""}{chats[user.name]?.slice(-1)[0]?.message || "No messages yet"}
                                        </h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-[#1B1B1B] py-4 rounded-2xl w-full">
                    <h1 className="font-ethos font-black text-xl md:text-4xl px-4 mb-2">Leaderboard</h1>
                    <div className="flex flex-col font-ethos">
                        {leaderboardUsers.map((user, index) => (
                            <div key={index} className="flex flex-row items-center p-3 bg-black/50 gap-4">
                                <div className="flex w-8 justify-center items-center text-center">
                                    {user.rank <= 3 ? (
                                        <img src={`/RANK${user.rank}.png`} className="size-8 rounded-full aspect-square w-fit" alt="" />
                                    ) : (
                                        <span>{user.rank}</span>
                                    )}
                                </div>
                                <h1 className="font-ethos text-xs md:text-sm font-bold">{user.name}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialPage;