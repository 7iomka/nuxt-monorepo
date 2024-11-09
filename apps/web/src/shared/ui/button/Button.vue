<script setup lang="ts">
  import { Primitive, type PrimitiveProps } from 'radix-vue';
  import { type ButtonVariants, buttonVariants } from './button.lib';
  import { cn } from '@/shared/lib/cn';

  interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant'];
    size?: ButtonVariants['size'];
  }

  const { as = 'button', asChild, variant, size } = defineProps<Props>();
  const attrs = useAttrs();
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), attrs.class || '')"
  >
    <slot />
  </Primitive>
</template>
