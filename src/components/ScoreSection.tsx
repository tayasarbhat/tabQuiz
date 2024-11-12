import React, { useState } from 'react';
import { RefreshCcw, CheckCircle, XCircle, BookOpen, Home } from 'lucide-react';
import { Question } from '../types';

interface ScoreSectionProps {
  score: number;
  totalQuestions: number;
  questions: Question[];
  userAnswers: (number | null)[];
  onReset: () => void;
  onHome: () => void;
  playerName: string;
}

const ScoreSection: React.FC<ScoreSectionProps> = ({
  score,
  totalQuestions,
  questions,
  userAnswers,
  onReset,
  onHome,
  playerName,
}) => {
  const [showAnswers, setShowAnswers] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);
  let message = '';
  let gradientColors = '';
  
  if (percentage >= 90) {
    message = 'Outstanding!';
    gradientColors = 'from-green-500 to-emerald-500';
  } else if (percentage >= 70) {
    message = 'Great job!';
    gradientColors = 'from-blue-500 to-cyan-500';
  } else if (percentage >= 50) {
    message = 'Good effort!';
    gradientColors = 'from-yellow-500 to-orange-500';
  } else {
    message = 'Keep practicing!';
    gradientColors = 'from-red-500 to-pink-500';
  }

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl border border-white/20">
      <div className="flex justify-end mb-4">
        <button
          onClick={onHome}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          title="Go to Home"
        >
          <Home className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="text-center mb-12">
        <div className={`w-32 h-32 bg-gradient-to-br ${gradientColors} rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg`}>
          <span className="text-4xl font-bold text-white">{percentage}%</span>
        </div>
        <h2 className={`text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${gradientColors}`}>
          {message} {playerName}!
        </h2>
        <p className="text-xl text-gray-600">
          You scored {score} out of {totalQuestions} questions correctly
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
        >
          {showAnswers ? 'Hide Answers' : 'Show Answers'}
        </button>
        <button
          onClick={onReset}
          className="flex items-center px-8 py-4 bg-white text-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
        >
          <RefreshCcw className="w-5 h-5 mr-2" />
          Try Again
        </button>
      </div>

      {showAnswers && (
        <div className="space-y-8">
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="border-t border-gray-100 pt-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-medium text-gray-800">
                  Question {questionIndex + 1}
                </h3>
                {userAnswers[questionIndex] === question.answer ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-medium">Correct</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-500">
                    <XCircle className="w-6 h-6" />
                    <span className="font-medium">Incorrect</span>
                  </div>
                )}
              </div>
              <p className="text-gray-700 mb-6 text-lg">{question.question}</p>
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      optionIndex === question.answer
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : optionIndex === userAnswers[questionIndex]
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="inline-block w-8 h-8 rounded-full bg-white/20 text-center leading-8 mr-3">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    {option}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 text-blue-700 mb-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">Explanation:</span>
                </div>
                <p className="text-blue-800">{question.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScoreSection;