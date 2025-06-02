import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Settings, Smile, Paperclip } from 'lucide-react';
import { assets } from '../assets/assets';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: 'Hi there! 😊 We have a 10% promo code for new customers! 🎁 Would you like to get one?',
      from: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, from: 'user' }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "I'm just a demo bot 🤖", from: 'bot' }]);
    }, 600);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-600 to-cyan-400 text-white p-5 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-[520px] bg-white rounded-3xl shadow-2xl flex flex-col border border-gray-200 animate-fadeIn z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white flex items-center justify-between px-4 py-3 rounded-t-3xl">
            <div className="flex items-center gap-3">
              <img
                src={assets.profile_pic}
                alt="Avatar"
                className="w-9 h-9 rounded-full border-2 border-white shadow"
              />
              <div>
                <div className="font-semibold">Jessica Cowles</div>
                <div className="text-xs opacity-80">We’re online</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="hover:text-white/80 transition">
                <Settings size={18} />
              </button>
              <button onClick={toggleChat} className="hover:text-white/80 transition">
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-3 text-sm space-y-3 scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-gray-200">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                      : 'bg-gray-200 text-gray-900'
                  } shadow`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="flex gap-2 px-4 py-2">
              <button
                onClick={() => setInput('Yes, sure!')}
                className="text-xs px-4 py-2 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
              >
                Yes, sure!
              </button>
              <button
                onClick={() => setInput('No, thanks.')}
                className="text-xs px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                No, thanks.
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center gap-2 px-4 py-3 border-t bg-white rounded-b-3xl">
            <button className="text-gray-500 hover:text-blue-500 transition">
              <Smile size={20} />
            </button>
            <button className="text-gray-500 hover:text-blue-500 transition">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-cyan-400 outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
