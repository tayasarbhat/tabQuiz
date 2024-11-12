import React, { useState } from 'react';
import { Question } from './types';
import NameInput from './components/NameInput';
import SubjectSelection from './components/SubjectSelection';
import QuizSection from './components/QuizSection';
import ScoreSection from './components/ScoreSection';
import QuestionLoader from './components/QuestionLoader';

export function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scriptURL = 'https://script.google.com/macros/s/AKfycbw6-QVPL0726HoESwhiJFtLKAq5HU595xjdElwrZQit_dCJzq2l93QyFOYjDhXty5c2/exec';

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setIsLoading(true);
    fetchQuestionsFromGoogleSheet(subject);
  };

  const fetchQuestionsFromGoogleSheet = async (sheetId: string) => {
    try {
      setError(null);
      const response = await fetch(`${scriptURL}?sheet=${sheetId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch questions (Status: ${response.status})`);
      }
      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setTimeout(() => {
          setIsLoading(false);
          setQuizStarted(true);
        }, 1500);
      } else {
        throw new Error("No questions available for this subject");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch questions");
      setIsLoading(false);
      console.error('Error fetching questions:', error);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newUserAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleTimeout = () => {
    setQuizCompleted(true);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = () => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = null;
    setUserAnswers(newUserAnswers);
    handleNext();
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].answer ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setQuizStarted(false);
    setPlayerName('');
    setSelectedSubject('');
    setQuestions([]);
    setError(null);
  };

  const goHome = () => {
    resetQuiz();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {!playerName && (
          <NameInput onNameSubmit={handleNameSubmit} />
        )}

        {playerName && !selectedSubject && !isLoading && (
          <SubjectSelection onSubjectSelect={handleSubjectSelect} />
        )}

        {isLoading && (
          <QuestionLoader currentQuestion={1} />
        )}
        
        {quizStarted && !quizCompleted && questions.length > 0 && !isLoading && (
          <QuizSection
            question={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            selectedAnswer={userAnswers[currentQuestionIndex]}
            onOptionSelect={handleOptionSelect}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSkip={handleSkip}
            onTimeout={handleTimeout}
            onHome={goHome}
          />
        )}

        {quizCompleted && (
          <ScoreSection
            score={calculateScore()}
            totalQuestions={questions.length}
            questions={questions}
            userAnswers={userAnswers}
            onReset={resetQuiz}
            onHome={goHome}
            playerName={playerName}
          />
        )}
      </div>
    </div>
  );
}