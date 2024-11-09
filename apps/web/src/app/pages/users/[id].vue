<script lang="ts" setup>
  import { NuxtLink } from '#components';
  import { useApi } from '@/shared/lib/composables/use-api';
  import { Button } from '@/shared/ui/button';

  // import { type User } from '@/shared/types/user';
  // TODO: Replace with real type from shared packages (like `schemas`, or via generated client)
  interface User {
    id: number;
    email: string;
    name: string;
  }
  const route = useRoute();

  const { data: user } = await useApi<User>(`/users/${route.params.id}`);
</script>

<template>
  <div>
    <h1 class="text-xl">User Details</h1>
    <Button class="mt-3" :as="NuxtLink" :href="`/users`">Back</Button>
    <div class="mt-6">
      <div v-if="user" class="flex flex-col gap-2">
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Name:</strong> {{ user.name }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>
