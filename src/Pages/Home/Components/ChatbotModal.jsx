
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import useAxios from "../../../Hooks/useAxios";

export default function ChatbotModal({ isOpen, onClose }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);
    const axiosInstance = useAxios()

    // Scroll to bottom automatically when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message
        const userMessage = { type: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        const question = input;
        setInput("");

        try {
            const res = await axiosInstance.post("/chatbot", { question } );

            // Wrap bot message with type
            const botMessage = { type: "bot", text: res.data.response };
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            const errorMessage = { type: "bot", text: "Something went wrong." };
            setMessages((prev) => [...prev, errorMessage]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur p-4">
            <div className="bg-gray-900 w-full max-w-md min-h-96 md:min-h-112 md:min-w-4xl rounded-xl shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center bg-primary text-white p-4 rounded-t-xl">
                    <h2 className="text-lg font-semibold">BuyNest Chat Bot</h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Chat messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-100">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`p-2 rounded-lg max-w-full wrap-break-word ${msg.type === "user"
                                    ? "bg-primary self-end text-white"
                                    : "bg-secondary  self-start text-white"
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex p-4 border-t border-gray-200 ">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your question..."
                        className="flex-1 rounded-l-lg border border-gray-300 text-white p-2 focus:outline-none"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-primary text-white px-4 rounded-r-lg"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}