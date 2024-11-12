<script lang="ts" setup>
  import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from '@/shared/ui/table';
  import { Button } from '@/shared/ui/button';

  import { useData } from 'vike-vue/useData';
  import type { Data } from './+data';
  import { CustomLink } from '@/shared/ui/custom-link';

  const { data } = useData<Data>();
</script>

<template>
  <div>
    <h1 class="text-xl mb-6">Users</h1>
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <!-- <template v-if="status === 'pending'">
          <TableRow>
            <TableCell colspan="4">Loading...</TableCell>
          </TableRow>
        </template> -->
        <template v-if="data?.items">
          <TableRow v-for="user in data.items" :key="user.id">
            <TableCell>{{ user.id }}</TableCell>
            <TableCell>{{ user.email }}</TableCell>
            <TableCell>{{ user.name }}</TableCell>
            <TableCell>
              <Button :as="CustomLink" :href="`/users/${user.id}`">View</Button>
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell colspan="4">No users found</TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
