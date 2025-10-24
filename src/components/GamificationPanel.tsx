import { motion } from 'motion/react';
import { Trophy, Target, Award, Zap, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { BADGES, WEEKLY_CHALLENGES, calculateLevel, getNextLevelPoints, getRarityColor } from '../utils/gamification';
import { useState } from 'react';

interface GamificationPanelProps {
  totalPoints: number;
  onChallengeClick?: () => void;
}

export function GamificationPanel({ totalPoints, onChallengeClick }: GamificationPanelProps) {
  const [selectedTab, setSelectedTab] = useState<'badges' | 'challenges' | 'leaderboard'>('badges');
  const level = calculateLevel(totalPoints);
  const nextLevelPoints = getNextLevelPoints(level);
  const progress = ((totalPoints % 100) / 100) * 100;

  return (
    <Card className="shadow-xl border-2 border-purple-100">
      <CardContent className="p-6">
        {/* Level Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Your Level</p>
                <p className="text-2xl font-bold text-gray-900">Level {level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {totalPoints}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-xs text-gray-500 mt-2 text-center">
            {100 - (totalPoints % 100)} points to Level {level + 1}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          <button
            onClick={() => setSelectedTab('badges')}
            className={`flex-1 py-2 text-sm font-semibold transition-all ${
              selectedTab === 'badges'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Award className="w-4 h-4 inline mr-1" />
            Badges
          </button>
          <button
            onClick={() => setSelectedTab('challenges')}
            className={`flex-1 py-2 text-sm font-semibold transition-all ${
              selectedTab === 'challenges'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Target className="w-4 h-4 inline mr-1" />
            Challenges
          </button>
          <button
            onClick={() => setSelectedTab('leaderboard')}
            className={`flex-1 py-2 text-sm font-semibold transition-all ${
              selectedTab === 'leaderboard'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="w-4 h-4 inline mr-1" />
            Leaderboard
          </button>
        </div>

        {/* Badges Tab */}
        {selectedTab === 'badges' && (
          <div className="space-y-3">
            {BADGES.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                  badge.unlocked
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-purple-200'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="text-3xl">{badge.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{badge.name}</p>
                    <Badge className={`text-xs ${getRarityColor(badge.rarity)}`}>
                      {badge.rarity}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{badge.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">+{badge.points}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Challenges Tab */}
        {selectedTab === 'challenges' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <p className="font-bold text-orange-900">Weekly Challenges</p>
              </div>
              <p className="text-sm text-orange-700">Complete challenges to earn bonus points!</p>
            </div>

            {WEEKLY_CHALLENGES.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all cursor-pointer"
                onClick={onChallengeClick}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{challenge.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{challenge.description}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">+{challenge.reward}</Badge>
                </div>
                <div className="mb-2">
                  <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">
                    {challenge.progress}/{challenge.total} completed
                  </span>
                  <span className="text-red-600 font-semibold">⏰ {challenge.expiresIn}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {selectedTab === 'leaderboard' && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700">Your Rank</p>
                  <p className="text-2xl font-bold text-orange-900">#47</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-orange-700">City Ranking</p>
                  <p className="text-2xl font-bold text-orange-900">Mumbai</p>
                </div>
              </div>
            </div>

            {[
              { rank: 1, name: 'Priya S.', points: 2450, badge: '👑' },
              { rank: 2, name: 'Rajesh K.', points: 2120, badge: '🥈' },
              { rank: 3, name: 'Anita P.', points: 1890, badge: '🥉' },
              { rank: 4, name: 'Vikram M.', points: 1650, badge: '⭐' },
              { rank: 5, name: 'Meera R.', points: 1520, badge: '⭐' }
            ].map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all"
              >
                <div className="text-2xl">{user.badge}</div>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.rank}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">Home Protector</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{user.points}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </motion.div>
            ))}

            <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
              View Full Leaderboard
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}