
import { useState, useRef, useEffect } from 'react';
import { Send, Mic, User, Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Training data for health-related questions and responses
const trainingData = [
  {
    keywords: ['headache', 'head', 'pain', 'migraine'],
    response: "Headaches can be caused by stress, dehydration, or lack of sleep. Try drinking water, resting in a dark room, and consider over-the-counter pain relievers if needed. If headaches persist or are severe, please consult a healthcare professional."
  },
  {
    keywords: ['cold', 'flu', 'fever', 'cough', 'runny nose'],
    response: "For cold and flu symptoms, rest, stay hydrated, and consider over-the-counter medications for symptom relief. Monitor your temperature and seek medical attention if your fever is high or symptoms worsen after a few days."
  },
  {
    keywords: ['sleep', 'insomnia', 'can\'t sleep', 'tired'],
    response: "Improving sleep hygiene can help with insomnia. Try maintaining a regular sleep schedule, avoiding screens before bed, keeping your bedroom cool and dark, and limiting caffeine intake in the afternoon and evening."
  },
  {
    keywords: ['anxiety', 'stress', 'worried', 'panic'],
    response: "For anxiety and stress, try deep breathing exercises, mindfulness meditation, or gentle physical activity. Regular exercise, adequate sleep, and limiting caffeine can also help reduce anxiety levels. If anxiety is interfering with daily life, consider speaking with a mental health professional."
  },
  {
    keywords: ['diet', 'nutrition', 'healthy eating', 'food'],
    response: "A balanced diet includes plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. Try to limit processed foods, added sugars, and excessive salt. Stay hydrated by drinking plenty of water throughout the day."
  }
];

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
  const [isRecording, setIsRecording] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Default responses when no match is found in the training data
  const defaultResponses = [
    "Based on your symptoms, it could be a common condition, but I recommend consulting with a healthcare professional for a proper diagnosis.",
    "It's important to maintain a balanced diet rich in fruits, vegetables, and whole grains to support your immune system.",
    "For mild discomfort, rest and staying hydrated may help provide relief.",
    "Regular exercise can help improve both physical and mental health.",
    "Remember to take any prescribed medications as directed by your healthcare provider.",
    "I don't have enough information to help with that specific issue. Could you provide more details about your symptoms or concerns?"
  ];
  
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const findBestResponse = (input: string) => {
    // Convert input to lowercase for case-insensitive matching
    const lowercaseInput = input.toLowerCase();
    
    // Check for keyword matches in training data
    for (const item of trainingData) {
      for (const keyword of item.keywords) {
        if (lowercaseInput.includes(keyword)) {
          return item.response;
        }
      }
    }
    
    // Return a random default response if no keyword matches
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };
  
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
    
    // Generate a response based on the user's message
    setTimeout(() => {
      const responseText = findBestResponse(userMessage.text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleMicClick = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast({
        title: "Voice Input",
        description: "Voice recording is not available in this demo. Type your question instead.",
        duration: 3000,
      });
      setTimeout(() => setIsRecording(false), 3000);
    } else {
      setIsRecording(false);
    }
  };
  
  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: "Hello! I'm your healthcare assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-[600px] bg-white rounded-xl shadow-md border border-healthcare-muted">
      <div className="bg-healthcare-primary text-white p-4 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="mr-2" size={20} />
            <h3 className="text-lg font-medium">Healthcare Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-healthcare-secondary"
            onClick={handleClearChat}
          >
            <X size={18} />
            <span className="ml-1 hidden sm:inline">Clear Chat</span>
          </Button>
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
          className={cn("border-healthcare-muted", isRecording && "bg-healthcare-muted")}
          onClick={handleMicClick}
        >
          <Mic size={18} className="text-healthcare-primary" />
        </Button>
      </form>
    </div>
  );
};

export default ChatBot;
