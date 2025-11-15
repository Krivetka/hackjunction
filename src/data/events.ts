export interface Event {
  id: string;
  title: string;
  type: 'online' | 'offline' | 'hybrid';
  date: string;
  location: string;
  tags: string[];
  organizer: string;
  attendees: number;
  price: string;
  image: string;
  short: string;
}

export const eventsData: Event[] = [
  {
    id: 'e1',
    title: "Grandma's Cooking Workshop: Traditional Pies",
    type: 'offline',
    date: '2025-11-22T18:00:00',
    location: 'Leppävaara, Espoo, Finland',
    tags: ['Cooking', 'Community'],
    organizer: 'Warm Meetings Club',
    attendees: 24,
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1758874960735-16f7b37aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwY29va2luZyUyMGJha2luZ3xlbnwxfHx8fDE3NjMyMTQzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    short: 'Learn classic recipes in a cozy, friendly atmosphere.',
  },
  {
    id: 'e2',
    title: 'Knitting & Crafts for Everyone',
    type: 'offline',
    date: '2025-11-25T14:00:00',
    location: 'Matinkylä Community Center, Espoo',
    tags: ['Knitting', 'Crafts'],
    organizer: 'The Yarn Group',
    attendees: 16,
    price: '€5',
    image: 'https://images.unsplash.com/photo-1545409584-ed7615e16a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrbml0dGluZyUyMGNyYWZ0cyUyMGhhbmRzfGVufDF8fHx8MTc2MzIxNDMyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    short: 'Bring your yarn and tea — beginners welcome.',
  },
  {
    id: 'e3',
    title: 'Online Poetry Reading: Nostalgia Evening',
    type: 'online',
    date: '2025-11-30T16:00:00',
    location: 'Online',
    tags: ['Poetry', 'Reading'],
    organizer: 'Maria, volunteer',
    attendees: 48,
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1598738865218-7809c17181c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFkaW5nJTIwcG9ldHJ5JTIwYm9va3xlbnwxfHx8fDE3NjMyMTQzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    short: 'Share beloved poems and memories together.',
  },
  {
    id: 'e4',
    title: 'Repair Workshop: Simple Home Fixes',
    type: 'offline',
    date: '2025-12-02T11:00:00',
    location: 'Espoon Keskus, Espoo',
    tags: ['Repair', 'Workshop'],
    organizer: 'Peter, craftsman',
    attendees: 12,
    price: '€8',
    image: 'https://images.unsplash.com/photo-1727413434026-0f8314c037d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMHJlcGFpciUyMHRvb2xzfGVufDF8fHx8MTc2MzIxNDMyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    short: 'Learn to fix everyday items with hands-on guidance.',
  },
  {
    id: 'e5',
    title: 'Gardening Club: Winter Preparation',
    type: 'hybrid',
    date: '2025-12-05T10:00:00',
    location: 'Espoo / Online',
    tags: ['Gardening', 'Wellbeing'],
    organizer: 'Espoo Garden Club',
    attendees: 30,
    price: '€3',
    image: 'https://images.unsplash.com/photo-1722404476013-6baa2b72caaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW5pbmclMjBwbGFudHMlMjBuYXR1cmV8ZW58MXx8fHwxNzYzMjE0MzI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    short: 'Plan your spring garden and learn winter plant care.',
  },
  {
    id: 'e6',
    title: 'Tea & Stories: Intergenerational Meetup',
    type: 'offline',
    date: '2025-11-28T15:00:00',
    location: 'Tapiola Library, Espoo',
    tags: ['Community', 'Intergenerational'],
    organizer: 'Generations Together',
    attendees: 35,
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1612024639971-3d661b054170?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBjdXAlMjB3YXJtfGVufDF8fHx8MTc2MzIxNDMyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    short: 'Young and old share life stories over tea and cookies.',
  },
  {
    id: 'e7',
    title: 'Choir Practice: Finnish Folk Songs',
    type: 'offline',
    date: '2025-12-08T13:00:00',
    location: 'Espoo Cultural Centre, Espoo',
    tags: ['Music', 'Choir'],
    organizer: 'Espoo Senior Choir',
    attendees: 28,
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1761299146723-0a90d199b893?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGVvcGxlJTIwY29tbXVuaXR5fGVufDF8fHx8MTc2MzIxNDMyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    short: 'Join our friendly choir — all voices welcome!',
  },
  {
    id: 'e8',
    title: 'Computer Help: Getting Started with Smartphones',
    type: 'offline',
    date: '2025-12-10T10:00:00',
    location: 'Leppävaara Library, Espoo',
    tags: ['Computer Help', 'Learning'],
    organizer: 'Tech for Seniors',
    attendees: 20,
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1758612899162-7f9abfc0d6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmdlbmVyYXRpb25hbCUyMGVsZGVybHklMjB5b3VuZ3xlbnwxfHx8fDE3NjMyMTQzMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    short: 'Patient, one-on-one help with your smartphone.',
  },
];
