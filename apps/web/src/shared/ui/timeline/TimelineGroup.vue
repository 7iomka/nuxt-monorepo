<script lang="ts" setup>
  import { cn } from '@/shared/lib/cn';
  import type { HTMLAttributes, VNode } from 'vue';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
    label: string;
  }>();

  defineSlots<{
    default(): VNode[];
    label(): VNode[];
  }>();
</script>

<template>
  <div :class="cn('timeline-group', props.class)">
    <div class="timeline-group__label">
      <slot name="label">{{ props.label }}</slot>
    </div>
    <div class="timeline-group__line"></div>
    <div class="timeline-group__content">
      <slot />
    </div>
  </div>
</template>
