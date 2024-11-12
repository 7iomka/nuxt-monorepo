<script setup lang="ts">
  import { onMounted, onUnmounted, onUpdated, shallowRef } from 'vue';
  import { Fancybox, type FancyboxOptionsType } from './fancybox.lib';

  const props = defineProps<{
    delegate?: string;
    options?: Partial<FancyboxOptionsType>;
  }>();

  const { delegate = '[data-fancybox]', options = {} } = props;

  const container = shallowRef(null);

  onMounted(() => {
    Fancybox.bind(container.value, delegate, options);
  });

  onUpdated(() => {
    Fancybox.unbind(container.value);
    Fancybox.close();

    Fancybox.bind(container.value, delegate, options);
  });

  onUnmounted(() => Fancybox.destroy());
</script>

<template>
  <div ref="container">
    <slot></slot>
  </div>
</template>

<style>
  @import '@fancyapps/ui/dist/fancybox/fancybox.css';

  :root {
    --fancybox-hover-color: #fff;
    --fancybox-bg: rgba(0, 0, 0, 0.96);
    --fancybox-slide-gap: 10px;
    --f-spinner-width: 50px;
    --f-spinner-height: 50px;
    --f-spinner-color-1: rgba(255, 255, 255, 0.1);
    --f-spinner-color-2: #bbb;
  }

  .fancybox__thumbs {
    --f-thumb-width: 60px;
    --f-thumb-height: 60px;
    --f-thumb-border-radius: var(--radius-md, 0.25rem);
    --f-thumb-outline: 2px;
    --f-thumb-outline-color: var(--primary);
  }

  .fancybox__infobar {
    font-size: 1rem;
  }
</style>
