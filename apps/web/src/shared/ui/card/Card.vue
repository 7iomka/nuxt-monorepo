<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/shared/lib/cn';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
  }>();
</script>

<template>
  <div
    :class="
      cn('rounded-xl border bg-card text-card-foreground shadow', props.class)
    "
  >
    <slot />
  </div>
</template>
