import { useState, useEffect } from 'react';
import { 
  Package, Shield, Wrench, DollarSign, Plus, Grid3x3, List, 
  LogOut, Settings, Calendar, TrendingUp, Bell, Home, Sparkles 
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { DashboardStats, Item } from '../types';
import { motion } from 'motion/react';
import { LiveActivityFeed } from './LiveActivityFeed';
import { PercentileBadge } from './PercentileBadge';
import { GamificationPanel } from './GamificationPanel';
import { ConfettiEffect } from './ConfettiEffect';
import { Logo } from './Logo';

interface DashboardProps {
  userId: string;
  accessToken: string;
  onLogout: () => void;
  onNavigate: (page: 'dashboard' | 'catalog' | 'calendar' | 'warranties' | 'watchlist' | 'notifications' | 'webhooks') => void;
  onAddItem: () => void;
  items: Item[];
  stats: DashboardStats;
}

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444'];

export function Dashboard({ userId, accessToken, onLogout, onNavigate, onAddItem, items, stats }: DashboardProps) {
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);
  const [roomData, setRoomData] = useState<{ name: string; count: number }[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [totalPoints] = useState(450); // Mock points - in real app would come from user data

  useEffect(() => {
    // Calculate category distribution
    const categoryCount: Record<string, number> = {};
    items.forEach((item) => {
      categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    });
    const catData = Object.entries(categoryCount).map(([name, value]) => ({ name, value }));
    setCategoryData(catData);

    // Calculate room distribution
    const roomCount: Record<string, number> = {};
    items.forEach((item) => {
      roomCount[item.room] = (roomCount[item.room] || 0) + 1;
    });
    const rmData = Object.entries(roomCount).map(([name, count]) => ({ name, count }));
    setRoomData(rmData);
  }, [items]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-green-50/50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo variant="full" size="md" />
            <nav className="hidden md:flex gap-2">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('dashboard')}
                className="font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('catalog')}
                className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Grid3x3 className="w-4 h-4 mr-2" />
                Catalog
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('calendar')}
                className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('warranties')}
                className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Shield className="w-4 h-4 mr-2" />
                Warranties
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('watchlist')}
                className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Watchlist
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onNavigate('notifications')}
              className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onNavigate('webhooks')}
              className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onLogout}
              className="hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h2 className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Welcome Back!
            </h2>
            <p className="text-muted-foreground">Here's an overview of your home inventory</p>
          </div>
          <Button 
            onClick={onAddItem} 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Item
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 group">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Items</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{stats.totalItems}</div>
                <p className="text-xs text-muted-foreground mt-1">Items in your inventory</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-yellow-200 group">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Warranties Expiring</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">{stats.warrantiesExpiringSoon}</div>
                <p className="text-xs text-muted-foreground mt-1">Expiring within 30 days</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200 group">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Upcoming Maintenance</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{stats.maintenanceUpcoming}</div>
                <p className="text-xs text-muted-foreground mt-1">Due within 7 days</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200 group">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">
                  {stats.currency} {stats.totalValue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Combined item value</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts and Gamification */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-xl transition-all duration-300 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
                    Items by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {categoryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={800}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
                      <Package className="w-16 h-16 mb-4 text-gray-300" />
                      <p>No items yet. Add your first item to see statistics.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
                    Items by Room
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {roomData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={roomData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar 
                          dataKey="count" 
                          fill="url(#colorGradient)" 
                          radius={[8, 8, 0, 0]}
                          animationBegin={0}
                          animationDuration={800}
                        />
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0ea5e9" stopOpacity={1} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
                      <Home className="w-16 h-16 mb-4 text-gray-300" />
                      <p>No items yet. Add your first item to see statistics.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Gamification Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <GamificationPanel totalPoints={totalPoints} />
          </motion.div>
        </div>

        {/* Live Activity Feed & Percentile Badge - Fixed positioning */}
        <LiveActivityFeed />
        <PercentileBadge percentile={92} totalPoints={totalPoints} />
        <ConfettiEffect trigger={showConfetti} />
      </main>
    </div>
  );
}