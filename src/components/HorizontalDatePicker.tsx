import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface HorizontalDatePickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  eventDates: Date[];
}

export function HorizontalDatePicker({
  selectedDate,
  onDateSelect,
  eventDates,
}: HorizontalDatePickerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  // Generate 60 days (2 months) from today
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = -7; i < 53; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftFade(scrollLeft > 0);
      setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const hasEvents = (date: Date) => {
    return eventDates.some(
      (eventDate) =>
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
    );
  };

  const getMonthLabel = (date: Date, index: number) => {
    if (index === 0 || date.getDate() === 1) {
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
    }
    return null;
  };

  const handleKeyDown = (e: React.KeyboardEvent, date: Date) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onDateSelect(date);
    }
  };

  return (
    <div className="relative bg-white border-b border-border">
      <div className="relative overflow-hidden">
        {/* Left fade gradient */}
        {showLeftFade && (
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        )}

        {/* Right fade gradient */}
        {showRightFade && (
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        )}

        {/* Left scroll button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 translate-y-[calc(-50%+24px)] z-20 bg-white shadow-md hover:bg-white/90 rounded-full h-11 w-11"
          onClick={() => scroll('left')}
          disabled={!showLeftFade}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Right scroll button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 translate-y-[calc(-50%+16px)] z-20 bg-white shadow-md hover:bg-white/90 rounded-full h-11 w-11"
          onClick={() => scroll('right')}
          disabled={!showRightFade}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Scrolling date container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide px-16 py-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex flex-col gap-3 min-w-max">
            {/* Month labels row */}
            <div className="flex gap-3 h-5">
              {dates.map((date, index) => {
                const monthLabel = getMonthLabel(date, index);
                return (
                  <div key={`label-${date.toISOString()}`} className="min-w-[68px]">
                    {monthLabel && (
                      <div className="text-xs font-medium text-muted-foreground pl-1">
                        {monthLabel}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Dates row */}
            <div className="flex gap-3">
              {dates.map((date, index) => {
                const selected = isSelected(date);
                const today = isToday(date);
                const past = isPast(date);
                const weekend = isWeekend(date);
                const events = hasEvents(date);

                return (
                  <TooltipProvider key={date.toISOString()} delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onDateSelect(date)}
                          onKeyDown={(e) => handleKeyDown(e, date)}
                          className={`
                            relative flex flex-col items-center justify-center
                            min-w-[68px] h-[76px] rounded-xl
                            transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                            ${
                              selected
                                ? 'bg-orange text-white shadow-md scale-105'
                                : past
                                ? 'bg-transparent text-muted-foreground/50 hover:bg-secondary/50'
                                : weekend && !selected
                                ? 'bg-orange/10 text-orange hover:bg-orange/20'
                                : 'bg-transparent text-foreground hover:bg-secondary'
                            }
                            ${today && !selected ? 'ring-2 ring-primary ring-offset-2' : ''}
                          `}
                          disabled={past}
                          aria-label={`Select ${date.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                          })}`}
                        >
                          <span className="text-2xl font-medium mb-1">
                            {date.getDate()}
                          </span>
                          <span className="text-xs uppercase tracking-wide opacity-90">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </span>
                          {events && !past && (
                            <div className="absolute -top-1 -right-1">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            </div>
                          )}
                        </button>
                      </TooltipTrigger>
                      {today && (
                        <TooltipContent>
                          <p>Today</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
