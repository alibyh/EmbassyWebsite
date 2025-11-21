# Embassy Website

A modern, diplomatic-themed embassy website built with Next.js, TypeScript, and Feature-Sliced Design architecture.

## Features

- 🎨 **Modern Diplomatic Design**: Clean aesthetic with soft neutral palette (warm whites, muted navy, gentle gold accents)
- 🌊 **Smooth Animations**: Hero section with calm wave animation and gradient transitions
- 📋 **Announcements Table**: Powered by TanStack Table with sorting and filtering
- 🏛️ **Consular Services**: Comprehensive service cards with hover effects
- 🚨 **Emergency Contacts**: 24/7 support information with priority indicators
- 📱 **Responsive**: Fully responsive design for all screen sizes
- ⚡ **Performance**: Built with Next.js for optimal performance
- 🎯 **TypeScript**: Fully typed for better development experience

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Architecture**: Feature-Sliced Design (FSD)
- **UI Components**: Custom React components
- **Data Tables**: TanStack Table
- **Animations**: CSS animations and transitions
- **Styling**: CSS Modules

## Project Structure

```
EmbassyWebsite/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── widgets/               # Large UI blocks (FSD)
│   ├── Header/           # Navigation header
│   ├── Hero/             # Hero section with animations
│   ├── Announcements/    # Announcements table
│   ├── ConsularServices/ # Services section
│   ├── EmergencyContacts/# Emergency contacts
│   └── Footer/           # Site footer
├── entities/              # Business entities (FSD)
│   └── announcement/     # Announcement data models
├── shared/                # Shared code (FSD)
│   ├── config/           # Design tokens
│   └── ui/               # Reusable UI components
│       ├── Button/
│       ├── Card/
│       └── Container/
├── package.json
├── tsconfig.json
└── next.config.js
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Design System

### Color Palette

- **Warm Whites**: `#FEFDFB`, `#F8F7F4`
- **Muted Navy**: `#2A3342` (primary), `#6B7A98` (light)
- **Gentle Gold**: `#D4AD5C` (primary), `#ECD9A8` (light)

### Typography

- **Primary Font**: Inter (sans-serif)
- **Secondary Font**: Lora (serif) - for headings

### Spacing

Based on a consistent 8px grid system for harmonious layouts.

## Key Components

### Hero Section
- Animated wave background
- Gradient transitions
- Call-to-action buttons
- Responsive layout

### Announcements Table
- Sortable columns
- Category badges
- Priority indicators
- Date formatting
- Responsive design

### Consular Services
- Service cards with icons
- Hover animations
- Service details
- CTA section

### Emergency Contacts
- 24/7 availability indicator
- Contact information cards
- Phone, email, and address details
- Urgent contact highlighting

## Customization

### Colors

Edit `shared/config/colors.ts` to customize the color scheme.

### Typography

Modify `shared/config/typography.ts` for font and typography settings.

### Content

- Update announcements in `entities/announcement/model/data.ts`
- Modify service information in `widgets/ConsularServices/ConsularServices.tsx`
- Edit contact details in `widgets/EmergencyContacts/EmergencyContacts.tsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for demonstration purposes.

## Contributing

This is a showcase project. Feel free to use it as inspiration for your own projects.
