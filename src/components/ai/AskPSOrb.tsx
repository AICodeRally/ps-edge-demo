'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatBubbleIcon, Cross2Icon, PaperPlaneIcon, MinusIcon, ReloadIcon } from '@radix-ui/react-icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AskPSOrbProps {
  appName?: string;
  enabled?: boolean;
  position?: 'fixed' | 'inline';
  className?: string;
}

export function AskPSOrb({ appName = 'PS-Edge', enabled = true, position = 'fixed', className = '' }: AskPSOrbProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/askps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          tenantId: 'ppg-main',
          department: 'professional-services',
          context: {
            currentPage: window.location.pathname,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text || 'Sorry, I received an empty response.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('AskPS error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  if (!enabled) return null;

  const quickQuestions = [
    'How do I track billable hours?',
    'What is our current team utilization?',
    'Show me active engagement status',
    'How do I create a proposal?',
  ];

  const hasActivity = isLoading || messages.length > 0;
  const pulseClass = hasActivity ? 'animate-pulse-glow' : '';

  const buttonBaseClasses = position === 'fixed'
    ? `fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl ${pulseClass} ${className}`
    : `flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl ${pulseClass} ${className}`;

  // AI orbs always use purple - don't change with brand settings
  // AskPS uses lighter, brighter purple/violet
  const buttonStyle = {
    background: 'linear-gradient(135deg, #7c3aed, #a855f7)', // purple-600 to purple-500
    boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
  };

  return (
    <>
      {/* Orb Button - Always visible */}
      {!isMinimized && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={buttonBaseClasses}
          style={buttonStyle}
          aria-label={isOpen ? "Close AskPS AI Assistant" : "Open AskPS AI Assistant"}
          title="AskPS - Professional Services AI Assistant"
        >
          <ChatBubbleIcon className={position === 'fixed' ? 'h-6 w-6' : 'h-5 w-5'} />
        </button>
      )}

      {/* Backdrop */}
      {isOpen && !isMinimized && (
        <div className="fixed inset-0 z-39" onClick={() => setIsOpen(false)} />
      )}

      {/* Chat Panel - Slides in from right */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-4 right-4 z-40 flex h-[750px] w-[600px] flex-col rounded-lg bg-white dark:bg-dark-bg-secondary shadow-2xl border border-gray-200 dark:border-dark-border-default">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-dark-border-default bg-gradient-to-r from-teal-500 to-cyan-500 p-4 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <ChatBubbleIcon className="h-6 w-6" />
              <div>
                <h3 className="font-semibold text-lg">AskPS</h3>
                <p className="text-sm text-teal-100">Professional Services AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="rounded p-1 text-xs transition-colors hover:bg-white/20"
                  aria-label="Clear chat"
                  title="Clear conversation"
                >
                  <ReloadIcon className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setIsMinimized(true)}
                className="rounded p-1 transition-colors hover:bg-white/20"
                aria-label="Minimize"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 transition-colors hover:bg-white/20"
                aria-label="Close"
              >
                <Cross2Icon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4 bg-gray-50 dark:bg-dark-bg-tertiary">
            {messages.length === 0 ? (
              <>
                {/* Welcome Message */}
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                    <ChatBubbleIcon className="h-4 w-4" />
                  </div>
                  <div className="rounded-lg bg-teal-50 dark:bg-teal-900/20 p-3 border border-teal-200 dark:border-teal-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Hi! I'm AskPS, your Professional Services AI assistant. I can help you with:
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      <li>• Client engagement strategies and best practices</li>
                      <li>• Proposal development and templates</li>
                      <li>• Time tracking and billing workflows</li>
                      <li>• Team capacity planning and utilization</li>
                    </ul>
                  </div>
                </div>

                {/* Quick Questions */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Quick questions:</p>
                  {quickQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(question)}
                      className="w-full rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary p-2 text-left text-xs text-gray-700 dark:text-gray-300 transition-colors hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-300 dark:hover:border-teal-700"
                    >
                      💡 {question}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                        <ChatBubbleIcon className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 text-sm ${
                        message.role === 'user'
                          ? 'bg-teal-600 text-white'
                          : 'bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-dark-border-default text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-headings:font-semibold prose-h1:text-base prose-h2:text-sm prose-h3:text-sm prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold prose-table:text-xs prose-th:bg-teal-50 dark:prose-th:bg-teal-900/20 prose-th:text-teal-900 dark:prose-th:text-teal-100 prose-th:font-semibold prose-th:p-2 prose-td:p-2 prose-td:border prose-td:border-gray-200 dark:prose-td:border-dark-border-default prose-hr:my-3 prose-hr:border-gray-300 dark:prose-hr:border-dark-border-default">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                      <p
                        className={`mt-1 text-xs ${
                          message.role === 'user' ? 'text-teal-100' : 'text-gray-400 dark:text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold">
                        You
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                      <ReloadIcon className="h-4 w-4 animate-spin" />
                    </div>
                    <div className="rounded-lg bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-dark-border-default p-3 text-sm text-gray-600 dark:text-gray-400">
                      <p>Analyzing your request...</p>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-dark-border-default p-4 bg-white dark:bg-dark-bg-secondary rounded-b-lg">
            {error && (
              <div className="mb-2 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-2 text-xs text-red-600 dark:text-red-400">
                ⚠️ {error}
              </div>
            )}
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about clients, projects, billing, team..."
                className="flex-1 resize-none rounded-lg border border-gray-300 dark:border-dark-border-default bg-white dark:bg-dark-bg-tertiary px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <ReloadIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <PaperPlaneIcon className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      )}

      {/* Minimized State */}
      {isOpen && isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2 text-white shadow-lg transition-all hover:shadow-xl"
        >
          <ChatBubbleIcon className="h-4 w-4" />
          <span className="text-sm font-medium">AskPS</span>
          {messages.length > 0 && (
            <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {messages.length}
            </span>
          )}
        </button>
      )}
    </>
  );
}
