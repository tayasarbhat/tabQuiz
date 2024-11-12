import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';

interface NameInputProps {
  onNameSubmit: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center transition-all duration-300 hover:shadow-2xl border border-white/20">
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
        <UserCircle className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Welcome to the Quiz
      </h2>
      <p className="text-gray-600 mb-8 text-lg">Enter your name to begin your journey</p>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-6 py-4 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none transition-all mb-6 text-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-lg font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!name.trim()}
        >
          Start Your Quiz
        </button>
      </form>
    </div>
  );
};

export default NameInput;