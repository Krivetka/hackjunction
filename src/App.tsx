import { useState, useMemo } from 'react';
import { Search, Grid3x3, List, Download, Trash2 } from 'lucide-react';
import { Header } from './components/Header';
import { HorizontalDatePicker } from './components/HorizontalDatePicker';
import { Sidebar, Filters } from './components/Sidebar';
import { EventCard } from './components/EventCard';
import { EventDetailsDrawer } from './components/EventDetailsDrawer';
import { CalendarView } from './components/CalendarView';
import { MapView } from './components/MapView';
import { EmptyState } from './components/EmptyState';
import { RightRail } from './components/RightRail';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Checkbox } from './components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { Separator } from './components/ui/separator';
import { eventsData, Event } from './data/events';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightRailCollapsed, setRightRailCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [selectedEventIds, setSelectedEventIds] = useState<Set<string>>(new Set());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDatePickerDate, setSelectedDatePickerDate] = useState<Date | null>(null);

  const [filters, setFilters] = useState<Filters>({
    quickFilter: 'upcoming',
    dateFrom: '',
    dateTo: '',
    categories: [],
    location: '',
    nearbyEnabled: false,
    radius: 10,
    priceFilter: 'all',
    formatFilter: [],
    organizer: '',
    searchQuery: '',
  });

  // Get all event dates for the date picker
  const eventDates = useMemo(() => {
    return eventsData.map((event) => new Date(event.date));
  }, []);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let result = [...eventsData];

    // Quick filter
    const now = new Date();
    if (filters.quickFilter === 'upcoming') {
      result = result.filter((event) => new Date(event.date) >= now);
    } else if (filters.quickFilter === 'past') {
      result = result.filter((event) => new Date(event.date) < now);
    }

    // Date picker filter
    if (selectedDatePickerDate) {
      result = result.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === selectedDatePickerDate.getDate() &&
          eventDate.getMonth() === selectedDatePickerDate.getMonth() &&
          eventDate.getFullYear() === selectedDatePickerDate.getFullYear()
        );
      });
    }

    // Date range
    if (filters.dateFrom) {
      result = result.filter((event) => new Date(event.date) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      result = result.filter(
        (event) => new Date(event.date) <= new Date(filters.dateTo + 'T23:59:59')
      );
    }

    // Categories
    if (filters.categories.length > 0) {
      result = result.filter((event) =>
        event.tags.some((tag) => filters.categories.includes(tag))
      );
    }

    // Location
    if (filters.location) {
      result = result.filter((event) =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Price
    if (filters.priceFilter === 'free') {
      result = result.filter((event) => event.price.toLowerCase() === 'free');
    } else if (filters.priceFilter === 'paid') {
      result = result.filter((event) => event.price.toLowerCase() !== 'free');
    }

    // Format
    if (filters.formatFilter.length > 0) {
      result = result.filter((event) => filters.formatFilter.includes(event.type));
    }

    // Organizer
    if (filters.organizer && filters.organizer !== 'all') {
      result = result.filter((event) => event.organizer === filters.organizer);
    }

    // Search
    if (searchQuery) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'soonest') {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.attendees - a.attendees);
    }

    return result;
  }, [filters, searchQuery, sortBy, selectedDatePickerDate]);

  const toggleEventSelection = (eventId: string) => {
    const newSelected = new Set(selectedEventIds);
    if (newSelected.has(eventId)) {
      newSelected.delete(eventId);
    } else {
      newSelected.add(eventId);
    }
    setSelectedEventIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedEventIds.size === filteredEvents.length) {
      setSelectedEventIds(new Set());
    } else {
      setSelectedEventIds(new Set(filteredEvents.map((e) => e.id)));
    }
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleManageEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
    toast.success('Opening event management panel');
  };

  const handleCreateEvent = () => {
    toast.success('Create event modal would open here');
  };

  const handleBulkDelete = () => {
    toast.success(`${selectedEventIds.size} events would be deleted`);
    setSelectedEventIds(new Set());
  };

  const handleBulkExport = () => {
    toast.success(`Exporting ${selectedEventIds.size} events to CSV`);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Toaster />
      
      {/* Header */}
      <Header onCreateEvent={handleCreateEvent} />

      {/* Horizontal Date Picker */}
      <HorizontalDatePicker
        selectedDate={selectedDatePickerDate}
        onDateSelect={(date) => setSelectedDatePickerDate(date)}
        eventDates={eventDates}
      />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1>Events in Espoo</h1>
                <Badge variant="secondary">
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="soonest">Soonest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
                <Separator orientation="vertical" className="h-8" />
                <div className="flex gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedEventIds.size > 0 && (
              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedEventIds.size === filteredEvents.length}
                    onCheckedChange={toggleSelectAll}
                  />
                  <span className="text-sm">
                    {selectedEventIds.size} event{selectedEventIds.size !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleBulkExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            )}

            {/* Date selection info and Search */}
            <div className="flex items-center gap-4">
              {selectedDatePickerDate && (
                <div className="flex items-center gap-2 px-4 py-2 bg-orange/10 rounded-lg border border-orange/20">
                  <span className="text-sm">
                    Showing events for{' '}
                    <strong>
                      {selectedDatePickerDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </strong>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDatePickerDate(null)}
                    className="h-6 px-2"
                  >
                    Clear
                  </Button>
                </div>
              )}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                <Input
                  type="search"
                  placeholder="Search event title, tag, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-11"
                />
              </div>
            </div>

            {/* Events Grid/List */}
            {filteredEvents.length === 0 ? (
              <EmptyState onCreateEvent={handleCreateEvent} />
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    viewMode={viewMode}
                    isSelected={selectedEventIds.has(event.id)}
                    onToggleSelect={() => toggleEventSelection(event.id)}
                    onView={() => handleViewEvent(event)}
                    onManage={() => handleManageEvent(event)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Right Rail */}
        <RightRail
          isCollapsed={rightRailCollapsed}
          onToggle={() => setRightRailCollapsed(!rightRailCollapsed)}
          onOpenCalendar={() => setShowCalendar(true)}
          onOpenMap={() => setShowMap(true)}
          totalEvents={filteredEvents.length}
        />
      </div>

      {/* Modals/Drawers */}
      <EventDetailsDrawer
        event={selectedEvent}
        isOpen={showEventDetails}
        onClose={() => setShowEventDetails(false)}
      />

      <CalendarView
        events={filteredEvents}
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        onEventClick={(event) => {
          setSelectedEvent(event);
          setShowEventDetails(true);
        }}
      />

      <MapView
        events={filteredEvents}
        isOpen={showMap}
        onClose={() => setShowMap(false)}
        onEventClick={(event) => {
          setSelectedEvent(event);
          setShowEventDetails(true);
        }}
      />
    </div>
  );
}
