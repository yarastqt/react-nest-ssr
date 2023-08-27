export const isClient = !import.meta.env.SSR;
export const isServer = import.meta.env.SSR;
export const isProduction = process.env.NODE_ENV === 'production';
