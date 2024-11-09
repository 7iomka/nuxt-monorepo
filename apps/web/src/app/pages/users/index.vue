<script lang="ts" setup>
  import { NuxtLink } from '#components';
  import { useApi } from '@/shared/lib/composables/use-api';
  import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from '@/shared/ui/table';
  import { Button } from '@/shared/ui/button';

  const { $api } = useNuxtApp();

  // import { type User } from '@/shared/types/user';
  // TODO: Replace with real type from shared packages (like `schemas`, or via generated client)
  interface User {
    id: number;
    email: string;
    name: string;
  }

  const { data } = await useApi<{
    items: User[];
    total: number;
    limit: number;
    offset: number;
  }>('/users/list');
</script>

<template>
  <div>
    <h1 class="text-xl mb-6">Users</h1>
    <Table v-if="data">
      <TableHeader>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="user in data.items" :key="user.id">
          <TableCell>{{ user.id }}</TableCell>
          <TableCell>{{ user.email }}</TableCell>
          <TableCell>{{ user.name }}</TableCell>
          <TableCell>
            <Button :as="NuxtLink" :href="`/users/${user.id}`">View</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
