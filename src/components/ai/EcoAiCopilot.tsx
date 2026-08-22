'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { Bot, Send, Sparkles, User, Lightbulb, ArrowRight, RefreshCw } from 'lucide-react';

export const EcoAiCopilot: React.FC = () => {
  const { chatMessages, sendChatMessage, setActiveTab } = useEco();
  const [input, setInput] = useState('');

  const sampleQuestions = [
    'I have 5 old computer wires and two broken keyboards. What can I do with them?',
    'Where can I recycle e-waste on Indore Campus?',
    'Who wants copper wire right now?',
    'How much CO₂ have I saved this month?',
    'What is the biggest sustainability problem on campus?',
    'Give me a project using plastic bottles.',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendChatMessage(input.trim());
    setInput('');
  };

  const handleQuestionClick = (q: string) => {
    sendChatMessage(q);
  };

  return (
    <div className="bg-[#0D0F17] border border-[#FF007A]/50 rounded-lg p-4 md:p-6 space-y-6 max-w-4xl mx-auto font-mono shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1D2133] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#FF007A]/20 border border-[#FF007A] flex items-center justify-center text-[#FF007A] glow-pink">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2 tracking-wider">
              FRONT MAN AI COPILOT
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF007A]/20 text-[#FF007A] border border-[#FF007A]/40 font-mono font-bold">
                ONLINE • v2.4 AI
              </span>
            </h2>
            <p className="text-xs text-[#03E5B7] font-bold">
              SQUID GAME AI Handler for waste classification, pricing, & telemetry.
            </p>
          </div>
        </div>

        <button
          onClick={() => sendChatMessage('Analyze overall campus sustainability baseline.')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#07080E] border border-[#1D2133] text-slate-300 text-xs hover:border-[#FF007A] hover:text-[#FF007A] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Chat
        </button>
      </div>

      {/* Suggested Questions Grid */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-[#FFC700] font-bold flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-[#FFC700]" /> SUGGESTED ARENA PROMPTS:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuestionClick(q)}
              className="p-2.5 rounded bg-[#07080E] border border-[#1D2133] text-left text-xs text-slate-300 hover:text-white hover:border-[#FF007A] hover:bg-[#FF007A]/10 transition-all flex items-center justify-between group"
            >
              <span className="truncate pr-2">{q}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#FF007A] flex-shrink-0 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="space-y-4 max-h-[420px] overflow-y-auto p-4 rounded bg-[#07080E] border border-[#1D2133] custom-scrollbar">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded bg-[#FF007A]/20 border border-[#FF007A]/50 flex items-center justify-center text-[#FF007A] flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-lg max-w-lg space-y-2 leading-relaxed ${
                  isUser
                    ? 'bg-[#FF007A] text-white font-bold font-sans rounded-br-none shadow-md glow-pink'
                    : 'bg-[#0D0F17] border border-[#1D2133] text-slate-200 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-line text-xs font-normal">{msg.text}</div>
                {msg.options && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {msg.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          if (opt.actionText === 'list') setActiveTab('market');
                          if (opt.actionText === 'craft') setActiveTab('reuse-ideas');
                          if (opt.actionText === 'donate') setActiveTab('community-projects');
                        }}
                        className="px-2.5 py-1 rounded bg-[#03E5B7]/20 border border-[#03E5B7]/40 text-[#03E5B7] text-[11px] font-bold hover:bg-[#03E5B7] hover:text-[#07080E] transition-colors"
                      >
                        {opt.label} →
                      </button>
                    ))}
                  </div>
                )}
                <div
                  className={`text-[9px] text-right font-mono ${
                    isUser ? 'text-white/80' : 'text-[#03E5B7]'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
              {isUser && (
                <div className="w-7 h-7 rounded bg-[#FF007A]/20 border border-[#FF007A]/40 flex items-center justify-center text-[#FF007A] flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Front Man AI about waste classification, pricing, recycling hubs..."
          className="flex-1 bg-[#07080E] border border-[#1D2133] rounded px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF007A] transition-colors font-mono"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded bg-[#FF007A] text-white font-black text-xs flex items-center gap-2 hover:bg-[#FF007A]/90 transition-opacity shadow-md glow-pink"
        >
          <span>SEND</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

