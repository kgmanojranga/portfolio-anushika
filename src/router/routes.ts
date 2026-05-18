export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  EXPERIENCE: '/experience',
  CONTACT: '/contact',
  RESUME: '/resume',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
