<script setup lang="ts">
  import { useCarousel } from './useCarousel';
  import type { WithClassAsProps } from './interface';
  import { cn } from '@/shared/lib/cn';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps<WithClassAsProps>();

  const { carouselRef, props: carouselProps } = useCarousel();
</script>

<template>
  <div ref="carouselRef" class="overflow-hidden">
    <div
      :class="
        cn(
          'grid',
          carouselProps.orientation === 'horizontal'
            ? 'grid-flow-col auto-cols-[100%]'
            : 'grid-flow-row',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
