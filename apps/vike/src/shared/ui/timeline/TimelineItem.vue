<script lang="ts" setup>
  import { cn } from '@/shared/lib/cn';
  import type { HTMLAttributes, VNode } from 'vue';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
    icon?: string;
  }>();

  const slots = defineSlots<{
    icon: () => VNode[];
    default(): VNode[];
  }>();
</script>

<template>
  <div :class="cn('timeline-item', props.class)">
    <div class="timeline-item__icon">
      <slot name="icon">{{ props.icon }}</slot>
    </div>
    <div class="timeline-item__line"></div>
    <div class="timeline-item__content"><slot /></div>
  </div>
</template>
