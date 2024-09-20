import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smile, Paperclip, Send } from "lucide-react";

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

interface MessageOutletProps {
    selectedUser: User;
    messages: Message[];
    newMessage: string;
    setNewMessage: (value: string) => void;
    handleSendMessage: () => void;
}

const MessageOutlet = ({
    selectedUser,
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
}: MessageOutletProps) => {
    return (
        <div className="flex-grow flex flex-col bg-white shadow-md rounded-lg overflow-hidden gap-4">
            {/* Header */}
            <div className="p-4 border-b flex items-center gap-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage
                        src={selectedUser?.avatar}
                        alt={selectedUser?.name}
                    />
                    <AvatarFallback>
                        {selectedUser?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-lg font-semibold">
                        {selectedUser?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {selectedUser?.status === "online"
                            ? "Online"
                            : "Offline"}
                    </p>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-grow p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.sender === "You"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`rounded-lg p-2 ${
                                message.sender === "You"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-900"
                            }`}
                        >
                            <p>{message.content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {message.timestamp}
                            </p>
                        </div>
                    </div>
                ))}
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Smile />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Paperclip />
                    </Button>
                    <Input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow"
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleSendMessage}
                    >
                        <Send />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MessageOutlet;
