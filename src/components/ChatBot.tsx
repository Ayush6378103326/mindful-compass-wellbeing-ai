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

// Enhanced training data for health-related questions and responses
const trainingData = [
  {
    keywords: ['headache', 'head', 'pain', 'migraine'],
    response: "Headaches can be caused by stress, dehydration, lack of sleep, or eye strain. Try drinking water, resting in a dark room, and consider over-the-counter pain relievers if needed. If headaches are severe, sudden, or accompanied by other symptoms like fever or neck stiffness, please consult a healthcare professional immediately."
  },
  {
    keywords: ['cold', 'flu', 'fever', 'cough', 'runny nose', 'sore throat'],
    response: "For cold and flu symptoms, rest, stay hydrated, and consider over-the-counter medications for symptom relief. Gargle with warm salt water for sore throat relief. Monitor your temperature and seek medical attention if your fever exceeds 103°F (39.4°C) or symptoms worsen after 3-5 days."
  },
  {
    keywords: ['sleep', 'insomnia', 'can\'t sleep', 'tired', 'fatigue', 'drowsy'],
    response: "Improving sleep hygiene can help with insomnia. Try maintaining a regular sleep schedule, avoiding screens 1-2 hours before bed, keeping your bedroom cool (65-68°F/18-20°C) and dark, limiting caffeine after noon, and practicing relaxation techniques like deep breathing or meditation before bedtime."
  },
  {
    keywords: ['anxiety', 'stress', 'worried', 'panic', 'anxious', 'nervous'],
    response: "For anxiety and stress, try deep breathing exercises (4-7-8 technique), progressive muscle relaxation, or mindfulness meditation. Regular physical activity, adequate sleep, and limiting caffeine and alcohol can also help reduce anxiety levels. Consider speaking with a mental health professional if anxiety interferes with daily functioning."
  },
  {
    keywords: ['diet', 'nutrition', 'healthy eating', 'food', 'weight', 'meal'],
    response: "A balanced diet includes plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. The Mediterranean or DASH diets are evidence-based approaches. Try to fill half your plate with vegetables, a quarter with lean protein, and a quarter with whole grains. Stay hydrated and limit processed foods, added sugars, and excessive salt."
  },
  {
    keywords: ['exercise', 'workout', 'fitness', 'training', 'cardio', 'strength'],
    response: "For overall health, aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly, plus strength training twice a week. Start slowly if you're new to exercise and choose activities you enjoy. Remember to warm up, cool down, and stay hydrated. Consult a healthcare provider before starting a new exercise program."
  },
  {
    keywords: ['diabetes', 'blood sugar', 'glucose', 'insulin', 'diabetic'],
    response: "Diabetes management includes monitoring blood glucose levels, taking medications as prescribed, maintaining a consistent carbohydrate intake, regular physical activity, and attending regular healthcare appointments. Keep a log of your blood sugar readings and any symptoms to share with your healthcare provider."
  },
  {
    keywords: ['heart', 'cardiac', 'blood pressure', 'hypertension', 'cholesterol', 'cardiovascular'],
    response: "Heart health can be improved through regular physical activity, a diet low in saturated fats and sodium, maintaining healthy weight, not smoking, limiting alcohol, and managing stress. If you have high blood pressure or cholesterol, follow your doctor's recommendations for monitoring and medication."
  },
  {
    keywords: ['depression', 'sad', 'mood', 'hopeless', 'depressed'],
    response: "Depression is a serious but treatable condition. Reaching out for professional help is important. In addition to professional treatment, regular physical activity, maintaining social connections, establishing routines, and practicing self-care can help manage symptoms. If you're having thoughts of harming yourself, please contact emergency services or a crisis helpline immediately."
  },
  {
    keywords: ['vitamin', 'supplement', 'mineral', 'deficiency'],
    response: "While a balanced diet should provide most nutrients, certain supplements may be recommended based on age, health conditions, or dietary restrictions. Common supplements include vitamin D, B12, calcium, and omega-3 fatty acids. Always consult with a healthcare provider before starting supplements as they can interact with medications."
  }
];

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your enhanced healthcare assistant. I can now provide more detailed responses about health concerns and medical information. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isUsingOpenAI, setIsUsingOpenAI] = useState(true);
  const [apiKey, setApiKey] = useState('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');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const defaultResponses = [
    "Based on your symptoms, it could be several conditions. For a proper diagnosis, I recommend consulting with a healthcare professional who can evaluate you in person.",
    "Maintaining healthy habits like regular exercise, balanced nutrition, adequate sleep, and stress management is key for overall wellness and disease prevention.",
    "For any persistent symptoms or concerns, it's important to follow up with your primary care provider rather than relying solely on online advice.",
    "Remember that each person's health needs are unique, and treatments that work for one person may not work for another.",
    "Would you like me to provide more specific information about prevention, treatment options, or when to seek medical care for this issue?",
    "I don't have enough information to help with that specific issue. Could you provide more details about your symptoms, their duration, and any other relevant factors?"
  ];
  
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const findBestResponse = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    
    for (const item of trainingData) {
      for (const keyword of item.keywords) {
        if (lowercaseInput.includes(keyword)) {
          return item.response;
        }
      }
    }
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };
  
  const fetchChatGPTResponse = async (userMessage: string) => {
    if (!apiKey) {
      setIsTyping(false);
      setShowApiKeyInput(true);
      toast({
        title: "OpenAI API Key Required",
        description: "Please enter your OpenAI API key to use ChatGPT",
        duration: 5000,
      });
      return "To use the enhanced AI capabilities, please enter your OpenAI API key.";
    }
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              "role": "system",
              "content": "You are a knowledgeable healthcare assistant. Provide accurate, concise, and helpful information about health topics. Always encourage users to seek professional medical advice for diagnosis and treatment. Do not diagnose conditions or prescribe treatments."
            },
            {
              "role": "user",
              "content": userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });
      
      const data = await response.json();
      if (data.error) {
        console.error('OpenAI API error:', data.error);
        toast({
          title: "API Error",
          description: data.error.message || "Error connecting to ChatGPT",
          variant: "destructive",
          duration: 5000,
        });
        return findBestResponse(userMessage);
      }
      
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      toast({
        title: "Connection Error",
        description: "Falling back to local responses",
        variant: "destructive",
        duration: 3000,
      });
      return findBestResponse(userMessage);
    }
  };
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    let responseText = "";
    
    if (isUsingOpenAI) {
      responseText = await fetchChatGPTResponse(userMessage.text);
    } else {
      setTimeout(() => {
        responseText = findBestResponse(userMessage.text);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
      return;
    }
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
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
        text: "Hello! I'm your enhanced healthcare assistant. I can now provide more detailed responses about health concerns and medical information. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
  };
  
  const handleToggleAI = () => {
    setIsUsingOpenAI(!isUsingOpenAI);
    toast({
      title: isUsingOpenAI ? "Using Local Model" : "Using ChatGPT",
      description: isUsingOpenAI 
        ? "Switched to local responses" 
        : "Switched to OpenAI-powered responses",
      duration: 3000,
    });
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-[600px] bg-white rounded-xl shadow-md border border-healthcare-muted">
      <div className="bg-healthcare-primary text-white p-4 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="mr-2" size={20} />
            <h3 className="text-lg font-medium">Healthcare Assistant</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-healthcare-secondary"
              onClick={handleToggleAI}
            >
              {isUsingOpenAI ? "Using ChatGPT" : "Using Local Model"}
            </Button>
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
