<script lang="ts" setup>
  import { AppHeader } from '../app-header';
  import Providers from '@/widgets/layouts/Providers.vue';
</script>

<template>
  <Providers>
    <div
      data-id="layout-root"
      class="flex min-h-[calc(100vh*1.125)] xs:min-h-screen flex-col
        max-w-[1280px] mx-auto"
    >
      <AppHeader />
      <div data-id="wrapper" class="flex-1 px-[--wrapper-px] py-[--wrapper-py]">
        <main class="relative w-full min-w-0 bg-muted/25 p-5 min-h-full">
          <slot />
        </main>
      </div>
    </div>
  </Providers>
</template>

<style>
  @import '@/shared/styles/common.css';
</style>
