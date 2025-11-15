import { Calendar, MapPin, Users, MoreVertical, Eye, Settings } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Checkbox } from './ui/checkbox';
import { Event } from '../data/events';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCardProps {
  event: Event;
  viewMode: 'grid' | 'list';
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onView: () => void;
  onManage: () => void;
}

export function EventCard({ event, viewMode, isSelected, onToggleSelect, onView, onManage }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    };
  };

  const formattedDate = formatDate(event.date);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'online':
        return 'text-white';
      case 'offline':
        return 'text-white';
      case 'hybrid':
        return 'text-white';
      default:
        return 'bg-secondary';
    }
  };
  
  const getTypeStyle = (type: string) => {
    if (type === 'online') {
      return { backgroundColor: '#FF7A3A' };
    }
    if (type === 'offline') {
      return { backgroundColor: '#A09BE7' };
    }
    if (type === 'hybrid') {
      return { background: 'linear-gradient(110deg, #FF7A3A 0%, #F8758F 40%, #B69BEF 100%)' };
    }
    return {};
  };

  const getPriceStyle = () => {
    return {
      backgroundColor: '#F3ECFF',
      color: '#A09BE7',
      border: '1px solid #E3DAFF'
    };
  };

  if (viewMode === 'list') {
    return (
      <Card
        className={`group relative overflow-hidden transition-all hover:shadow-lg ${
          isSelected ? 'ring-2 ring-primary' : ''
        }`}
      >
        <div className="flex gap-4 p-4">
          {/* Checkbox */}
          <div className="flex items-start pt-1">
            <Checkbox checked={isSelected} onCheckedChange={onToggleSelect} />
          </div>

          {/* Image */}
          <div className="relative w-48 h-28 flex-shrink-0 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <Badge className={`absolute top-2 left-2 ${getTypeColor(event.type)}`} style={getTypeStyle(event.type)}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Badge>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="mb-2">{event.title}</h3>
                <p className="text-muted-foreground mb-3 line-clamp-1">{event.short}</p>
                <div className="flex flex-col gap-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>
                      {formattedDate.day}, {formattedDate.date} · {formattedDate.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {event.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Right side actions */}
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees}</span>
                  </div>
                  <Badge variant="outline" style={getPriceStyle()}>
                    {event.price}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={onView}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" onClick={onManage}>
                    <Settings className="h-4 w-4 mr-1" />
                    Manage
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view
  return (
    <Card
      className={`group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
    >
      {/* Checkbox */}
      <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Checkbox checked={isSelected} onCheckedChange={onToggleSelect} className="bg-white" />
      </div>

      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <Badge className={`absolute top-3 right-3 ${getTypeColor(event.type)}`} style={getTypeStyle(event.type)}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-white/90 hover:bg-white/90 text-gray-700 hover:text-gray-700"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onManage}>Manage</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3>{event.title}</h3>
        
        <p className="text-muted-foreground line-clamp-2">{event.short}</p>

        <div className="space-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>
              {formattedDate.day}, {formattedDate.date} · {formattedDate.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {event.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${event.organizer}`} />
            <AvatarFallback>{event.organizer[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{event.organizer}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{event.attendees}</span>
            </div>
            <Badge variant="outline" style={getPriceStyle()}>
              {event.price}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onView}>
              View
            </Button>
            <Button size="sm" onClick={onManage}>
              Manage
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
