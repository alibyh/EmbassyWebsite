# Embassy Website - Project Overview

## 🎨 Design Philosophy

A modern, diplomatic website with a clean aesthetic that conveys trust, professionalism, and accessibility.

### Color Palette
- **Warm Whites**: #FEFDFB, #F8F7F4 - Creating a welcoming, official atmosphere
- **Muted Navy**: #2A3342, #6B7A98 - Professional and trustworthy
- **Gentle Gold**: #D4AD5C, #ECD9A8 - Subtle elegance and diplomatic prestige

### Typography
- **Primary**: Inter - Modern, clean, highly readable
- **Secondary**: Lora - Elegant serif for headings, adding diplomatic character

## 🏗️ Architecture: Feature-Sliced Design (FSD)

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page composition
│
├── widgets/               # Self-contained UI blocks
│   ├── Header/           # Fixed navigation with scroll effects
│   ├── Hero/             # Animated hero section
│   ├── Announcements/    # Table with TanStack Table
│   ├── ConsularServices/ # Service cards grid
│   ├── EmergencyContacts/# Contact cards with priority
│   ├── About/            # About section with stats
│   └── Footer/           # Site footer with links
│
├── entities/              # Business logic & data
│   └── announcement/     # Announcement types & mock data
│
└── shared/                # Reusable code
    ├── config/           # Design tokens (colors, typography, spacing)
    └── ui/               # Base UI components
        ├── Button/
        ├── Card/
        └── Container/
```

## ✨ Key Features

### 1. Hero Section
- **Wave Animation**: Smooth, infinite wave motion creating calm ambiance
- **Gradient Background**: Subtle color transitions
- **CTA Buttons**: Soft hover effects with elevation
- **Badge Animation**: Pulsing indicator for "Official Embassy Portal"

### 2. Announcements Table (TanStack Table)
- **Sortable Columns**: Click headers to sort by date, category, or priority
- **Visual Indicators**: 
  - Category badges (color-coded)
  - Priority dots with animations (high/medium/low)
  - Formatted dates
- **Hover Effects**: Row highlighting on hover
- **Responsive**: Horizontal scroll on mobile

### 3. Consular Services
- **4 Service Categories**:
  1. Passport Services
  2. Visa & Immigration
  3. Notarial Services
  4. Legal Assistance
- **Interactive Cards**: 
  - Top border animation on hover
  - Icon scale animation
  - Smooth elevation changes
- **Service Lists**: Checkmark icons with details
- **CTA Section**: Dashed border design

### 4. Emergency Contacts
- **3 Contact Types**:
  1. Emergency Hotline (24/7) - Highlighted
  2. Consular Services
  3. Citizen Services
- **Contact Info**: Phone, email, address
- **Availability Badges**: Live status indicators
- **Visual Hierarchy**: Urgent contacts stand out

### 5. About Section
- **Statistics Grid**: 4 key metrics with hover effects
- **Two-Column Layout**: Text + decorative visual
- **Decorative Elements**: Gradient circles in background

### 6. Header & Footer
- **Fixed Header**: 
  - Transparent → solid on scroll
  - Mobile menu with smooth transitions
  - Language selector
- **Comprehensive Footer**:
  - Multiple link sections
  - Social media icons
  - Responsive grid layout

## 🎭 Animation & Interactions

### Subtle Animations
1. **Wave Animation** (Hero): 20s infinite loop
2. **Float Animation** (Hero decorative): 8s ease-in-out
3. **Pulse Animation** (Badges): 2s infinite
4. **Fade In Up** (Hero content): Staggered entrance
5. **Hover Elevations**: translateY(-4px to -8px)
6. **Color Transitions**: 0.3s cubic-bezier

### Interaction States
- **Buttons**: Hover elevation, active state
- **Cards**: Transform + shadow on hover
- **Links**: Color change + translateX
- **Table Rows**: Background fade on hover
- **Icons**: Scale transformations

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1280px container
- **Tablet**: 1024px - Adjusted grid layouts
- **Mobile**: 768px and below - Single column, simplified nav

### Mobile Optimizations
- Collapsible navigation menu
- Stacked card layouts
- Horizontal scroll for tables
- Touch-friendly button sizes
- Optimized typography scale

## 🚀 Performance Features

- **Next.js 14**: App Router for optimal performance
- **CSS Modules**: Scoped styles, no global conflicts
- **Code Splitting**: Automatic by Next.js
- **Optimized Fonts**: Google Fonts with display=swap
- **Minimal Dependencies**: Only TanStack Table added
- **Pure CSS Animations**: No JavaScript animation libraries

## 🎯 Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios meet WCAG standards
- Focus states on all interactive elements
- Screen reader friendly

## 📦 Component Reusability

### Shared Components
1. **Button**: 4 variants, 3 sizes, icon support
2. **Card**: Multiple variants, composable (Header, Content, Footer)
3. **Container**: Size variants (narrow, default, wide, fluid)

### Design Tokens
- Colors: Comprehensive palette with semantic naming
- Typography: Scale-based sizing system
- Spacing: 8px grid system
- Shadows: 5-level elevation system
- Border Radius: Consistent rounding scale

## 🛠️ Development Experience

### TypeScript Benefits
- Full type safety
- IntelliSense support
- Compile-time error catching
- Better refactoring

### FSD Benefits
- Clear separation of concerns
- Easy to locate features
- Scalable structure
- Team-friendly organization

## 📊 Data Management

### Current Implementation
- Mock data in `entities/announcement/model/data.ts`
- 6 sample announcements with varied categories and priorities

### Future Enhancement Points
- Connect to CMS or API
- Add real-time updates
- Implement filtering and search
- Pagination for large datasets

## 🎨 Customization Guide

### Quick Customizations
1. **Colors**: Edit `shared/config/colors.ts`
2. **Fonts**: Update `shared/config/typography.ts`
3. **Spacing**: Modify `shared/config/spacing.ts`
4. **Content**: Update widget component files
5. **Data**: Edit `entities/announcement/model/data.ts`

### Adding New Sections
1. Create new widget folder
2. Add component with styles
3. Export from index.ts
4. Import and use in `app/page.tsx`

## 📝 Best Practices Implemented

✅ Component-based architecture
✅ TypeScript for type safety
✅ CSS Modules for scoped styling
✅ Semantic HTML
✅ Accessible design
✅ Responsive layout
✅ Performance optimized
✅ Clean code structure
✅ Reusable components
✅ Consistent design system

## 🎉 Result

A beautiful, modern embassy website that:
- Looks professional and trustworthy
- Provides excellent user experience
- Is easy to maintain and extend
- Performs well across all devices
- Follows industry best practices
- Uses cutting-edge technologies

Perfect for any diplomatic or government organization seeking a modern web presence!

