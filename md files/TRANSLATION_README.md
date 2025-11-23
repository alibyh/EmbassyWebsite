# Translation System - Complete Guide

## ✅ Completed Integration

### Core System
- ✅ Translation files created (EN, RU, AR)
- ✅ I18n context and provider
- ✅ Language switcher component  
- ✅ RTL support for Arabic
- ✅ LocalStorage persistence

### Integrated Components
- ✅ **Layout**: I18nProvider wrapper
- ✅ **Header**: Navigation + language switcher
- ✅ **Hero**: All content translated

### Remaining Components to Update

Follow this pattern for each component:

#### 1. Import the hook
```typescript
import { useI18n } from '@/shared/lib/i18n';
```

#### 2. Get translations
```typescript
const { t } = useI18n();
```

#### 3. Replace hardcoded text
```typescript
// Before
<h2>Our Services</h2>

// After
<h2>{t.services.title}</h2>
```

## Component Update Checklist

### Priority 1 - Content Heavy
- [ ] **Announcements** (`widgets/Announcements/Announcements.tsx`)
  - Replace table headers
  - Use `t.announcements.*`
  - Map announcements list from `t.announcementsList`

- [ ] **Consular Services** (`widgets/ConsularServices/ConsularServices.tsx`)
  - Section title/description
  - Service cards (passport, visa, notary, legal)
  - CTA section
  - Use `t.services.*`

- [ ] **Emergency Contacts** (`widgets/EmergencyContacts/EmergencyContacts.tsx`)
  - Section title
  - Contact card titles
  - Labels (phone, email, address)
  - Use `t.emergency.*`

- [ ] **About** (`widgets/About/About.tsx`)
  - Title and descriptions  
  - Stats labels
  - Use `t.about.*`

- [ ] **Footer** (`widgets/Footer/Footer.tsx`)
  - Description
  - All link sections
  - Copyright
  - Use `t.footer.*`

### Quick Reference - Translation Keys

```typescript
// Common
t.common.contactUs
t.common.learnMore
t.common.readMore
t.common.viewAll

// Header
t.header.home
t.header.services
t.header.announcements
t.header.emergency
t.header.about

// Hero
t.hero.badge
t.hero.title
t.hero.subtitle
t.hero.consularServices
t.hero.emergencyContact

// Services
t.services.badge
t.services.title
t.services.description
t.services.passport.*
t.services.visa.*
t.services.notary.*
t.services.legal.*
t.services.cta.*

// Announcements
t.announcements.badge
t.announcements.title
t.announcements.description
t.announcements.date
t.announcements.category
t.announcements.priority
t.announcementsList[index].title
t.announcementsList[index].excerpt

// Emergency
t.emergency.badge
t.emergency.title
t.emergency.description
t.emergency.hotline.*
t.emergency.consular.*
t.emergency.visa.*
t.emergency.labels.*

// About
t.about.badge
t.about.title
t.about.description1
t.about.description2
t.about.stats.*

// Footer
t.footer.description
t.footer.services.*
t.footer.information.*
t.footer.resources.*
t.footer.legal.*
t.footer.copyright
```

## RTL Support

### Automatic
- Direction set via context: `document.documentElement.dir = 'rtl'`
- Language set: `document.documentElement.lang = 'ar'`

### CSS Adjustments
Global RTL support added to `globals.css`:
```css
[dir="rtl"] {
  direction: rtl;
}
```

### Component-Specific RTL
Add to module CSS where needed:
```css
[dir="rtl"] .myClass {
  /* RTL-specific styles */
  margin-right: auto;
  margin-left: 0;
}
```

## Testing

### Switch Languages
1. Click globe icon in header
2. Select language from dropdown
3. Page updates immediately
4. Selection saved to localStorage

### Test Each Language
- **English (EN)**: Default, LTR
- **Russian (RU)**: Cyrillic, LTR
- **Arabic (AR)**: RTL, right-aligned

## Next Steps

1. Update remaining 5 components (20-30 min total)
2. Test all pages in 3 languages
3. Verify RTL layout for Arabic
4. Add more content translations as needed

## Adding New Translations

### 1. Add to English file first
```typescript
// shared/lib/i18n/translations/en.ts
export const en = {
  // ... existing
  newSection: {
    title: 'New Section',
    description: 'Description here',
  },
};
```

### 2. Add same structure to RU and AR
```typescript
// ru.ts
newSection: {
  title: 'Новый раздел',
  description: 'Описание здесь',
},

// ar.ts
newSection: {
  title: 'قسم جديد',
  description: 'الوصف هنا',
},
```

### 3. Use in components
```typescript
const { t } = useI18n();
<h2>{t.newSection.title}</h2>
```

## Benefits

✅ **3 Languages**: English, Russian, Arabic
✅ **RTL Support**: Automatic for Arabic
✅ **Type-Safe**: Full TypeScript support
✅ **Persistent**: Saves user preference
✅ **No Reload**: Instant language switching
✅ **Professional**: Proper diplomatic translations
✅ **Maintainable**: Centralized translation files

---

**Status**: Core system complete. Components need individual updates following the pattern above.

