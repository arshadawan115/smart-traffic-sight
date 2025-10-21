import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: number;
  section: string;
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  // Backend / Architecture (Django)
  {
    id: 1,
    section: "Backend / Architecture (Django)",
    question: "What's the main purpose of Django REST Framework?",
    options: [
      "To manage HTML templates",
      "To build RESTful APIs",
      "To compile JavaScript",
      "To design databases"
    ],
    correct: 1
  },
  {
    id: 2,
    section: "Backend / Architecture (Django)",
    question: "Which file defines URL routes in Django?",
    options: ["models.py", "urls.py", "views.py", "serializers.py"],
    correct: 1
  },
  {
    id: 3,
    section: "Backend / Architecture (Django)",
    question: "How can you enable cross-origin API access?",
    options: [
      "Django CORS Headers",
      "Middleware caching",
      "Custom admin commands",
      "Template tags"
    ],
    correct: 0
  },
  {
    id: 4,
    section: "Backend / Architecture (Django)",
    question: "What's the advantage of PostgreSQL over SQLite for production?",
    options: [
      "Lightweight footprint",
      "Advanced scalability and indexing",
      "Easier local setup",
      "Fewer dependencies"
    ],
    correct: 1
  },
  {
    id: 5,
    section: "Backend / Architecture (Django)",
    question: 'Which HTTP status code indicates "Resource Created"?',
    options: ["200", "201", "204", "400"],
    correct: 1
  },
  
  // Frontend (React / JS / TS)
  {
    id: 6,
    section: "Frontend (React / JS / TS)",
    question: "What's JSX used for?",
    options: [
      "Declaring CSS variables",
      "Writing HTML-like syntax in JavaScript",
      "Handling API requests",
      "Managing state"
    ],
    correct: 1
  },
  {
    id: 7,
    section: "Frontend (React / JS / TS)",
    question: "Which hook handles side effects?",
    options: ["useMemo", "useEffect", "useRef", "useReducer"],
    correct: 1
  },
  {
    id: 8,
    section: "Frontend (React / JS / TS)",
    question: "How do you share data globally across components?",
    options: [
      "Redux / Context API",
      "Local variables",
      "CSS modules",
      "Event handlers"
    ],
    correct: 0
  },
  {
    id: 9,
    section: "Frontend (React / JS / TS)",
    question: "What's prop-drilling?",
    options: [
      "Passing props deep into nested components",
      "Debugging props",
      "Copying state objects",
      "Accessing DOM directly"
    ],
    correct: 0
  },
  {
    id: 10,
    section: "Frontend (React / JS / TS)",
    question: "Which library renders charts in React?",
    options: ["Chart.js", "Axios", "Redux", "Lodash"],
    correct: 0
  },
  
  // System Design & Leadership
  {
    id: 11,
    section: "System Design & Leadership",
    question: "What's horizontal scaling?",
    options: [
      "Adding servers to distribute load",
      "Adding RAM to one server",
      "Caching data locally",
      "Compressing logs"
    ],
    correct: 0
  },
  {
    id: 12,
    section: "System Design & Leadership",
    question: "Which design pattern suits microservices architecture?",
    options: ["Monolith", "Repository", "Event-driven", "Singleton"],
    correct: 2
  },
  {
    id: 13,
    section: "System Design & Leadership",
    question: "How can you improve API performance for repeated queries?",
    options: [
      "Use caching layers (Redis)",
      "Increase request timeout",
      "Disable compression",
      "Duplicate routes"
    ],
    correct: 0
  },
  {
    id: 14,
    section: "System Design & Leadership",
    question: "Which DevOps tool supports CI/CD pipelines?",
    options: ["Jenkins", "Figma", "Webpack", "Sentry"],
    correct: 0
  },
  {
    id: 15,
    section: "System Design & Leadership",
    question: "What's an OKR for a Tech Lead?",
    options: [
      "Track feature delivery vs timeline",
      "Manage UI colors",
      "Write press releases",
      "Handle legal contracts"
    ],
    correct: 0
  }
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer");
      return;
    }

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
      setAnswers(answers.slice(0, -1));
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correct ? 1 : 0);
    }, 0);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="gradient-card shadow-card border-border/50 max-w-2xl w-full p-8">
          <div className="text-center">
            <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
              percentage >= 70 ? "bg-traffic-success/20" : "bg-traffic-warning/20"
            }`}>
              {percentage >= 70 ? (
                <CheckCircle2 className="w-16 h-16 text-traffic-success" />
              ) : (
                <XCircle className="w-16 h-16 text-traffic-warning" />
              )}
            </div>
            
            <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-6xl font-bold mb-2 gradient-primary bg-clip-text text-transparent">
              {score}/{questions.length}
            </p>
            <p className="text-2xl text-muted-foreground mb-8">
              {percentage.toFixed(0)}% Correct
            </p>

            {/* Section Breakdown */}
            <div className="space-y-4 mb-8 text-left">
              <h3 className="text-xl font-semibold mb-4">Section Breakdown</h3>
              {["Backend / Architecture (Django)", "Frontend (React / JS / TS)", "System Design & Leadership"].map((section) => {
                const sectionQuestions = questions.filter(q => q.section === section);
                const sectionAnswers = sectionQuestions.map((q, idx) => {
                  const globalIdx = questions.findIndex(gq => gq.id === q.id);
                  return answers[globalIdx] === q.correct ? 1 : 0;
                }).reduce((a, b) => a + b, 0);
                
                return (
                  <div key={section} className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{section}</span>
                      <span className="text-primary font-semibold">
                        {sectionAnswers}/{sectionQuestions.length}
                      </span>
                    </div>
                    <Progress value={(sectionAnswers / sectionQuestions.length) * 100} />
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <Button variant="outline" size="lg" onClick={() => navigate("/")} className="flex-1">
                <ArrowLeft className="mr-2" />
                Home
              </Button>
              <Button variant="hero" size="lg" onClick={restartQuiz} className="flex-1">
                Retake Quiz
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" />
            Back to Home
          </Button>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{progress.toFixed(0)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {question.section}
          </div>
        </div>

        {/* Question Card */}
        <Card className="gradient-card shadow-card border-border/50 p-8 mb-6">
          <h2 className="text-2xl font-bold mb-8">{question.question}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-border hover:border-primary/50 bg-secondary/30"
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswer === index ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex-1"
          >
            Previous
          </Button>
          <Button
            variant="hero"
            size="lg"
            onClick={handleNext}
            className="flex-1"
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
