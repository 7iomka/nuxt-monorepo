<script lang="ts" setup>
  import { cn } from '@/shared/lib/cn';
  import type { HTMLAttributes } from 'vue';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
  }>();
</script>

<template>
  <div :class="cn('timeline', props.class)">
    <slot />
  </div>
</template>

<style>
  @import './timeline.css';
</style>
