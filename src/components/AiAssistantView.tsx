import { useState } from 'react';
import { Bot, Send, User, Sparkles, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' 
});

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export default function AiAssistantView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hello! I am SANWOLF, your AI Repair Copilot. Ask me anything about troubleshooting motherboards, soldering, component replacement, smartphone repair, or circuit diagnostics.',
      timestamp: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userText = input.trim();
    setInput('');

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsGenerating(true);

    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error("Missing VITE_GEMINI_API_KEY. Please add it in Netlify Environment Variables.");
      }

      const formattedHistory = messages
        .filter(m => m.id !== '1')
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          ...formattedHistory,
          { role: 'user', parts: [{ text: userText }] }
        ],
        config: {
          systemInstruction: "You are SANWOLF, an AI Repair Copilot specialized in DIY electronics. Provide clear, step-by-step troubleshooting for motherboards, soldering, components, and general electronics repair.",
        }
      });

      const replyText = response.text || "I'm sorry, I couldn't generate a response.";

      const assistantMsg: Message = {
        id: `ast_${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error: any) {
      console.error("AI Assistant error:", error);
      const errorMsg: Message = {
        id: `err_${Date.now()}`,
        sender: 'assistant',
        text: `Error connecting to AI: ${error.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shadow-lg">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
              SANWOLF AI Assistant <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">SANWOLF Expert electronic diagnostics, component troubleshooting & repair copilot</p>
          </div>
        </div>
      </div>

      {/* Chat Log */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
              msg.sender === 'user' ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950' : 'bg-amber-400 text-stone-950 shadow-md'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm ${
              msg.sender === 'user' 
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-tr-xs' 
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 shadow-sm rounded-tl-xs'
            }`}>
              <div className="flex items-center justify-between gap-4 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                  {msg.sender === 'user' ? 'You' : 'SANWOLF'}
                </span>
                <span className="text-[10px] opacity-50">{msg.timestamp}</span>
              </div>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shadow-md animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl px-5 py-3.5 text-xs text-stone-500 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing circuit schematics & generating repair guidance...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="pt-4 border-t border-stone-200 dark:border-stone-800 flex gap-3">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about fixing a phone screen, testing resistors, reflowing ICs..."
          className="flex-1 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl px-5 py-3.5 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
        />
        <button 
          type="submit"
          disabled={!input.trim() || isGenerating}
          className="bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-black px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
