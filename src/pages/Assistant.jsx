import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { sanitizeInput } from '../utils/sanitize';
import './Assistant.css';

const Assistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am VoteWise AI, your election assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [language, setLanguage] = useState('en-IN');
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        
        // Auto-send when voice input finishes
        if (event.results[0].isFinal) {
          submitQuery(transcript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser.");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    // Remove markdown asterisks for better speech parsing
    utterance.text = text.replace(/\*/g, '');
    window.speechSynthesis.speak(utterance);
  };

  const submitQuery = React.useCallback(async (queryText) => {
    const sanitizedQuery = sanitizeInput(queryText);
    if (!sanitizedQuery) return;

    const userMessage = { id: Date.now(), text: sanitizedQuery, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponseText = await getGeminiResponse(sanitizedQuery, language);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponseText, isBot: true }]);
      speakText(botResponseText);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMsg = "I'm sorry, I'm having trouble connecting right now. Please try again later.";
      setMessages(prev => [...prev, { id: Date.now() + 1, text: errorMsg, isBot: true, error: true }]);
      speakText(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [voiceEnabled, language]);

  const handleSend = (e) => {
    e.preventDefault();
    submitQuery(input);
  };

  const toggleVoice = () => {
    if (voiceEnabled) {
      window.speechSynthesis.cancel();
    }
    setVoiceEnabled(!voiceEnabled);
  };

  return (
    <div className="assistant-container animate-fade-in">
      <div className="chat-header">
        <Bot size={32} className="text-primary" />
        <div style={{ flex: 1 }}>
          <h2>VoteWise AI Assistant</h2>
          <p>Powered by Google Gemini</p>
        </div>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="input"
          style={{ width: 'auto', padding: '0.25rem', marginRight: '0.5rem', fontSize: '0.85rem' }}
          aria-label="Select language"
        >
          <option value="en-IN">English</option>
          <option value="hi-IN">Hindi</option>
          <option value="te-IN">Telugu</option>
        </select>
        <button 
          onClick={toggleVoice} 
          className="icon-btn" 
          aria-label={voiceEnabled ? "Disable voice output" : "Enable voice output"}
          title={voiceEnabled ? "Disable Voice Output" : "Enable Voice Output"}
        >
          {voiceEnabled ? <Volume2 className="text-primary" /> : <VolumeX />}
        </button>
      </div>
      
      <div className="chat-messages card">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
            <div className="message-avatar">
              {msg.isBot ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div className={`message-bubble ${msg.error ? 'error' : ''}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message-wrapper bot">
            <div className="message-avatar"><Bot size={20} /></div>
            <div className="message-bubble typing">
              <Loader2 className="animate-spin" size={20} />
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="chat-input-form card">
        <button 
          type="button" 
          onClick={toggleListening} 
          className={`mic-btn ${isListening ? 'listening' : ''}`}
          aria-label={isListening ? "Stop listening" : "Start voice input"}
        >
          {isListening ? <MicOff size={20} className="text-white" /> : <Mic size={20} />}
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? "Listening..." : "Ask about registration, documents, voting process..."}
          className="input chat-input"
          disabled={isLoading}
        />
        <button type="submit" disabled={!input.trim() || isLoading} className="send-btn" aria-label="Send message">
          <Send size={20} />
        </button>
      </form>
      
      <div className="faq-suggestions">
        <button type="button" onClick={() => setInput("How do I register to vote?")} className="faq-chip">How do I register?</button>
        <button type="button" onClick={() => setInput("What documents do I need?")} className="faq-chip">Required documents?</button>
        <button type="button" onClick={() => setInput("What is the voting process like?")} className="faq-chip">Voting process?</button>
      </div>
    </div>
  );
};

export default Assistant;
