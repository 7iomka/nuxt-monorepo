<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';

  export interface CustomLinkProps {
    class?: HTMLAttributes['class'];
    href: string;
    rel?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
  }
  const props = defineProps<CustomLinkProps>();

  const isExternal = computed(
    () => typeof props.href === 'string' && props.href.charAt(0) !== '/',
  );

  const target = computed(() =>
    isExternal.value ? props.target || '_blank' : props.target,
  );
  const rel = computed(() =>
    isExternal.value ? props.rel || 'nofollow noopener noreferrer' : undefined,
  );
</script>

<template>
  <NuxtLink :class="props.class" :href="props.href" :target :rel>
    <slot />
  </NuxtLink>
</template>
