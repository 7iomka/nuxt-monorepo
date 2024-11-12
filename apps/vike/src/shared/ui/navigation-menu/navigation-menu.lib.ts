import { createContext } from 'radix-vue';
import type { NavigationMenuCustomContext } from './navigation-menu.types';

export const [
  injectNavigationMenuCustomContext,
  provideNavigationMenuCustomContext,
] = createContext<NavigationMenuCustomContext>(
  ['NavigationMenu', 'NavigationMenuSub'],
  'NavigationMenuCustomContext',
);
