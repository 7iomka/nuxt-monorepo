<script setup lang="ts">
  import { type HTMLAttributes, computed } from 'vue';
  import {
    DialogClose,
    DialogContent,
    type DialogContentEmits,
    type DialogContentProps,
    DialogOverlay,
    DialogPortal,
    useForwardPropsEmits,
  } from 'radix-vue';
  import { Cross2Icon } from '@radix-icons/vue';
  import { cn } from '@/shared/lib/cn';

  const props = defineProps<
    DialogContentProps & { class?: HTMLAttributes['class'] }
  >();
  const emits = defineEmits<DialogContentEmits>();

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });

  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 grid place-items-center overflow-y-auto
        bg-black/80 data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0 data-[state=open]:animate-in
        data-[state=open]:fade-in-0"
    >
      <DialogContent
        :class="
          cn(
            `relative z-50 my-8 grid w-full max-w-lg gap-4 border border-border
            bg-background py-6 px-4 sm:p-6 shadow-lg outline-none zoom-out-95
            [animation-duration:500ms] data-[state=closed]:animate-out
            data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-full
            sm:rounded-lg`,
            props.class,
          )
        "
        v-bind="forwarded"
        @pointer-down-outside="
          (event) => {
            const originalEvent = event.detail.originalEvent;
            const target = originalEvent.target as HTMLElement;
            if (
              originalEvent.offsetX > target.clientWidth ||
              originalEvent.offsetY > target.clientHeight
            ) {
              event.preventDefault();
            }
          }
        "
      >
        <slot />

        <DialogClose
          class="absolute right-4 top-4 rounded-md p-0.5 transition-colors
            hover:bg-secondary"
        >
          <Cross2Icon class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>
