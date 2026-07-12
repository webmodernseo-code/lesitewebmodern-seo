import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, BookOpen, MessageSquare } from 'lucide-react';
import { ContentItem } from '@/types';

interface CalendarViewProps {
  items: ContentItem[];
  onSelectEvent: (item: ContentItem) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ items, onSelectEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    // 0 is Sunday, 1 is Monday, etc. Adjust for Monday start (1)
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert Sunday (0) to index 6, Monday (1) to index 0
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayIndex = getFirstDayOfMonth(currentDate);

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  // Filter events for this month
  const getEventsForDay = (day: number) => {
    return items.filter(item => {
      const dateStr = item.scheduled_at || item.published_at;
      if (!dateStr) return false;
      const eventDate = new Date(dateStr);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  // Generate calendar grid array
  const calendarCells = [];
  // Empty spaces for previous month's trailing days
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(i);
  }

  return (
    <div className="bg-white border border-brand-black/10 rounded-2xl overflow-hidden shadow-sm">
      {/* Header controls */}
      <div className="flex items-center justify-between p-6 border-b border-brand-black/10 bg-brand-sable/10">
        <h3 className="text-lg font-bold text-brand-black flex items-center gap-2">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-brand-sable/50 rounded-lg border border-brand-black/5 text-brand-black/70 hover:text-brand-black transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-brand-sable/50 rounded-lg border border-brand-black/5 text-brand-black/70 hover:text-brand-black transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-brand-black/10 bg-brand-sable/5">
        {daysOfWeek.map((day, idx) => (
          <div
            key={idx}
            className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-brand-black/40 border-r border-brand-black/5 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 grid-rows-6">
        {calendarCells.map((day, idx) => {
          const dayEvents = day ? getEventsForDay(day) : [];
          return (
            <div
              key={idx}
              className={`min-h-[120px] p-2 border-r border-b border-brand-black/10 last:border-r-0 relative group transition-colors ${
                day ? 'hover:bg-brand-sable/5 bg-white' : 'bg-brand-sable/5'
              }`}
            >
              {day && (
                <>
                  <span className="text-sm font-semibold text-brand-black/50 select-none">
                    {day}
                  </span>
                  
                  {/* Event list */}
                  <div className="mt-2 flex flex-col gap-1.5 overflow-y-auto max-h-[85px] scrollbar-thin">
                    {dayEvents.map(event => (
                      <button
                        key={event.id}
                        onClick={() => onSelectEvent(event)}
                        className={`text-left text-[11px] p-2 rounded-lg font-medium transition-all duration-200 border w-full flex flex-col gap-0.5 truncate ${
                          event.type === 'blog'
                            ? 'bg-brand-sable/60 hover:bg-brand-sable border-brand-orange/30 text-brand-black'
                            : 'bg-white hover:bg-brand-sable/30 border-brand-black/15 text-brand-black'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          {event.type === 'blog' ? (
                            <BookOpen className="w-3 h-3 text-brand-orange flex-shrink-0" />
                          ) : (
                            <MessageSquare className="w-3 h-3 text-brand-black flex-shrink-0" />
                          )}
                          <span className="font-semibold uppercase text-[9px] tracking-wider text-brand-black/40">
                            {event.type}
                          </span>
                        </div>
                        <span className="truncate block font-semibold">{event.title}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
