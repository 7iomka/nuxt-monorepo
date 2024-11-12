<script lang="ts" setup>
  import { Button } from '@/shared/ui/button';
  import { CustomLink } from '@/shared/ui/custom-link';
  import { useData } from 'vike-vue/useData';
  import { type Data } from './+data';

  const { user } = useData<Data>();
</script>

<template>
  <div>
    <h1 class="text-xl">User Details</h1>
    <Button class="mt-3" :as="CustomLink" :href="`/users`">Back</Button>
    <div class="mt-6">
      <!-- <div v-if="status === 'pending'">
        <p>Loading...</p>
      </div> -->
      <div v-if="user" class="flex flex-col gap-2">
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
