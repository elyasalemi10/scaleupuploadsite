
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RotateCcw, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function MacWindow({ title = "AI Training Portal - ScaleupwithAI", children }) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const lessons = [
    {
      title: "Welcome to AI Training",
      steps: [
        {
          type: "content",
          title: "Introduction to AI in Business",
          content: "Welcome to your AI training journey! In this course, you'll learn how to leverage AI effectively in your business operations.",
          details: "AI can transform how you work by automating repetitive tasks, providing insights from data, and enhancing customer experiences. Let's explore the fundamentals together."
        },
        {
          type: "quiz",
          title: "Knowledge Check",
          question: "What is the primary benefit of implementing AI in business operations?",
          options: [
            "Replacing all human workers",
            "Automating repetitive tasks and providing insights",
            "Making decisions without human input",
            "Increasing company expenses"
          ],
          correctAnswer: 1,
          feedback: "Correct! AI's main benefit is automating repetitive tasks and providing valuable insights, allowing humans to focus on more strategic work."
        }
      ]
    },
    {
      title: "Prompt Engineering Basics",
      steps: [
        {
          type: "content",
          title: "Writing Effective Prompts",
          content: "Learn how to communicate clearly with AI systems to get the best results. Good prompts are specific, clear, and provide context.",
          details: "A well-crafted prompt includes: clear instructions, relevant context, desired format, and specific examples when helpful."
        },
        {
          type: "interactive",
          title: "Practice Exercise",
          question: "Improve this prompt: 'Write about marketing'",
          placeholder: "Write a better, more specific prompt...",
          sampleAnswer: "Write a 300-word blog post about digital marketing strategies for small businesses, focusing on social media and email marketing, with actionable tips for beginners."
        },
        {
          type: "quiz",
          title: "Quick Quiz",
          question: "Which prompt is more effective?",
          options: [
            "Write something about sales",
            "Write a 5-step sales process for B2B software companies targeting startups",
            "Sales stuff please",
            "Help with sales"
          ],
          correctAnswer: 1,
          feedback: "Excellent! The second option is specific, provides context (B2B software, startups), and requests a clear format (5-step process)."
        }
      ]
    },
    {
      title: "AI Safety & Best Practices",
      steps: [
        {
          type: "content",
          title: "Responsible AI Usage",
          content: "Understanding how to use AI responsibly is crucial for long-term success. This includes data privacy, bias awareness, and ethical considerations.",
          details: "Key principles: Always verify AI outputs, protect sensitive data, be transparent about AI use with customers, and maintain human oversight for important decisions."
        },
        {
          type: "quiz",
          title: "Safety Assessment",
          question: "What should you always do before using AI-generated content publicly?",
          options: [
            "Post it immediately to save time",
            "Review and verify the content for accuracy",
            "Add more AI-generated content",
            "Share it without reading"
          ],
          correctAnswer: 1,
          feedback: "Correct! Always review and verify AI-generated content before publishing to ensure accuracy and appropriateness."
        },
        {
          type: "content",
          title: "Congratulations!",
          content: "You've completed the AI Training course! You now have the fundamental knowledge to implement AI responsibly in your business.",
          details: "Next steps: Start with small AI implementations, measure results, and gradually expand your AI usage as you gain confidence and experience."
        }
      ]
    }
  ];

  const currentLessonData = lessons[currentLesson];
  const currentStepData = currentLessonData.steps[currentStep];
  const totalSteps = currentLessonData.steps.length;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentLesson < lessons.length - 1) {
      if (!completedLessons.includes(currentLesson)) {
        setCompletedLessons([...completedLessons, currentLesson]);
      }
      setCurrentLesson(currentLesson + 1);
      setCurrentStep(0);
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setCurrentStep(lessons[currentLesson - 1].steps.length - 1);
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const resetDemo = () => {
    setCurrentLesson(0);
    setCurrentStep(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCompletedLessons([]);
    setIsCorrect(false);
  };

  const selectLesson = (lessonIndex) => {
    setCurrentLesson(lessonIndex);
    setCurrentStep(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (isCorrect) return;
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    if (answerIndex === currentStepData.correctAnswer) {
      setIsCorrect(true);
    }
  };

  const canProceed = () => {
    if (currentStepData.type === 'quiz') {
      return isCorrect;
    }
    return true;
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-gray-800 rounded-t-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-300 text-sm font-medium ml-4">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={resetDemo}
            className="text-gray-300 hover:text-white p-2"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row h-auto lg:h-[600px]">
          {/* Left Navbar */}
          <div className="w-full lg:w-64 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900">Course Content</h4>
            </div>
            <div className="flex-1 p-2">
              {lessons.map((lesson, index) => (
                <button
                  key={index}
                  onClick={() => selectLesson(index)}
                  className={`w-full text-left p-3 rounded-lg mb-2 transition-colors relative ${
                    index === currentLesson
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Lesson {index + 1}</div>
                      <div className="text-sm opacity-75 truncate">{lesson.title}</div>
                    </div>
                    {completedLessons.includes(index) && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 relative h-[650px] lg:h-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentLesson}-${currentStep}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col p-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{currentLesson + 1}</span>
                  </div>
                  <div>
                    <div className="text-sm text-blue-600 font-medium">Lesson {currentLesson + 1} • Step {currentStep + 1}</div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {currentStepData.title}
                    </h3>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {currentStepData.type === 'content' && (
                    <>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {currentStepData.content}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {currentStepData.details}
                      </p>
                    </>
                  )}

                  {currentStepData.type === 'quiz' && (
                    <>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          {currentStepData.question}
                        </h4>
                        <div className="space-y-2">
                          {currentStepData.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleAnswerSelect(index)}
                              disabled={isCorrect}
                              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                selectedAnswer === index
                                  ? isCorrect
                                    ? 'bg-green-100 border-green-500 text-green-700'
                                    : 'bg-red-100 border-red-500 text-red-700'
                                  : 'bg-white border-gray-200 hover:bg-gray-50'
                              } ${isCorrect ? 'cursor-not-allowed' : ''}`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                      {showFeedback && (
                        <div className={`p-4 rounded-lg mt-4 ${
                          isCorrect
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-red-50 border border-red-200'
                        }`}>
                          <p className={`font-medium ${
                            isCorrect
                              ? 'text-green-700'
                              : 'text-red-700'
                          }`}>
                            {isCorrect ? 'Correct!' : 'Not quite right. Please try again.'}
                          </p>
                          {isCorrect && (
                            <p className="text-gray-600 mt-1">{currentStepData.feedback}</p>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {currentStepData.type === 'interactive' && (
                    <>
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          {currentStepData.question}
                        </h4>
                        <textarea
                          placeholder={currentStepData.placeholder}
                          className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24"
                        />
                        <div className="mt-3 p-3 bg-gray-50 rounded border">
                          <p className="text-sm font-medium text-gray-700">Sample Answer:</p>
                          <p className="text-sm text-gray-600 mt-1">{currentStepData.sampleAnswer}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Navigation and Progress */}
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentLesson === 0 && currentStep === 0}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    
                    <Button
                      onClick={nextStep}
                      disabled={!canProceed() || (currentLesson === lessons.length - 1 && currentStep === totalSteps - 1)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      {currentStep === totalSteps - 1 && currentLesson < lessons.length - 1 ? 'Next Lesson' : 'Next'}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Step {currentStep + 1} of {totalSteps} • Lesson {currentLesson + 1}</span>
                    <span>{Math.round(((currentLesson * lessons[0].steps.length + currentStep + 1) / (lessons.length * lessons[0].steps.length)) * 100)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentLesson * lessons[0].steps.length + currentStep + 1) / (lessons.length * lessons[0].steps.length)) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
