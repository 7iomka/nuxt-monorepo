<script setup lang="ts">
  import { computed, type HTMLAttributes } from 'vue';
  import { cn } from '@/shared/lib/cn';

  const props = defineProps<{
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    class?: HTMLAttributes['class'];
  }>();

  const headingTag = computed(() => `h${props.level ?? 3}`);
</script>

<template>
  <component
    :is="headingTag"
    :class="cn('font-semibold leading-none tracking-tight', props.class)"
  >
    <slot />
  </component>
</template>
