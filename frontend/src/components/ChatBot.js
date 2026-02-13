import React, { useState, useRef, useEffect } from 'react';
import { getGroqResponse } from '../utils/groqService';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your CinemaMate AI Assistant. 🎬 How can I help you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: inputValue, isBot: false }];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    // Call Groq AI
    // Context: Hardcoded for now, but could be dynamic from props/store
    const context = `
      Cinema Name: CinemaMate
      Location: Mumbai, India
      Ticket Prices: Silver (₹150), Gold (₹200), Premium (₹300)
      Current Movies: Jawan (Action), Oppenheimer (Drama), Gadar 2 (Action)
      Show Timings: 10:00 AM, 1:00 PM, 4:00 PM, 7:00 PM, 10:00 PM
      Food: Popcorn (₹150), Nachos (₹200), Coke (₹100)
      Offers: Use code GOLD10 for 10% off on Gold seats.
    `;

    const botResponse = await getGroqResponse(inputValue, context);
    
    setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-cinema-black/95 backdrop-blur-md border border-cinema-gold/30 rounded-2xl w-80 h-96 mb-4 shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-cinema-gold to-yellow-600 p-4 flex justify-between items-center">
            <h3 className="font-bold text-cinema-black flex items-center gap-2">
              <span>🤖</span> CinemaMate AI
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-cinema-black hover:text-white transition-colors font-bold"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cinema-gray/30">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`
                    max-w-[80%] p-3 rounded-xl text-sm
                    ${msg.isBot 
                      ? 'bg-cinema-dark/80 text-white rounded-tl-none border border-cinema-gray/20' 
                      : 'bg-cinema-red text-white rounded-tr-none shadow-md'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                 <div className="bg-cinema-dark/80 text-cinema-gray text-xs p-3 rounded-xl rounded-tl-none border border-cinema-gray/20 animate-pulse">
                   Thinking...
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-cinema-gray/20 bg-cinema-dark/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-cinema-black border border-cinema-gray/30 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-cinema-gold/50 transition-colors"
              />
              <button 
                type="submit"
                className="bg-cinema-gold hover:bg-yellow-500 text-cinema-black p-2 rounded-full transition-colors flex items-center justify-center w-10 h-10 shadow-lg"
              >
                ➤
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl
          transition-all duration-300 hover:scale-110 active:scale-95
          ${isOpen ? 'bg-cinema-gray text-white rotate-90' : 'bg-gradient-to-br from-cinema-gold to-yellow-600 text-cinema-black animate-bounce'}
        `}
      >
        {isOpen ? '✕' : '🤖'}
      </button>
    </div>
  );
};

export default ChatBot;
