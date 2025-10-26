export const palette = {
  terracotta: '#E38C7B',
  cream: '#FFF8F4',
  indigo: '#273C54',
  mint: '#BEE2C8',
  slate: '#4D5D70',
  white: '#FFFFFF',
  black: '#000000',
  error: '#D1434B',
  warning: '#F3A712',
  info: '#0F5F8C',
} as const;

export const colors = {
  background: palette.cream,
  card: palette.white,
  primary: palette.terracotta,
  accent: palette.mint,
  textPrimary: palette.indigo,
  textSecondary: palette.slate,
  border: '#E4D8CF',
  error: palette.error,
  success: palette.mint,
} as const;
