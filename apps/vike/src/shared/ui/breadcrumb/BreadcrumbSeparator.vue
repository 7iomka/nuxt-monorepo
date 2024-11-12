<script lang="ts" setup>
  import type { HTMLAttributes } from 'vue';
  import { ChevronRightIcon } from '@radix-icons/vue';
  import { cn } from '@/shared/lib/cn';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
  }>();
</script>

<template>
  <li
    role="presentation"
    aria-hidden="true"
    :class="
      cn(
        'flex items-center justify-center text-sm [&>svg]:size-[1em]',
        props.class,
      )
    "
  >
    <slot>
      <ChevronRightIcon />
    </slot>
  </li>
</template>
