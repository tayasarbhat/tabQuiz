import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Forward, Home } from 'lucide-react';
import { Question } from '../types';
import Timer from './Timer';
import ProgressRing from './ProgressRing';
import QuestionLoader from './QuestionLoader';

interface QuizSectionProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onOptionSelect: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onTimeout: () => void;
  onHome: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  onOptionSelect,
  onNext,
  onPrevious,
  onSkip,
  onTimeout,
  onHome,
}) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const timePerQuestion = 60;
  const totalTime = totalQuestions * timePerQuestion;

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []); // Only run once on mount

  if (initialLoading) {
    return <QuestionLoader currentQuestion={currentQuestionIndex + 1} />;
  }

  return (
    <div className="relative">
      <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl border border-white/20">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onHome}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                title="Go to Home"
              >
                <Home className="w-6 h-6 text-gray-600" />
              </button>
              <ProgressRing 
                progress={(currentQuestionIndex + 1) / totalQuestions * 100}
                size={80}
                current={currentQuestionIndex + 1}
                total={totalQuestions}
              />
            </div>
            <Timer 
              totalTime={totalTime} 
              onTimeout={onTimeout}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
            />
          </div>

          <div className="relative mt-8">
            <h2 className="relative text-2xl font-bold text-gray-800 mb-6 leading-relaxed p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              {question.question}
            </h2>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onOptionSelect(index)}
              className={`group w-full p-5 text-left rounded-xl border-2 transition-all duration-300 relative overflow-hidden 
                ${selectedAnswer === index 
                  ? 'border-transparent bg-gradient-to-r from-indigo-500 to-purple-500 text-white transform scale-105' 
                  : 'border-gray-100 hover:border-transparent hover:shadow-lg hover:scale-102'}`}
            >
              {selectedAnswer !== index && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              )}
              <div className="flex items-center">
                <span className={`inline-block w-10 h-10 rounded-full flex items-center justify-center
                  ${selectedAnswer === index 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-700 group-hover:bg-white/80'}`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={`ml-4 ${selectedAnswer === index ? 'text-white' : 'text-gray-700'}`}>
                  {option}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center gap-4">
          <button
            onClick={onPrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:shadow-lg hover:scale-105'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          
          <button
            onClick={onSkip}
            className="flex items-center px-6 py-3 bg-white text-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Forward className="w-5 h-5 mr-2" />
            Skip
          </button>
          
          <button
            onClick={onNext}
            className="flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'Submit' : 'Next'}
            {currentQuestionIndex < totalQuestions - 1 && <ArrowRight className="w-5 h-5 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSection;