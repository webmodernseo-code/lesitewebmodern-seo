import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, MessageSquare, Clock } from 'lucide-react';
import { dbService } from '@/lib/content-client';
import { ContentItem } from '@/types';

export const CalendarTabView: React.FC = () => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weeklyItems, setWeeklyItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const allItems = await dbService.getContentItems();
      setItems(allItems);

      // Filter items scheduled for "this week" (next 7 days from today)
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      
      const filteredWeekly = allItems.filter(item => {
        const dateStr = item.scheduled_at || item.published_at;
        if (!dateStr) return false;
        const d = new Date(dateStr);
        return d >= today && d <= nextWeek;
      });
      setWeeklyItems(filteredWeekly);
    } catch (err) {
      console.error(err);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert Sunday (0) to index 6
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

  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

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

  const calendarCells = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(i);
  }

  // Format date helper
  const formatDateLabel = (dateStr?: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const days = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
    return `${days[d.getDay()]} ${d.getDate()} -`;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Legend Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-brand-black tracking-tight">Calendrier</h2>
          <p className="text-xs text-brand-black/50 font-medium">Visualisez vos planifications mensuelles et hebdomadaires.</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-orange"></span>
            <span className="text-brand-black/65">blog</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-black"></span>
            <span className="text-brand-black/65">linkedin</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Monthly Calendar Grid (3/4 of page) */}
        <div className="lg:col-span-3 bg-white border border-brand-black/10 rounded-2xl overflow-hidden shadow-sm">
          {/* Controls */}
          <div className="flex items-center justify-between p-6 border-b border-brand-black/10 bg-brand-sable/10">
            <h3 className="text-base font-extrabold text-brand-black flex items-center gap-2 uppercase tracking-wide">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="p-1.5 hover:bg-brand-sable/50 rounded-lg border border-brand-black/5 text-brand-black/70 hover:text-brand-black transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1.5 hover:bg-brand-sable/50 rounded-lg border border-brand-black/5 text-brand-black/70 hover:text-brand-black transition-colors"
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
                className="py-3 text-center text-xs font-bold text-brand-black/40 border-r border-brand-black/5 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 border-b border-brand-black/5">
            {calendarCells.map((day, idx) => {
              const dayEvents = day ? getEventsForDay(day) : [];
              const isToday = day && 
                day === new Date().getDate() && 
                currentDate.getMonth() === new Date().getMonth() && 
                currentDate.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={idx}
                  className={`min-h-[100px] p-2 border-r border-b border-brand-black/5 last:border-r-0 relative group transition-colors ${
                    day 
                      ? isToday 
                        ? 'bg-brand-sable/20' 
                        : 'bg-white hover:bg-brand-sable/5' 
                      : 'bg-brand-sable/5'
                  }`}
                >
                  {day && (
                    <>
                      <span className={`text-xs font-bold ${
                        isToday ? 'text-brand-orange' : 'text-brand-black/50'
                      }`}>
                        {day}
                      </span>
                      
                      {/* Short list of events */}
                      <div className="mt-1 flex flex-col gap-1 overflow-y-auto max-h-[70px] scrollbar-thin">
                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className={`text-[10px] font-bold px-2 py-1 rounded border truncate uppercase tracking-wide ${
                              event.type === 'blog'
                                ? 'bg-brand-sable/60 border-brand-orange/30 text-brand-orange'
                                : 'bg-brand-black text-white border-brand-black'
                            }`}
                          >
                            {event.type === 'blog' ? 'seo' : 'post'}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: CETTE SEMAINE (1/4 of page) */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-brand-black/50 uppercase tracking-widest">
            Cette semaine
          </h3>

          <div className="space-y-3">
            {weeklyItems.length > 0 ? (
              weeklyItems.map(item => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    item.type === 'blog'
                      ? 'bg-brand-sable border-brand-orange/30 text-brand-black'
                      : 'bg-white border-brand-black/10 text-brand-black shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {item.type === 'blog' ? (
                      <BookOpen className="w-3.5 h-3.5 text-brand-orange" />
                    ) : (
                      <MessageSquare className="w-3.5 h-3.5 text-brand-black" />
                    )}
                    <span className="text-[9px] font-bold uppercase tracking-wider text-brand-black/45">
                      {item.type === 'blog' ? 'blog' : 'linkedin'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-tight block mb-2">
                    {formatDateLabel(item.scheduled_at || item.published_at)} {item.title}
                  </h4>
                  {item.scheduled_at && (
                    <div className="flex items-center gap-1 text-[9px] text-brand-black/40 font-bold">
                      <Clock className="w-3 h-3 text-brand-orange" />
                      {new Date(item.scheduled_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white border border-brand-black/5 border-dashed rounded-xl py-8 text-center text-xs font-semibold text-brand-black/40">
                Rien de planifié cette semaine
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
