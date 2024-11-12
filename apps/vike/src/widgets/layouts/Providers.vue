<script lang="ts" setup>
  import { TooltipProvider } from '@/shared/ui/tooltip';
  import { Toaster } from '@/shared/ui/toast';
</script>

<template>
  <TooltipProvider
    :delay-duration="200"
    :skip-delay-duration="100"
    disable-closing-trigger
  >
    <slot />
    <Toaster />
  </TooltipProvider>
</template>
