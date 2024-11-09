<script setup lang="ts">
  import Providers from '@/widgets/layouts/Providers.vue';
  import HeadDefault from '@/widgets/layouts/HeadDefault.vue';
</script>

<template>
  <div>
    <HeadDefault />
    <Providers>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Providers>
  </div>
</template>
