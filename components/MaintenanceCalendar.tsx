import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Item } from '../types';

interface MaintenanceCalendarProps {
  items: Item[];
  onItemClick: (item: Item) => void;
  onAddCustomReminder: () => void;
}

export function MaintenanceCalendar({ items, onItemClick, onAddCustomReminder }: MaintenanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    const events: { item: Item; type: 'maintenance' | 'warranty' }[] = [];

    items.forEach(item => {
      if (item.nextMaintenance === dateStr) {
        events.push({ item, type: 'maintenance' });
      }
      if (item.warrantyExpiry === dateStr) {
        events.push({ item, type: 'warranty' });
      }
    });

    return events;
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-2" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const events = getEventsForDate(day);
    const isToday = 
      day === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear();

    days.push(
      <div
        key={day}
        className={`min-h-24 p-2 border rounded-lg ${isToday ? 'bg-blue-50 border-blue-300' : 'bg-white'} hover:shadow-md transition-shadow`}
      >
        <div className={`text-sm mb-1 ${isToday ? 'font-bold text-blue-600' : 'text-muted-foreground'}`}>
          {day}
        </div>
        <div className="space-y-1">
          {events.map((event, idx) => (
            <div
              key={idx}
              onClick={() => onItemClick(event.item)}
              className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: event.type === 'maintenance' ? '#dbeafe' : '#fef3c7',
                color: event.type === 'maintenance' ? '#1e40af' : '#92400e'
              }}
            >
              <div className="truncate">{event.item.name}</div>
              <div className="text-[10px] opacity-75">
                {event.type === 'maintenance' ? '🔧 Maintenance' : '🛡️ Warranty'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2>Maintenance Calendar</h2>
        <Button onClick={onAddCustomReminder}>
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Reminder
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {days}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#dbeafe' }} />
          <span className="text-sm">Maintenance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#fef3c7' }} />
          <span className="text-sm">Warranty Expiry</span>
        </div>
      </div>
    </div>
  );
}
