import { useState } from "react";
import Sidebar from "./Sidebar";
import MessageOutlet from "./MessageOutlet";

interface User {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    status: string;
}

interface Message {
    id: string;
    sender: string;
    recipientId: string;
    content: string;
    timestamp: string;
}

const initialMessages: Message[] = [
    {
        id: "1",
        sender: "User 1",
        recipientId: "1",
        content: "Hi there!",
        timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        }),
    },
    {
        id: "2",
        sender: "User 1",
        recipientId: "2",
        content: "Hello there!",
        timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        }),
    },
];

const users: User[] = [
    {
        id: "1",
        name: "User 1",
        avatar: "https://example.com/user1.jpg",
        lastMessage: "Hi there!",
        status: "online",
    },
    {
        id: "2",
        name: "User 2",
        avatar: "https://example.com/user2.jpg",
        lastMessage: "Hello there!",
        status: "offline",
    },
    {
        id: "3",
        name: "User 3",
        avatar: "https://example.com/user3.jpg",
        lastMessage: "Hey there!",
        status: "away",
    },
    {
        id: "4",
        name: "User 4",
        avatar: "https://example.com/user4.jpg",
        lastMessage: "How are you?",
        status: "busy",
    },
];

const Home = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState<User>(users[0]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg: Message = {
                id: (messages.length + 1).toString(),
                sender: "You",
                recipientId: selectedUser.id,
                content: newMessage.trim(),
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages([...messages, newMsg]);
            setNewMessage("");
        }
    };

    return (
        <div className="container mx-auto flex h-screen bg-gray-100 gap-4 md:gap-6 p-4 md:p-6">
            {/* Sidebar */}
            <Sidebar
                users={users}
                selectedUser={selectedUser}
                onSelectUser={setSelectedUser}
            />

            {/* Message Outlet */}
            <MessageOutlet
                selectedUser={selectedUser}
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
            />
        </div>
    );
};

export default Home;
