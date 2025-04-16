'use client';

import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  const sendMessage = async () => {
    if (!input.trim()) return;
    console.log("input", input); 
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        body: JSON.stringify({ question: input }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.answer }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages([
        ...newMessages, 
        { 
          role: 'assistant', 
          content: error instanceof Error 
            ? `Sorry, an error occurred: ${error.message}` 
            : 'An unexpected error occurred' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`text-gray-600 fixed bottom-4 right-4 w-full max-w-sm bg-white border rounded-2xl shadow-xl p-4 transition-all duration-300 ease-in-out ${
      isMinimized ? 'h-16 overflow-hidden' : 'h-[500px] flex flex-col'
    }`}>
      <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={toggleMinimize}>
        <div className="flex items-center space-x-2">
          <h3 className="text-md font-semibold text-blue-600">ResumeGPT</h3>
          <span className="text-xs text-gray-400">AI Resume Assistant</span>
        </div>
        <button className="text-gray-500 hover:text-blue-600">
          {isMinimized ? '🔼' : '🔽'}
        </button>
      </div>
      
      {!isMinimized && (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto mb-2 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`text-sm ${msg.role === 'user' ? 'text-right' : 'text-left text-gray-700'}`}>
                <span className={`inline-block p-2 rounded-xl ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && <div className="text-sm text-gray-400">Thinking...</div>}
          </div>
          <div className="flex space-x-2 mt-2">
            <input
              className="text-gray-600 flex-1 border rounded-xl px-3 py-1 text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about my resume..."
            />
            <button className="bg-blue-500 text-white px-3 rounded-xl" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
