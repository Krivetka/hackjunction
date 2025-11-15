import { X, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Event } from '../data/events';
import { useState } from 'react';

interface MapViewProps {
  events: Event[];
  isOpen: boolean;
  onClose: () => void;
  onEventClick: (event: Event) => void;
}

export function MapView({ events, isOpen, onClose, onEventClick }: MapViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (!isOpen) return null;

  // Finland coordinates for demo
  const locations = [
    { city: 'Helsinki', lat: 60.1699, lng: 24.9384 },
    { city: 'Tampere', lat: 61.4978, lng: 23.7610 },
    { city: 'Turku', lat: 60.4518, lng: 22.2666 },
    { city: 'Espoo', lat: 60.2055, lng: 24.6559 },
    { city: 'Oulu', lat: 65.0121, lng: 25.4651 },
  ];

  const getLocationForEvent = (event: Event) => {
    if (event.type === 'online') return null;
    const city = event.location.split(',')[0];
    return locations.find((loc) => loc.city === city);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Map Modal */}
      <div className="fixed inset-4 md:inset-10 bg-card z-50 rounded-xl shadow-2xl flex overflow-hidden">
        {/* Map Area (Placeholder) */}
        <div className="flex-1 relative bg-background">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="h-16 w-16 text-primary mx-auto" />
              <div>
                <h3>Interactive Map</h3>
                <p className="text-muted-foreground">
                  Map visualization showing event locations across Finland
                </p>
              </div>
            </div>
          </div>

          {/* Map Markers */}
          {events
            .filter((event) => event.type !== 'online')
            .map((event, index) => {
              const location = getLocationForEvent(event);
              if (!location) return null;

              // Position markers in a semi-realistic way (demo purposes)
              const positions = [
                { top: '45%', left: '52%' }, // Helsinki
                { top: '35%', left: '45%' }, // Tampere
                { top: '48%', left: '40%' }, // Turku
                { top: '46%', left: '54%' }, // Espoo
                { top: '15%', left: '48%' }, // Oulu
              ];

              const pos = positions[index % positions.length];

              return (
                <div
                  key={event.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative group">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                      <MapPin className="h-5 w-5" />
                    </div>
                    {selectedEvent?.id === event.id && (
                      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-xl min-w-[200px] z-10">
                        <p className="text-sm mb-1">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.location}</p>
                        <Button
                          size="sm"
                          className="w-full mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(event);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          {/* Close Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 shadow-lg"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Event List Sidebar */}
        <div className="w-80 border-l bg-card overflow-y-auto">
          <div className="p-4 border-b">
            <h3>Events on Map</h3>
            <p className="text-sm text-muted-foreground">
              {events.filter((e) => e.type !== 'online').length} location-based events
            </p>
          </div>
          <div className="p-4 space-y-3">
            {events
              .filter((event) => event.type !== 'online')
              .map((event) => (
                <div
                  key={event.id}
                  className={`p-3 border rounded-lg cursor-pointer hover:bg-accent/10 transition-colors ${
                    selectedEvent?.id === event.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm mb-1">{event.title}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.attendees} attendees
                        </Badge>
                      </div>
                    </div>
                    <Badge
                      className={
                        event.type === 'offline'
                          ? 'bg-primary text-white'
                          : 'bg-purple-500 text-white'
                      }
                    >
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
