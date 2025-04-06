
import { useState, useRef, useEffect } from 'react';
import { Send, Mic, User, Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your healthcare assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // Mock responses for demonstration
  const mockResponses = [
    "Based on your symptoms, it could be a common cold, but I recommend consulting with a healthcare professional for a proper diagnosis.",
    "It's important to maintain a balanced diet rich in fruits, vegetables, and whole grains to support your immune system.",
    "For mild headaches, staying hydrated and resting in a quiet, dark room may help provide relief.",
    "Regular exercise can help improve mental health by reducing anxiety, depression, and negative mood.",
    "Remember to take any prescribed medications as directed by your healthcare provider."
  ];
  
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-[600px] bg-white rounded-xl shadow-md border border-healthcare-muted">
      <div className="bg-healthcare-primary text-white p-4 rounded-t-xl">
        <div className="flex items-center">
          <Bot className="mr-2" size={20} />
          <h3 className="text-lg font-medium">Healthcare Assistant</h3>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg px-4 py-2",
                message.sender === 'user'
                  ? "bg-healthcare-primary text-white rounded-tr-none"
                  : "bg-healthcare-light text-healthcare-dark rounded-tl-none"
              )}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'bot' ? (
                  <Bot size={16} className="mr-1" />
                ) : (
                  <User size={16} className="mr-1" />
                )}
                <span className="text-xs opacity-70">
                  {message.sender === 'user' ? 'You' : 'Assistant'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-healthcare-light text-healthcare-dark rounded-lg rounded-tl-none px-4 py-3 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-healthcare-primary rounded-full animate-pulse-gentle"></div>
                <div className="h-2 w-2 bg-healthcare-primary rounded-full animate-pulse-gentle" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-healthcare-primary rounded-full animate-pulse-gentle" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={endOfMessagesRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t border-healthcare-muted p-4 flex gap-2">
        <Input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your health question..."
          className="health-input"
        />
        <Button
          type="submit"
          className="bg-healthcare-primary hover:bg-healthcare-secondary"
          disabled={!inputMessage.trim() || isTyping}
        >
          <Send size={18} />
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-healthcare-muted"
        >
          <Mic size={18} className="text-healthcare-primary" />
        </Button>
      </form>
    </div>
  );
};

export default ChatBot;
