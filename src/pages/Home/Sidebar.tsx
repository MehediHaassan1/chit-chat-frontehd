import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { logoutUser } from "@/services/authService";
import { LogOut, Menu, Search, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    status: string;
}

interface SidebarProps {
    users: User[];
    selectedUser: User;
    onSelectUser: (user: User) => void;
}

const Sidebar = ({ users, selectedUser, onSelectUser }: SidebarProps) => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        logoutUser();
        navigate("/sign-in");
    };

    return (
        <>
            <div className="hidden md:block w-64 bg-white border-r flex-col gap-4">
                {/* User Profile */}
                <div className="p-4 border-b flex gap-4">
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src="/placeholder.svg?height=40&width=40"
                            alt="Your Avatar"
                        />
                        <AvatarFallback>YA</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-lg font-semibold">Your Name</h2>
                        <p className="text-sm text-gray-500">Your Status</p>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            type="text"
                            placeholder="Search"
                            className="pl-8"
                        />
                    </div>
                </div>

                {/* User List */}
                <ScrollArea className="flex-grow space-y-2">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className={`p-4 flex items-center cursor-pointer hover:bg-gray-100 gap-4 ${
                                selectedUser.id === user.id ? "bg-gray-100" : ""
                            }`}
                            onClick={() => onSelectUser(user)}
                        >
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src={user?.avatar}
                                    alt={user.name}
                                />
                                <AvatarFallback>
                                    {user?.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-grow overflow-hidden">
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-500 truncate">
                                    {user?.lastMessage}
                                </p>
                            </div>
                            <div
                                className={`w-2 h-2 rounded-full ${
                                    user?.status === "online"
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                }`}
                            />
                        </div>
                    ))}
                </ScrollArea>
                {/* Settings and Logout */}
                <div className="p-4 border-t flex justify-between">
                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Settings</span>
                    </Button>
                    <Button onClick={handleLogOut} variant="ghost" size="icon">
                        <LogOut className="h-5 w-5" />
                        <span className="sr-only">Log out</span>
                    </Button>
                </div>
            </div>
            {/* Drawer for small devices */}
            <Drawer direction="left">
                <div className="flex flex-col justify-between md:hidden gap-2">
                    <DrawerTrigger asChild>
                        <div className="p-2">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </div>
                    </DrawerTrigger>

                    {/* Logout Button at the bottom */}
                    <div className="p-2 border-t">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleLogOut}
                        >
                            <LogOut className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <DrawerContent className="w-4/5">
                    <div className="p-4 h-screen flex flex-col gap-4">
                        {/* User Profile */}
                        <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="Your Avatar"
                                />
                                <AvatarFallback>YA</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Your Name
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Your Status
                                </p>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative mb-4">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Search"
                                className="pl-8"
                            />
                        </div>

                        {/* User List */}
                        <ScrollArea className="flex-grow space-y-2">
                            <DrawerClose>
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        className={`p-4 flex items-center cursor-pointer hover:bg-gray-100 gap-4 ${
                                            selectedUser.id === user.id
                                                ? "bg-gray-100"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            onSelectUser(user);
                                        }}
                                    >
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage
                                                src={user.avatar}
                                                alt={user.name}
                                            />
                                            <AvatarFallback>
                                                {user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-grow overflow-hidden">
                                            <p className="font-medium">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {user.lastMessage}
                                            </p>
                                        </div>
                                        <div
                                            className={`w-2 h-2 rounded-full ${
                                                user.status === "online"
                                                    ? "bg-green-500"
                                                    : "bg-gray-300"
                                            }`}
                                        />
                                    </div>
                                ))}
                            </DrawerClose>
                        </ScrollArea>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Sidebar;
