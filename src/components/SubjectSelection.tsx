import React from 'react';
import { BookOpen, Code, Calculator, Atom, Globe } from 'lucide-react';

interface SubjectSelectionProps {
  onSubjectSelect: (sheetId: string) => void;
}

const subjects = [
  { id: 'Sheet1', name: 'English', icon: Calculator, color: 'from-blue-500 to-cyan-500' },
  { id: 'Sheet2', name: 'Rivers And Lakes', icon: Code, color: 'from-purple-500 to-pink-500' },
  { id: 'Sheet3', name: 'Physics', icon: Atom, color: 'from-orange-500 to-red-500' },
  { id: 'Sheet4', name: 'General Knowledge', icon: Globe, color: 'from-green-500 to-emerald-500' },
];

const SubjectSelection: React.FC<SubjectSelectionProps> = ({ onSubjectSelect }) => {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center transition-all duration-300 hover:shadow-2xl border border-white/20">
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
        <BookOpen className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Choose Your Subject
      </h2>
      <p className="text-gray-600 mb-8 text-lg">Select a subject to begin the quiz</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          return (
            <button
              key={subject.id}
              onClick={() => onSubjectSelect(subject.id)}
              className="group relative p-6 rounded-xl border-2 border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${subject.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${subject.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-medium text-gray-800">{subject.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectSelection;