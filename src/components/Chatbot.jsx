import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiX, FiMessageSquare, FiLoader } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi there! I'm Manju's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(scrollToBottom, [messages, currentTypingText]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Typing animation for assistant
  useEffect(() => {
    if (currentMessageIndex !== null && messages[currentMessageIndex]?.role === 'assistant') {
      const fullText = messages[currentMessageIndex].content;
      let i = 0;
      setIsTyping(true);
      setCurrentTypingText('');
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setCurrentTypingText(fullText.slice(0, ++i));
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setCurrentMessageIndex(null);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [currentMessageIndex, messages]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function toggleChat() {
    setIsOpen(o => !o);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    // add user
    setMessages(m => [...m, { role: 'user', content: input }]);
    const userIndex = messages.length + 1;
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5678/webhook/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: input }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages(m => [...m, { role: 'assistant', content: data[0].output }]);
      setCurrentMessageIndex(userIndex + 1);
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Sorry, I had trouble connecting.' }]);
      setCurrentMessageIndex(userIndex + 1);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Floating Chat Toggle */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-20 right-6 p-4 rounded-full bg-primary-light dark:bg-primary-dark text-white shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open chat"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity:0, y:20, scale:0.95 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:20, scale:0.95 }}
            transition={{ duration:0.3 }}
            className="fixed bottom-20 right-6 w-96 h-[500px] bg-white dark:bg-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-primary-light dark:bg-primary-dark text-white">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <motion.div
                      animate={{ scale:[1,1.2,1], rotate:[0,360] }}
                      transition={{ duration:3, repeat:Infinity }}
                      className="text-primary-light text-xl font-bold"
                    >M</motion.div>
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"
                      animate={{ scale:[1,1.2,1] }}
                      transition={{ duration:2, repeat:Infinity }}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold">Manju's Personal AI</h3>
                  <p className="text-xs opacity-80">Ask me anything about Manjunathan!</p>
                </div>
              </div>
              {/* New X button in header */}
              <button onClick={toggleChat} className="text-white hover:opacity-80">
                <FiX size={20}/>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity:0, y:10 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ duration:0.3 }}
                    className={`flex ${msg.role==='user'?'justify-end':'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role==='user'
                        ? 'bg-teal-500 dark:bg-teal-700 text-white rounded-tr-none'
                        : 'bg-gray-100 dark:bg-slate-700 rounded-tl-none'
                    }`}>
                      {i===currentMessageIndex && isTyping
                        ? <p>{currentTypingText}<span className="animate-pulse">|</span></p>
                        : <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown
                              components={{
                                a: ({node, ...props}) => (
                                  <a {...props}
                                     target="_blank"
                                     rel="noopener noreferrer"
                                     className="text-blue-500 hover:underline"/>
                                )
                              }}
                            >{msg.content}</ReactMarkdown>
                          </div>
                      }
                    </div>
                  </motion.div>
                ))}
                {/* Typing indicator */}
                {isLoading && (
                  <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 dark:bg-slate-700 rounded-tl-none">
                      <div className="flex space-x-2">
                        {[0,1,2].map(idx=>(
                          <motion.div key={idx}
                            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                            animate={{ y:[0,-5,0] }}
                            transition={{ duration:0.5, repeat:Infinity, delay:idx*0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e=>setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 p-2 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-slate-800"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={`p-2 rounded-r-lg ${
                    isLoading||!input.trim()
                      ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                      : 'bg-primary-light dark:bg-primary-dark hover:opacity-90'
                  } text-white`}
                >
                  {isLoading ? <FiLoader className="animate-spin" /> : <FiSend />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;