import { useState } from "react";
import {
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Search,
  MessageCircle,
  Users,
  Archive,
  Settings,
} from "lucide-react";

const ChatSidebar = ({ chats, selectedChat, onSelectChat }) => {
  return (
    <div className="w-80 border-r border-gray-200 flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="bg-gray-50 p-4 flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600 font-semibold">ME</span>
        </div>
        <div className="flex space-x-4">
          <Users className="w-6 h-6 text-gray-600 cursor-pointer" />
          <MessageCircle className="w-6 h-6 text-gray-600 cursor-pointer" />
          <Settings className="w-6 h-6 text-gray-600 cursor-pointer" />
          <MoreVertical className="w-6 h-6 text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-2 bg-gray-50 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full py-2 px-4 pl-10 bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Archived Chats */}
      <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
        <Archive className="w-5 h-5 text-gray-600" />
        <span className="text-gray-600">Archived</span>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-gray-100 ${
              selectedChat?.id === chat.id ? "bg-gray-100" : ""
            }`}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 font-semibold">
                  {chat.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-gray-900 truncate">
                  {chat.name}
                </h3>
                <span className="text-xs text-gray-500">
                  {chat.lastMessageTime}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
              </p>
            </div>
            {chat.unreadCount > 0 && (
              <div className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {chat.unreadCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatArea = ({
  selectedChat,
  messages,
  message,
  setMessage,
  handleSend,
  handleKeyPress,
}) => {
  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-600">
            Welcome to WhatsApp
          </h2>
          <p className="text-gray-500 mt-2">Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="bg-gray-50 p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 font-semibold">
              {selectedChat.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h1 className="font-semibold">{selectedChat.name}</h1>
            <p className="text-sm text-gray-500">
              {selectedChat.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Video className="w-6 h-6 text-gray-600 cursor-pointer" />
          <Phone className="w-6 h-6 text-gray-600 cursor-pointer" />
          <Search className="w-6 h-6 text-gray-600 cursor-pointer" />
          <MoreVertical className="w-6 h-6 text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('/api/placeholder/400/400')] bg-repeat">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                msg.sender === "me"
                  ? "bg-emerald-100 rounded-br-none"
                  : "bg-white rounded-bl-none"
              }`}
            >
              <p className="text-gray-800">{msg.text}</p>
              <p className="text-xs text-gray-500 text-right mt-1">
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Paperclip className="w-6 h-6 text-gray-500 cursor-pointer" />
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-emerald-500 resize-none"
              rows="1"
            />
          </div>
          <button
            onClick={handleSend}
            className="bg-emerald-500 text-white rounded-full p-2 hover:bg-emerald-600 focus:outline-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "John Doe",
      lastMessage: "See you tomorrow!",
      lastMessageTime: "10:30",
      unreadCount: 2,
      online: true,
    },
    {
      id: 2,
      name: "Alice Smith",
      lastMessage: "Thanks for the help!",
      lastMessageTime: "09:45",
      unreadCount: 0,
      online: false,
    },
    {
      id: 3,
      name: "Bob Johnson",
      lastMessage: "How about lunch?",
      lastMessageTime: "Yesterday",
      unreadCount: 1,
      online: true,
    },
    {
      id: 4,
      name: "Emma Wilson",
      lastMessage: "Project deadline updated",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      online: false,
    },
    {
      id: 5,
      name: "Team Chat",
      lastMessage: "Meeting at 3 PM",
      lastMessageTime: "Yesterday",
      unreadCount: 5,
      online: true,
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! How are you?",
      sender: "them",
      time: "09:30",
    },
    {
      id: 2,
      text: "I'm doing great! Just working on some new features.",
      sender: "me",
      time: "09:31",
    },
    {
      id: 3,
      text: "That sounds interesting! What kind of features?",
      sender: "them",
      time: "09:32",
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: message,
          sender: "me",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <ChatSidebar
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />
      <ChatArea
        selectedChat={selectedChat}
        messages={messages}
        message={message}
        setMessage={setMessage}
        handleSend={handleSend}
        handleKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default ChatApp;
