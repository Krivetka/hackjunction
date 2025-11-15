import { useState } from 'react';
import { Calendar, TrendingUp, Users, DollarSign, Map, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface RightRailProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onOpenCalendar: () => void;
  onOpenMap: () => void;
  totalEvents: number;
}

export function RightRail({ isCollapsed, onToggle, onOpenCalendar, onOpenMap, totalEvents }: RightRailProps) {
  if (isCollapsed) {
    return (
      <div className="w-16 border-l bg-card flex flex-col items-center py-4">
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  const today = new Date();
  const currentMonth = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <aside className="w-[320px] border-l bg-card overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3>Insights</h3>
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="space-y-3">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Upcoming</span>
              </div>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl">{totalEvents}</p>
            <p className="text-xs text-muted-foreground mt-1">Events this month</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">Attendees</span>
              </div>
            </div>
            <p className="text-2xl">1,221</p>
            <p className="text-xs text-muted-foreground mt-1">Total registrations</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-orange/10">
                  <DollarSign className="h-4 w-4 text-orange" />
                </div>
                <span className="text-sm text-muted-foreground">Revenue</span>
              </div>
            </div>
            <p className="text-2xl">€3,840</p>
            <p className="text-xs text-muted-foreground mt-1">From paid events</p>
          </Card>
        </div>

        {/* Mini Calendar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4>Quick Calendar</h4>
            <Button variant="ghost" size="sm" onClick={onOpenCalendar}>
              View Full
            </Button>
          </div>
          <Card className="p-4">
            <div className="text-center mb-3">
              <p className="text-sm text-muted-foreground">{currentMonth}</p>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-muted-foreground p-1">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 2; // Start from day 1
                const hasEvent = [5, 12, 15, 22, 28].includes(day);
                const isToday = day === today.getDate();

                return (
                  <div
                    key={i}
                    className={`p-1 rounded ${
                      day > 0 && day <= 30
                        ? isToday
                          ? 'bg-primary text-white'
                          : hasEvent
                          ? 'bg-accent/20 text-accent cursor-pointer'
                          : ''
                        : ''
                    }`}
                  >
                    {day > 0 && day <= 30 ? day : ''}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Map Button */}
        <Button variant="outline" className="w-full" onClick={onOpenMap}>
          <Map className="h-4 w-4 mr-2" />
          View Map
        </Button>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h4>Recent Activity</h4>
          <div className="space-y-2 text-sm">
            <div 
              className="p-3 bg-background rounded-lg cursor-pointer transition-all duration-150"
              style={{
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(160, 155, 231, 0.14)';
                e.currentTarget.style.backdropFilter = 'blur(6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '';
                e.currentTarget.style.backdropFilter = '';
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <p>New registration</p>
                <Badge variant="outline" className="text-xs">2m ago</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Design Systems Meetup</p>
            </div>
            <div 
              className="p-3 bg-background rounded-lg cursor-pointer transition-all duration-150"
              style={{
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(160, 155, 231, 0.14)';
                e.currentTarget.style.backdropFilter = 'blur(6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '';
                e.currentTarget.style.backdropFilter = '';
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <p>Event published</p>
                <Badge variant="outline" className="text-xs">1h ago</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Startup Pitch Night</p>
            </div>
            <div 
              className="p-3 bg-background rounded-lg cursor-pointer transition-all duration-150"
              style={{
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(160, 155, 231, 0.14)';
                e.currentTarget.style.backdropFilter = 'blur(6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '';
                e.currentTarget.style.backdropFilter = '';
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <p>Payment received</p>
                <Badge variant="outline" className="text-xs">3h ago</Badge>
              </div>
              <p className="text-xs text-muted-foreground">JavaScript Deep Dive</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
