export const colors = {
  // Warm whites and neutrals
  white: '#FEFDFB',
  cream: '#F8F7F4',
  lightGray: '#E8E6E1',
  gray: '#C4C2BC',
  
  // Mauritanian green (from flag)
  green: {
    50: '#E8F5EC',
    100: '#C7E6D1',
    200: '#A3D6B4',
    300: '#7FC697',
    400: '#5BB97F',
    500: '#006233',
    600: '#005A2E',
    700: '#004F27',
    800: '#004520',
    900: '#003314',
  },
  
  // Mauritanian gold/yellow (from flag)
  gold: {
    50: '#FFFBF0',
    100: '#FFF4D6',
    200: '#FFECBA',
    300: '#FFE39D',
    400: '#FFDB87',
    500: '#FFC61E',
    600: '#F5B800',
    700: '#D9A500',
    800: '#BD9200',
    900: '#8A6B00',
  },
  
  // Mauritanian red (from flag)
  red: {
    50: '#FDEAEB',
    100: '#F9C9CC',
    200: '#F5A5AA',
    300: '#F18088',
    400: '#EE656F',
    500: '#D01C1F',
    600: '#BC191C',
    700: '#A31618',
    800: '#8A1314',
    900: '#5F0D0E',
  },
  
  // Status colors
  success: '#006233',
  warning: '#FFC61E',
  error: '#D01C1F',
  info: '#006233',
} as const;

export type ColorScheme = typeof colors;

