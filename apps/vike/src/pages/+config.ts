import vikeVue from 'vike-vue/config';
import type { Config } from 'vike/types';
import Head from '@/widgets/layouts/HeadDefault.vue';
import Layout from '@/widgets/layouts/LayoutDefault.vue';
import { appConfig } from '@/shared/config/app-config';

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,
  title: appConfig.brandName,
  extends: vikeVue,
  bodyAttributes: { 'data-theme': 'dark' },
} satisfies Config;
