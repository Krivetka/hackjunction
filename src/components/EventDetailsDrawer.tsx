import { X, Calendar, MapPin, Users, DollarSign, Edit, Download, Share2, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Event } from '../data/events';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';

interface EventDetailsDrawerProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailsDrawer({ event, isOpen, onClose }: EventDetailsDrawerProps) {
  if (!isOpen || !event) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    };
  };

  const formattedDate = formatDate(event.date);

  const attendees = Array.from({ length: 12 }, (_, i) => ({
    id: `attendee-${i}`,
    name: `Attendee ${i + 1}`,
    email: `attendee${i + 1}@example.com`,
    status: i % 3 === 0 ? 'confirmed' : i % 3 === 1 ? 'pending' : 'cancelled',
  }));

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-card z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2>Event Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Cover Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <ImageWithFallback
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-primary text-white">
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
            </div>

            {/* Title and Actions */}
            <div className="space-y-4">
              <div>
                <h1 className="mb-2">{event.title}</h1>
                <p className="text-muted-foreground text-lg">{event.short}</p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Event
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Key Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-background rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Date & Time</span>
                </div>
                <p className="text-sm">
                  {formattedDate.full}
                  <br />
                  {formattedDate.time}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </div>
                <p className="text-sm">{event.location}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Users className="h-4 w-4" />
                  <span>Attendees</span>
                </div>
                <p className="text-sm">{event.attendees} registered</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <DollarSign className="h-4 w-4" />
                  <span>Price</span>
                </div>
                <p className="text-sm">{event.price}</p>
              </div>
            </div>

            {/* Organizer */}
            <div className="space-y-3">
              <h3>Organizer</h3>
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${event.organizer}`} />
                  <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p>{event.organizer}</p>
                  <p className="text-sm text-muted-foreground">Verified Organizer</p>
                </div>
                <Button variant="outline" size="sm">Contact</Button>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <h3>Categories</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Tabs */}
            <Tabs defaultValue="attendees" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="attendees" className="flex-1">Attendees</TabsTrigger>
                <TabsTrigger value="statistics" className="flex-1">Statistics</TabsTrigger>
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="attendees" className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {attendees.filter(a => a.status === 'confirmed').length} confirmed, {attendees.filter(a => a.status === 'pending').length} pending
                  </p>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Export List
                  </Button>
                </div>
                <div className="space-y-2">
                  {attendees.slice(0, 8).map((attendee) => (
                    <div key={attendee.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${attendee.id}`} />
                          <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">{attendee.name}</p>
                          <p className="text-xs text-muted-foreground">{attendee.email}</p>
                        </div>
                      </div>
                      <Badge variant={attendee.status === 'confirmed' ? 'default' : 'outline'} className="text-xs">
                        {attendee.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="statistics" className="space-y-4 mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-background rounded-lg text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-2xl font-medium">{event.attendees}</p>
                    <p className="text-xs text-muted-foreground">Total Registrations</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg text-center">
                    <div className="flex items-center justify-center mb-2">
                      <BarChart3 className="h-5 w-5 text-accent" />
                    </div>
                    <p className="text-2xl font-medium">87%</p>
                    <p className="text-xs text-muted-foreground">Attendance Rate</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg text-center">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-2xl font-medium">
                      {event.price === 'Free' ? '€0' : `${event.price.match(/\d+/)?.[0] || '0'}`}
                    </p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <h4 className="mb-3">Registration Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Week 1</span>
                      <span>42 registrations</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Week 2</span>
                      <span>28 registrations</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Week 3</span>
                      <span>14 registrations</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="p-4 bg-background rounded-lg space-y-3">
                  <div>
                    <h4 className="mb-2">Description</h4>
                    <p className="text-muted-foreground">
                      {event.short} Join us for a warm and welcoming {event.title.toLowerCase()}. This is a wonderful opportunity to connect with neighbors, make new friends, and share experiences. Everyone is welcome, regardless of age or experience level. We believe in the power of community and intergenerational connections!
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="mb-2">What to bring</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Valid ID for registration</li>
                      <li>Notebook and pen</li>
                      <li>Enthusiasm and curiosity</li>
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="mb-2">Agenda</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-3">
                        <span className="text-muted-foreground w-16">{formattedDate.time}</span>
                        <span>Registration & Welcome</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-muted-foreground w-16">+30min</span>
                        <span>Main Session</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-muted-foreground w-16">+60min</span>
                        <span>Networking Break</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
