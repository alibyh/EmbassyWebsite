export const spacing = {
  px: '1px',
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

export const borderRadius = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(42, 51, 66, 0.05)',
  md: '0 4px 6px -1px rgba(42, 51, 66, 0.08), 0 2px 4px -1px rgba(42, 51, 66, 0.04)',
  lg: '0 10px 15px -3px rgba(42, 51, 66, 0.08), 0 4px 6px -2px rgba(42, 51, 66, 0.04)',
  xl: '0 20px 25px -5px rgba(42, 51, 66, 0.08), 0 10px 10px -5px rgba(42, 51, 66, 0.03)',
  '2xl': '0 25px 50px -12px rgba(42, 51, 66, 0.15)',
} as const;

export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;

