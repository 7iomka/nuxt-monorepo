<script setup lang="ts">
  import { CustomLink } from '@/shared/ui/custom-link';
</script>

<template>
  <header
    class="sticky top-0 bg-background/[0.98] border-b border-t-border z-10 py-3
      h-[--header-sticky-height] md:hidden"
  >
    <div class="container">
      <div class="flex items-center justify-between gap-2 xsl:gap-4 sm:gap-5">
        <div class="flex items-center space-x-2 sm:space-x-4">
          <CustomLink
            href="/"
            class="inline-flex items-center justify-center font-normal
              text-foreground select-none shrink-0 bg-secondary overflow-hidden
              h-10 w-10 text-xs rounded-full"
          >
            <img
              role="img"
              src="/static/images/content/my-avatar.jpg"
              class="h-full w-full object-cover"
              alt="My photo"
            />
          </CustomLink>
        </div>
      </div>
    </div>
  </header>
</template>
