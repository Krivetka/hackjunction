import { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, DollarSign, Monitor, Users, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export interface Filters {
  quickFilter: 'upcoming' | 'past' | 'drafts' | 'all';
  dateFrom: string;
  dateTo: string;
  categories: string[];
  location: string;
  nearbyEnabled: boolean;
  radius: number;
  priceFilter: 'all' | 'free' | 'paid';
  formatFilter: ('online' | 'offline' | 'hybrid')[];
  organizer: string;
  searchQuery: string;
}

const categories = [
  'Cooking',
  'Knitting',
  'Gardening',
  'Choir',
  'Music',
  'Reading',
  'Poetry',
  'Repair',
  'Workshop',
  'Computer Help',
  'Wellbeing',
  'Sports',
  'Intergenerational',
  'Community',
  'Crafts',
  'Learning',
];

export function Sidebar({ isCollapsed, onToggle, filters, onFiltersChange }: SidebarProps) {
  if (isCollapsed) {
    return (
      <div className="w-16 border-r bg-card flex flex-col items-center py-4">
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    updateFilter('categories', newCategories);
  };

  const toggleFormat = (format: 'online' | 'offline' | 'hybrid') => {
    const newFormats = filters.formatFilter.includes(format)
      ? filters.formatFilter.filter((f) => f !== format)
      : [...filters.formatFilter, format];
    updateFilter('formatFilter', newFormats);
  };

  const resetFilters = () => {
    onFiltersChange({
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
  };

  return (
    <aside className="w-[280px] border-r bg-card overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Header with collapse button */}
        <div className="flex items-center justify-between">
          <h3>Filters</h3>
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Quick Filters</Label>
          <div className="flex flex-col gap-1">
            {(['upcoming', 'past', 'drafts'] as const).map((filter) => (
              <Button
                key={filter}
                variant={filters.quickFilter === filter ? 'default' : 'ghost'}
                className={`justify-start ${filters.quickFilter !== filter ? 'hover:bg-[#F2EEFF] hover:text-foreground' : ''}`}
                onClick={() => updateFilter('quickFilter', filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Date Range */}
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Date Range</Label>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" className="hover:bg-[#F2EEFF] hover:text-foreground" onClick={() => {
              const today = new Date().toISOString().split('T')[0];
              updateFilter('dateFrom', today);
              updateFilter('dateTo', today);
            }}>
              Today
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-[#F2EEFF] hover:text-foreground" onClick={() => {
              const today = new Date();
              const next7 = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
              updateFilter('dateFrom', today.toISOString().split('T')[0]);
              updateFilter('dateTo', next7.toISOString().split('T')[0]);
            }}>
              Next 7 days
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-[#F2EEFF] hover:text-foreground" onClick={() => {
              const today = new Date();
              const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
              const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
              updateFilter('dateFrom', firstDay.toISOString().split('T')[0]);
              updateFilter('dateTo', lastDay.toISOString().split('T')[0]);
            }}>
              This month
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted" />
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => updateFilter('dateFrom', e.target.value)}
                className="text-sm"
                placeholder="From"
              />
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted" />
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => updateFilter('dateTo', e.target.value)}
                className="text-sm"
                placeholder="To"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Categories */}
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Categories</Label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={filters.categories.includes(category) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Location</Label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted" />
            <Input
              type="text"
              placeholder="Espoo, Finland"
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="nearby" className="text-sm">Nearby events</Label>
            <Switch
              id="nearby"
              checked={filters.nearbyEnabled}
              onCheckedChange={(checked) => updateFilter('nearbyEnabled', checked)}
            />
          </div>
          {filters.nearbyEnabled && (
            <div className="space-y-2">
              <Label className="text-sm">Radius: {filters.radius} km</Label>
              <Slider
                value={[filters.radius]}
                onValueChange={([value]) => updateFilter('radius', value)}
                min={1}
                max={100}
                step={1}
              />
            </div>
          )}
        </div>

        <Separator />

        {/* Price */}
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Price</Label>
          <div className="flex gap-2">
            {(['all', 'free', 'paid'] as const).map((price) => (
              <Button
                key={price}
                variant={filters.priceFilter === price ? 'default' : 'outline'}
                size="sm"
                className={filters.priceFilter !== price ? 'hover:bg-[#F2EEFF] hover:text-foreground' : ''}
                onClick={() => updateFilter('priceFilter', price)}
              >
                {price === 'all' ? 'All' : price.charAt(0).toUpperCase() + price.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Format */}
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Format</Label>
          <div className="space-y-2">
            {(['online', 'offline', 'hybrid'] as const).map((format) => (
              <div key={format} className="flex items-center space-x-2">
                <Checkbox
                  id={format}
                  checked={filters.formatFilter.includes(format)}
                  onCheckedChange={() => toggleFormat(format)}
                />
                <Label htmlFor={format} className="text-sm cursor-pointer flex items-center gap-2">
                  <Monitor className="h-3 w-3" />
                  {format.charAt(0).toUpperCase() + format.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Organizer */}
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Organizer</Label>
          <Select value={filters.organizer} onValueChange={(value) => updateFilter('organizer', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select organizer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Organizers</SelectItem>
              <SelectItem value="Warm Meetings Club">Warm Meetings Club</SelectItem>
              <SelectItem value="The Yarn Group">The Yarn Group</SelectItem>
              <SelectItem value="Maria, volunteer">Maria, volunteer</SelectItem>
              <SelectItem value="Peter, craftsman">Peter, craftsman</SelectItem>
              <SelectItem value="Espoo Garden Club">Espoo Garden Club</SelectItem>
              <SelectItem value="Generations Together">Generations Together</SelectItem>
              <SelectItem value="Espoo Senior Choir">Espoo Senior Choir</SelectItem>
              <SelectItem value="Tech for Seniors">Tech for Seniors</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </aside>
  );
}
