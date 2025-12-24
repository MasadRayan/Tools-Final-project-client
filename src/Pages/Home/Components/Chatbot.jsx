import React, { useState } from 'react';
import { FaRobot } from "react-icons/fa6";
import ChatbotModal from './ChatbotModal';

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className='cursor-pointer bg-primary text-white px-4 py-4 rounded-full'>
                <FaRobot size={30} />

            </button>
            <ChatbotModal isOpen={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default Chatbot;