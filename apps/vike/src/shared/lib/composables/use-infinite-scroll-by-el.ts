import { useElementVisibility, type MaybeElement } from '@vueuse/core';
import type { Awaitable } from '@vueuse/shared';
import { ref, computed, watch, nextTick, type ShallowRef } from 'vue';

export interface UseInfiniteScrollByElOptions {
  interval?: number;
  canLoadMore?: () => boolean;
  stopOnError?: boolean;
  minLoadingTime?: number;
  threshold?: number | number[];
}

/**
 * Reactive infinite scroll by observing the visibility of the last element.
 */
export function useInfiniteScrollByEl(
  targetElement: ShallowRef<MaybeElement>,
  onLoadMore: () => Awaitable<void>,
  options: UseInfiniteScrollByElOptions = {},
) {
  const {
    interval = 100,
    canLoadMore = () => true,
    stopOnError = true,
    minLoadingTime = 0,
    threshold = 1,
  } = options;

  const promise = ref<any>();
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  const stopped = ref(false);
  let loadingTimeout: ReturnType<typeof setTimeout> | null = null;

  const isElementVisible = useElementVisibility(targetElement, {
    threshold,
  });

  async function checkAndLoad() {
    // Check if loading should be stopped or element is not visible
    if (
      stopped.value ||
      !targetElement.value ||
      !isElementVisible.value ||
      !canLoadMore()
    )
      return;

    if (!promise.value) {
      const startTime = Date.now();

      // Set loading state to true
      isLoading.value = true;

      // Start timer for minLoadingTime
      const minLoadingTimer = new Promise((resolve) => {
        loadingTimeout = setTimeout(() => {
          resolve(true);
        }, minLoadingTime);
      });

      // Wait for the minLoadingTimer and only after that trigger onLoadMore
      promise.value = Promise.all([
        minLoadingTimer,
        new Promise((resolve) => setTimeout(resolve, interval)), // Small interval between loads
      ]);

      try {
        // Await the Promise.all and then await onLoadMore
        await promise.value;

        // Await onLoadMore to ensure data is fully loaded
        await onLoadMore();

        const elapsedTime = Date.now() - startTime;

        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
        }

        const remainingTime = Math.max(minLoadingTime - elapsedTime, 0);

        // Ensure minimum loading time is respected before stopping loading state
        setTimeout(() => {
          promise.value = null;
          isLoading.value = false;
          nextTick(() => checkAndLoad());
        }, remainingTime);
      } catch (err) {
        error.value = err as Error;
        if (stopOnError) {
          stopped.value = true;
        }
      }
    }
  }

  function retry() {
    stopped.value = false;
    nextTick(() => checkAndLoad());
  }

  watch(
    isElementVisible,
    (visible) => {
      if (visible) checkAndLoad();
    },
    { immediate: true },
  );

  return {
    isLoading,
    error,
    retry,
    stopped,
  };
}
