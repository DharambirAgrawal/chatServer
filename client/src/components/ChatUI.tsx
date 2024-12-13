import { useState } from "react";
import {
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Search,
} from "lucide-react";

const ChatUI = () => {
  const [message, setMessage] = useState("");
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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 font-semibold">JD</span>
          </div>
          <div>
            <h1 className="font-semibold">John Doe</h1>
            <p className="text-sm">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Video className="w-6 h-6 cursor-pointer" />
          <Phone className="w-6 h-6 cursor-pointer" />
          <Search className="w-6 h-6 cursor-pointer" />
          <MoreVertical className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* Chat Area */}
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
      <div className="bg-gray-50 p-4">
        <div className="flex items-center space-x-2">
          <Paperclip className="w-6 h-6 text-gray-500 cursor-pointer" />
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-emerald-500 resize-none"
              rows={1}
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

export default ChatUI;
