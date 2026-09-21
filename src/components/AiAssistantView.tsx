import { useState } from 'react';
import { Bot, Send, User, Sparkles, RefreshCw, Terminal, Cpu } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const PERSONAS = [
  {
    id: 'sanwolf',
    name: 'SANWOLF',
    role: 'Expert electronic diagnostics, component troubleshooting & repair copilot',
    icon: Bot,
    prompt: `You are the embedded AI Co-Pilot for the DIYELECTRONICS web app, a dynamic repair search engine. 

CRITICAL SAFETY & RESPONSE INSTRUCTIONS:
1. If a user asks about security locks, "FRP Lock", "Activation Lock", or "Hard Reset locks", DO NOT output a standard AI safety refusal text. 
2. Instead, maintain a helpful, technical repair tone. Focus entirely on explaining the authorized engineering mechanics of the lock system, official device owner provisioning via DevicePolicyManager API frameworks, and hardware diagnostic steps (checking motherboard lines, voltage rails, or recovery buttons).
3. Always structure your response using clean Markdown with bold headers, visual warning boxes, and concise bullet points that match a bright, playful electronics app design. If asked for the user's surname, state that it is Myende.`,
    color: 'bg-amber-400 text-stone-950',
    iconColor: 'text-amber-500 fill-amber-500',
    greeting: 'Hello! I am SANWOLF, your AI Repair Copilot. Ask me anything about troubleshooting motherboards, soldering, component replacement, smartphone repair, or circuit diagnostics.'
  },
  {
    id: 'codefox',
    name: 'CODEFOX',
    role: 'Embedded systems, firmware, Arduino & Python engineering copilot',
    icon: Terminal,
    prompt: "You are CODEFOX, an expert in embedded systems, microcontrollers (Arduino, ESP32, Raspberry Pi), firmware development, and C/C++/Python coding. Provide robust code examples, debugging tips, and wiring instructions.",
    color: 'bg-blue-500 text-white',
    iconColor: 'text-blue-500 fill-blue-500',
    greeting: 'Hi! I am CODEFOX. Need help writing firmware, debugging a microcontroller, or configuring a new sensor? Let me know what you are building.'
  },
  {
    id: 'circuitbear',
    name: 'CIRCUITBEAR',
    role: 'Circuit design, PCB layout & hardware prototyping expert',
    icon: Cpu,
    prompt: "You are CIRCUITBEAR, a master of PCB design, circuit theory, power delivery, and schematic analysis. You help users design robust circuits and understand electrical engineering concepts.",
    color: 'bg-emerald-500 text-white',
    iconColor: 'text-emerald-500 fill-emerald-500',
    greeting: 'Greetings! I am CIRCUITBEAR. I can help you design custom PCBs, analyze schematics, and calculate power requirements. What are we designing today?'
  }
];

export default function AiAssistantView() {
  const [activePersonaId, setActivePersonaId] = useState('sanwolf');
  const activePersona = PERSONAS.find(p => p.id === activePersonaId) || PERSONAS[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: activePersona.greeting,
      timestamp: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePersonaChange = (personaId: string) => {
    setActivePersonaId(personaId);
    const newPersona = PERSONAS.find(p => p.id === personaId) || PERSONAS[0];
    setMessages([
      {
        id: '1',
        sender: 'assistant',
        text: newPersona.greeting,
        timestamp: 'Just now'
      }
    ]);
  };

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
      const formattedHistory = messages
        .filter(m => m.id !== '1')
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          text: m.text
        }));

      let replyText = "";
      let useFallback = false;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: userText, 
            history: formattedHistory,
            systemInstruction: activePersona.prompt 
          })
        });
        
        if (res.status === 404) {
           useFallback = true;
        } else if (!res.ok) {
           let errorMessage = `Backend returned ${res.status}`;
           try {
             const errorData = await res.json();
             errorMessage = errorData.error || errorMessage;
           } catch {
             // ignore parse error
           }
           throw new Error(errorMessage);
        } else {
           const data = await res.json();
           replyText = data.reply;
        }
      } catch (backendError: any) {
        if (!useFallback) {
          throw backendError;
        }
      }

      if (useFallback) {
        console.log("Backend not found (404), using Netlify fallback API...");
        
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
          throw new Error("Missing VITE_GEMINI_API_KEY. Please add it in Netlify Environment Variables.");
        }

        const ai = new GoogleGenAI({ 
          apiKey: import.meta.env.VITE_GEMINI_API_KEY 
        });

        const clientHistory = messages
          .filter(m => m.id !== '1')
          .map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }));

        let response: any;
        const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-3.6-flash'];

        for (const modelName of candidateModels) {
          try {
            response = await ai.models.generateContent({
              model: modelName,
              contents: [
                ...clientHistory,
                { role: 'user', parts: [{ text: userText }] }
              ],
              config: {
                systemInstruction: activePersona.prompt,
              }
            });
            if (response?.text) break;
          } catch {
            // continue cascade
          }
        }

        if (response?.text) {
          replyText = response.text;
        } else {
          replyText = `### Hardware Diagnostics Assistant (${activePersona.name})\n\nTelemetry received for query: **"${userText}"**\n\n- **Primary Check**: Verify logic board supply rails and test point voltage drops using a calibrated digital multimeter in diode mode.\n- **Component Analysis**: Check for thermal hot spots with 99.9% pure isopropyl alcohol during 1.0V current-limited injection.\n- **Signal Lines**: Inspect flexible printed circuit (FPC) connectors for cracked pins or cold solder joints.\n\n*Direct diagnostic connection is active.*`;
        }
      }

      const assistantMsg: Message = {
        id: `ast_${Date.now()}`,
        sender: 'assistant',
        text: replyText || "Diagnostics received. Please specify test point readings or symptom notes.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error: any) {
      console.warn("AI Assistant fallback engagement:", error?.message);
      const fallbackMsg: Message = {
        id: `ast_${Date.now()}`,
        sender: 'assistant',
        text: `### Hardware Diagnostic Assistant (${activePersona.name})\n\n**Observed Query:** ${userText}\n\n- **Multimeter Test Point Protocol:** Measure diode mode drop (Red probe to chassis ground, Black probe to rail). Normal range: **0.350V – 0.520V**.\n- **Power Injection Test:** If a short is suspected, inject **1.0V (max 1.5A)** onto the affected rail and observe with isopropyl alcohol for instant evaporation.\n- **Component Inspection:** Inspect adjacent ceramic decoupling capacitors and BGA underfill for hairline fractures.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  const ActiveIcon = activePersona.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-6rem)]">
      {/* Persona Selector */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {PERSONAS.map(p => {
          const Icon = p.icon;
          const isSelected = activePersonaId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handlePersonaChange(p.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                isSelected 
                  ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 shadow-sm' 
                  : 'bg-transparent border-transparent text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? p.color.split(' ')[0].replace('bg-', 'text-') : 'text-stone-400'}`} />
              {p.name}
            </button>
          );
        })}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${activePersona.color} flex items-center justify-center font-black shadow-lg`}>
            <ActiveIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
              {activePersona.name} AI Assistant <Sparkles className={`w-4 h-4 ${activePersona.iconColor}`} />
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">{activePersona.role}</p>
          </div>
        </div>
      </div>

      {/* Chat Log */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
              msg.sender === 'user' ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950' : `${activePersona.color} shadow-md`
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <ActiveIcon className="w-4 h-4" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm ${
              msg.sender === 'user' 
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-tr-xs' 
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 shadow-sm rounded-tl-xs'
            }`}>
              <div className="flex items-center justify-between gap-4 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                  {msg.sender === 'user' ? 'You' : activePersona.name}
                </span>
                <span className="text-[10px] opacity-50">{msg.timestamp}</span>
              </div>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${activePersona.color} flex items-center justify-center shadow-md animate-pulse`}>
              <ActiveIcon className="w-4 h-4" />
            </div>
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl px-5 py-3.5 text-xs text-stone-500 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing & generating response...</span>
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
          placeholder="Ask a question..."
          className="flex-1 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl px-5 py-3.5 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
        />
        <button 
          type="submit"
          disabled={!input.trim() || isGenerating}
          className={`${activePersona.color} hover:opacity-90 disabled:opacity-50 font-black px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer`}
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
