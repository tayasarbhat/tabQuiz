import React from 'react';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardEntry {
  name: string;
  score: number;
  subject: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  const sortedEntries = [...entries].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Leaderboard
        </h3>
      </div>
      <div className="space-y-4">
        {sortedEntries.map((entry, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-102 ${
              index === 0
                ? 'bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-200'
                : 'bg-white/60 backdrop-blur-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                index === 0 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' :
                index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                index === 2 ? 'bg-gradient-to-r from-orange-500 to-amber-600' :
                'bg-gradient-to-r from-indigo-500 to-purple-500'
              } text-white font-bold`}>
                {index < 3 ? <Medal className="w-5 h-5" /> : index + 1}
              </div>
              <div>
                <span className="font-medium text-gray-800">{entry.name}</span>
                <span className="text-sm text-gray-500 block">{entry.subject}</span>
              </div>
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {entry.score} points
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;