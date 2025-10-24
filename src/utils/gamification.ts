// Gamification System - Points, Badges, Achievements
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlocked: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  points: number;
  completed: boolean;
}

export interface UserStats {
  totalPoints: number;
  level: number;
  badges: Badge[];
  achievements: Achievement[];
  rank: number;
  percentile: number;
}

export const BADGES: Badge[] = [
  {
    id: 'first-item',
    name: 'Getting Started',
    description: 'Added your first item',
    icon: '🎯',
    rarity: 'common',
    points: 10,
    unlocked: false
  },
  {
    id: 'warranty-guardian',
    name: 'Warranty Guardian',
    description: 'Tracked 10 warranties',
    icon: '🛡️',
    rarity: 'rare',
    points: 50,
    unlocked: false
  },
  {
    id: 'maintenance-master',
    name: 'Maintenance Master',
    description: 'Completed 20 maintenance tasks',
    icon: '⚙️',
    rarity: 'epic',
    points: 100,
    unlocked: false
  },
  {
    id: 'home-optimizer',
    name: 'HomeOptimizer',
    description: 'Achieved 100% home organization',
    icon: '🏆',
    rarity: 'legendary',
    points: 500,
    unlocked: false
  },
  {
    id: 'never-missed',
    name: 'Never Missed',
    description: 'Perfect attendance on maintenance for 3 months',
    icon: '✨',
    rarity: 'legendary',
    points: 300,
    unlocked: false
  },
  {
    id: 'deal-finder',
    name: 'Deal Finder',
    description: 'Found and saved on 5 replacement deals',
    icon: '💎',
    rarity: 'epic',
    points: 150,
    unlocked: false
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Referred 5 friends',
    icon: '🦋',
    rarity: 'rare',
    points: 200,
    unlocked: false
  }
];

export const WEEKLY_CHALLENGES = [
  {
    id: 'week-1',
    title: 'Track 3 New Warranties',
    description: 'Add warranty information for 3 items this week',
    reward: 50,
    progress: 0,
    total: 3,
    expiresIn: '3 days'
  },
  {
    id: 'week-2',
    title: 'Complete 5 Maintenance Tasks',
    description: 'Mark 5 maintenance tasks as complete',
    reward: 75,
    progress: 0,
    total: 5,
    expiresIn: '5 days'
  },
  {
    id: 'week-3',
    title: 'Add 10 New Items',
    description: 'Expand your inventory with 10 items',
    reward: 100,
    progress: 0,
    total: 10,
    expiresIn: '7 days'
  }
];

export function calculateLevel(points: number): number {
  return Math.floor(points / 100) + 1;
}

export function getNextLevelPoints(level: number): number {
  return level * 100;
}

export function getRarityColor(rarity: Badge['rarity']): string {
  const colors = {
    common: 'text-gray-600 bg-gray-100',
    rare: 'text-blue-600 bg-blue-100',
    epic: 'text-purple-600 bg-purple-100',
    legendary: 'text-yellow-600 bg-yellow-100'
  };
  return colors[rarity];
}
