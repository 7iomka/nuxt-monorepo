<script setup lang="ts">
  import type { WithClassAsProps } from './interface';
  import { cn } from '@/shared/lib/cn';

  const props = defineProps<WithClassAsProps>();
</script>

<template>
  <div
    role="group"
    aria-roledescription="slide"
    :class="cn('min-w-0 shrink-0 grow-0', props.class)"
  >
    <slot />
  </div>
</template>
