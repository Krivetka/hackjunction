# Espoo Together - Intergenerational Community Events Platform

A warm, accessible desktop web application for elderly people (65+) and younger community members in Espoo, Finland to create, discover, and join local community events. Designed to reduce loneliness and promote intergenerational connections.

## Key Features

### 🗓️ Horizontal Date Picker (Yandex Afisha Style)
- Full-width scrollable date strip below header
- Month labels with individual day cells
- Weekend days highlighted in warm orange
- Event indicators on dates with activities
- Selected day shown with orange pill background
- Today marked with purple outline
- Keyboard navigable (arrow keys + Enter)
- Smooth fade gradients and scroll buttons

### 🎯 Elderly-Friendly Design
- Large, accessible typography (18px base, up to 32px headings)
- High contrast (WCAG AA compliant)
- Minimum 44×44px tap targets
- Clear visual hierarchy
- Warm color palette with orange (#FF7A3A) and lavender purple (#A09BE7)
- Simple, calm interface without clutter

### 🏘️ Community-Focused Categories
- Cooking & Baking
- Knitting & Crafts
- Gardening
- Choir & Music
- Reading & Poetry
- Repair Workshops
- Computer Help
- Wellbeing & Sports
- Intergenerational Meetups
- And more...

### 📍 Location-Centric
- Default location: Espoo, Finland
- Nearby events toggle with radius slider
- Map view showing event locations
- All sample events based in Espoo neighborhoods

### 🎨 Design Tokens

**Colors:**
- Primary (Lavender Purple): #A09BE7
- Secondary (Orange): #FF7A3A
- Accent (Light Purple): #C5C1F0
- Background: #F6F7FB
- Surface: #FFFFFF
- Border: #E6E9F0
- Text: #0F1724
- Muted: #6B7280

**Typography:**
- H1: 32px / 40px line-height
- H2: 24px / 32px
- H3: 20px / 28px
- Body: 18px / 28px
- Small: 16px / 22px

**Corner Radii:**
- Small: 6px
- Medium: 12px
- Large: 16px

**Elevation:**
- Card shadow: 0 6px 18px rgba(11,22,40,0.06)

## Interface Components

### Header
- Logo with warm teacup/community icon
- "Espoo Together" branding
- Global search bar
- Orange "Create Event" button
- Notifications with badge
- User avatar menu

### Collapsible Sidebars
**Left Sidebar (280px):**
- Quick filters (Upcoming/Past/Drafts)
- Date range picker with presets
- Multi-select category tags
- Location input (default: Espoo, Finland)
- Nearby toggle with radius slider
- Price filter (All/Free/Paid)
- Format filter (Online/Offline/Hybrid)
- Organizer dropdown
- Reset filters button

**Right Rail (320px):**
- Quick insights (upcoming events, attendees, revenue)
- Mini calendar synced with date picker
- Recent activity feed
- Map view toggle button

### Event Cards
**Grid View (3 columns):**
- 16:9 cover image
- Type badge (color-coded: orange=offline, light purple=online, lavender purple=hybrid)
- Event title (H3)
- Short description (1-2 lines)
- Date/time with calendar icon
- Location with pin icon
- Tags (up to 3)
- Organizer avatar + name
- Attendee count
- Price pill (Free/€X)
- "View" and "Manage" buttons

**List View:**
- Full-width rows
- Larger thumbnails
- Quick actions on right side
- Bulk selection checkbox

### Secondary Views
- **Event Details Drawer:** Full event info, RSVP list, statistics, edit controls
- **Calendar View:** Month grid with event indicators
- **Map View:** Interactive map with clustered pins and synced list
- **Empty State:** Warm illustration with teacup icon and encouraging message

## Sample Events

All events are community-focused and based in Espoo:

1. **Grandma's Cooking Workshop: Traditional Pies** - Free, Leppävaara
2. **Knitting & Crafts for Everyone** - €5, Matinkylä Community Center
3. **Online Poetry Reading: Nostalgia Evening** - Free, Online
4. **Repair Workshop: Simple Home Fixes** - €8, Espoon Keskus
5. **Gardening Club: Winter Preparation** - €3, Hybrid
6. **Tea & Stories: Intergenerational Meetup** - Free, Tapiola Library
7. **Choir Practice: Finnish Folk Songs** - Free, Espoo Cultural Centre
8. **Computer Help: Getting Started with Smartphones** - Free, Leppävaara Library

## Accessibility Features

- WCAG AA contrast compliance
- Keyboard navigation throughout
- Focus indicators on all interactive elements
- Screen reader friendly
- Large tap targets (min 44×44px)
- Clear, simple language
- Patient, helpful microcopy

## Technical Stack

- React + TypeScript
- Tailwind CSS v4
- Shadcn/ui components
- Lucide icons
- Responsive design (1440×900 primary, 1366×768 variant)
- 12-column grid system
- 8px baseline grid

## Design Philosophy

This platform is designed with warmth, respect, and accessibility at its core. Every design decision prioritizes the needs of elderly users while remaining modern and appealing to all ages. The goal is to reduce loneliness, promote community connections, and celebrate the wisdom and skills of senior community members in Espoo.

---

**Built with ❤️ for the Espoo community**
