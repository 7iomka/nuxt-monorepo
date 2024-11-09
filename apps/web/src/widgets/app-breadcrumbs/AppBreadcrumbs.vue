<script setup lang="ts">
  import { routes } from '@/shared/routing/routes';
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
  } from '@/shared/ui/breadcrumb';
  import { CustomLink } from '@/shared/ui/custom-link';

  interface AppBreadcrumbLink {
    text: string;
    url: string;
    icon?: string;
  }
  interface AppBreadcrumbPage {
    text: string;
    icon?: string;
  }

  export type AppBreadcrumbItem = AppBreadcrumbLink | AppBreadcrumbPage;

  const props = withDefaults(
    defineProps<{
      items: AppBreadcrumbItem[];
      withHomePage?: boolean;
      homeIconOnly?: boolean;
    }>(),
    {
      withHomePage: true,
    },
  );

  const homePageItem = computed(() => {
    return {
      icon: 'icon-[uil--home-alt]',
      text: props.homeIconOnly ? '' : 'Home',
      url: routes.home,
    } satisfies AppBreadcrumbLink;
  });

  const itemsToShow = computed(() => {
    if (props.withHomePage) {
      return [homePageItem.value, ...props.items];
    }
    return props.items;
  });
</script>

<template>
  <section data-id="breadcrumbs">
    <div class="container">
      <Breadcrumb>
        <BreadcrumbList>
          <template v-for="(item, idx) in itemsToShow" :key="item.text">
            <BreadcrumbItem>
              <BreadcrumbLink
                v-if="'url' in item"
                class="inline-flex items-center gap-1"
                :as="CustomLink"
                :href="item.url"
              >
                <span v-if="item.icon" :class="item.icon"></span>
                <span v-if="item.text !== ''">
                  {{ item.text }}
                </span>
              </BreadcrumbLink>
              <BreadcrumbPage v-else class="inline-flex items-center gap-1">
                <span v-if="item.icon" :class="item.icon"></span>
                <span v-if="item.text !== ''">
                  {{ item.text }}
                </span>
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator v-if="idx < itemsToShow.length - 1">
              <span class="icon-[uil--angle-right-b]"></span>
            </BreadcrumbSeparator>
          </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </section>
</template>
