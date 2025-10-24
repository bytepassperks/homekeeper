// Live Activity Feed - FOMO & Social Proof
export interface LiveActivity {
  id: string;
  type: 'warranty_tracked' | 'maintenance_completed' | 'deal_found' | 'money_saved' | 'item_added';
  message: string;
  timestamp: Date;
  icon: string;
  color: string;
}

const ACTIVITIES_TEMPLATES = [
  { type: 'warranty_tracked', messages: [
    '173 users just tracked warranties!',
    '284 warranties protected today!',
    '92 users renewed warranties this hour!',
    '156 households saved warranties!'
  ], icon: '🛡️', color: 'text-blue-600' },
  { type: 'money_saved', messages: [
    'AC service saved ₹2,500 this month!',
    'User saved ₹5,000 on timely repairs!',
    'Warranty claim recovered ₹8,000!',
    'Maintenance optimization saved ₹3,200!'
  ], icon: '💰', color: 'text-green-600' },
  { type: 'deal_found', messages: [
    '3 deals found for your items—act now!',
    'New replacement deal: Save 40%!',
    '12 users found better prices today!',
    'Flash deal on home appliances!'
  ], icon: '🔥', color: 'text-red-600' },
  { type: 'maintenance_completed', messages: [
    '445 maintenance tasks completed today!',
    'User extended appliance life by 3 years!',
    '203 scheduled services this week!',
    'Perfect maintenance streak achieved!'
  ], icon: '✅', color: 'text-purple-600' },
  { type: 'item_added', messages: [
    '1,234 items added to inventories today!',
    'User just organized their entire home!',
    '89 new households joined HomeKeeper!',
    'Community reached 50,000 tracked items!'
  ], icon: '📦', color: 'text-orange-600' }
];

export function generateLiveActivity(): LiveActivity {
  const template = ACTIVITIES_TEMPLATES[Math.floor(Math.random() * ACTIVITIES_TEMPLATES.length)];
  const message = template.messages[Math.floor(Math.random() * template.messages.length)];
  
  return {
    id: Date.now().toString(),
    type: template.type as LiveActivity['type'],
    message,
    timestamp: new Date(),
    icon: template.icon,
    color: template.color
  };
}

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    avatar: '👩',
    quote: 'I cut my repair bills in half! HomeKeeper saved me ₹25,000 this year.',
    rating: 5,
    saved: '₹25,000'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Delhi',
    avatar: '👨',
    quote: 'My home insurance claims were approved instantly with HomeKeeper documentation!',
    rating: 5,
    saved: '₹50,000'
  },
  {
    id: 3,
    name: 'Anita Patel',
    location: 'Bangalore',
    avatar: '👩',
    quote: 'Never missed a warranty expiry again. This app is a game-changer!',
    rating: 5,
    saved: '₹18,000'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Pune',
    avatar: '👨',
    quote: 'Organized my entire home in 30 minutes. The maintenance alerts are perfect!',
    rating: 5,
    saved: '₹32,000'
  },
  {
    id: 5,
    name: 'Meera Reddy',
    location: 'Hyderabad',
    avatar: '👩',
    quote: 'Found replacement deals that saved me 40%. Absolutely worth it!',
    rating: 5,
    saved: '₹15,000'
  }
];
