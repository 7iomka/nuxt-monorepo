<script lang="ts" setup>
  import { NuxtLink } from '#components';
  import { Button } from '@/shared/ui/button';

  const route = useRoute();

  const { $apiClient } = useNuxtApp();

  const { data: user, status } = useAsyncData(() =>
    $apiClient.users.getUserById(Number(route.params.id)),
  );
</script>

<template>
  <div>
    <h1 class="text-xl">User Details</h1>
    <Button class="mt-3" :as="NuxtLink" :href="`/users`">Back</Button>
    <div class="mt-6">
      <div v-if="status === 'pending'">
        <p>Loading...</p>
      </div>
      <div v-else-if="user" class="flex flex-col gap-2">
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Name:</strong> {{ user.name }}</p>
      </div>
      <div v-else>
        <p class="text-sm text-muted-foreground">User not found.</p>
      </div>
    </div>
  </div>
</template>
