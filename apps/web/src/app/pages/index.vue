<script setup lang="ts">
  import { NuxtLink } from '#components';
  import { Button } from '@/shared/ui/button';
</script>

<template>
  <div class="flex gap-4">
    <h3 class="text-xl">Hello, Test our api</h3>
    <Button :as="NuxtLink" :href="`/users`">Explore Users</Button>
  </div>
</template>
