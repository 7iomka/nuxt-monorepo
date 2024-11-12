<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import {
    TooltipContent,
    type TooltipContentEmits,
    type TooltipContentProps,
    TooltipPortal,
    useForwardPropsEmits,
  } from 'radix-vue';
  import { cn } from '@/shared/lib/cn';

  defineOptions({
    inheritAttrs: false,
  });

  const attrs = useAttrs(); // Note: it's not reactive

  const computedClass = computed(() => {
    return cn(
      `z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs
      text-primary-foreground animate-in fade-in-0 zoom-in-95
      data-[state=closed]:animate-out data-[state=closed]:fade-out-0
      data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2
      data-[side=left]:slide-in-from-right-2
      data-[side=right]:slide-in-from-left-2
      data-[side=top]:slide-in-from-bottom-2`,
      attrs.class || '',
    );
  });

  const props = defineProps<TooltipContentProps>();

  const emits = defineEmits<TooltipContentEmits>();

  const forwarded = useForwardPropsEmits(() => props, emits);
</script>

<template>
  <TooltipPortal>
    <TooltipContent v-bind="{ ...forwarded, ...$attrs }" :class="computedClass">
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
