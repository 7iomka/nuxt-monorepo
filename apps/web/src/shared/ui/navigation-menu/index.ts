import { cva } from 'class-variance-authority';

export { default as NavigationMenu } from './NavigationMenu.vue';
export { default as NavigationMenuList } from './NavigationMenuList.vue';
export { default as NavigationMenuItem } from './NavigationMenuItem.vue';
export { default as NavigationMenuTrigger } from './NavigationMenuTrigger.vue';
export { default as NavigationMenuContent } from './NavigationMenuContent.vue';
export { default as NavigationMenuLink } from './NavigationMenuLink.vue';

export const navigationMenuTriggerStyle = cva(
  `group inline-flex w-max text-sm items-center justify-center border
  border-border rounded-md bg-background px-4 py-2 transition-colors
  hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent
  focus:text-accent-foreground focus:outline-none disabled:pointer-events-none
  disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50
  is-active:bg-accent is-active:text-accent-foreground`,
);
