<script setup lang="ts">
  import { type HTMLAttributes, computed } from 'vue';
  import {
    ScrollAreaScrollbar,
    type ScrollAreaScrollbarProps,
    ScrollAreaThumb,
  } from 'radix-vue';
  import { cn } from '@/shared/lib/cn';

  const props = withDefaults(
    defineProps<
      ScrollAreaScrollbarProps & { class?: HTMLAttributes['class'] }
    >(),
    {
      orientation: 'vertical',
    },
  );

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="delegatedProps"
    :class="
      cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' &&
          'h-full w-2 border-x border-x-transparent p-px',
        orientation === 'horizontal' &&
          'h-2 flex-col border-y border-y-transparent p-px',
        props.class,
      )
    "
  >
    <ScrollAreaThumb class="relative flex-1 rounded-full bg-border" />
  </ScrollAreaScrollbar>
</template>
