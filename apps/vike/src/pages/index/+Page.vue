<script setup lang="ts">
  import { Button } from '@/shared/ui/button';
  import { CustomLink } from '@/shared/ui/custom-link';
</script>

<template>
  <div class="flex gap-4">
    <h3 class="text-xl">Hello, Test our api</h3>
    <Button :as="CustomLink" href="/users">Explore Users</Button>
  </div>
</template>
