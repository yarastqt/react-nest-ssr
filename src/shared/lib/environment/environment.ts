export const isClient = typeof window !== 'undefined';
export const isServer = typeof window === 'undefined';
export const isProduction = process.env.NODE_ENV === 'production';
