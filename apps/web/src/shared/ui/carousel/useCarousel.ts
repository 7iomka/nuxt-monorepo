import { createInjectionState } from '@vueuse/core';
import emblaCarouselVue from 'embla-carousel-vue';
import { onMounted, ref } from 'vue';
import type {
  UnwrapRefCarouselApi as CarouselApi,
  CarouselEmits,
  CarouselProps,
} from './interface';

const [useProvideCarousel, useInjectCarousel] = createInjectionState(
  (props: CarouselProps, emits: CarouselEmits) => {
    const opts = computed(() => props.opts);
    const plugins = computed(() => props.plugins);

    const [emblaNode, emblaApi] = emblaCarouselVue(
      {
        ...opts.value,
        axis: props.orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins.value,
    );

    function scrollPrev() {
      emblaApi.value?.scrollPrev();
    }
    function scrollNext() {
      emblaApi.value?.scrollNext();
    }

    const canScrollNext = ref(false);
    const canScrollPrev = ref(false);

    function onSelect(api: CarouselApi) {
      canScrollNext.value = api?.canScrollNext() || false;
      canScrollPrev.value = api?.canScrollPrev() || false;
    }

    onMounted(() => {
      if (!emblaApi.value) return;

      emblaApi.value?.on('init', onSelect);
      emblaApi.value?.on('reInit', onSelect);
      emblaApi.value?.on('select', onSelect);

      emits('init-api', emblaApi.value);
    });
    /**
    Feature: watch orientation change
    */
    watch(
      () => props.orientation,
      (changedOrientation) => {
        if (!emblaApi.value) return;
        emblaApi.value?.reInit(
          {
            ...opts.value,
            axis: changedOrientation === 'horizontal' ? 'x' : 'y',
          },
          unref(plugins.value),
        );
      },
    );

    return {
      props,
      carouselRef: emblaNode,
      carouselApi: emblaApi,
      canScrollPrev,
      canScrollNext,
      scrollPrev,
      scrollNext,
    };
  },
);

function useCarousel() {
  const carouselState = useInjectCarousel();

  if (!carouselState)
    throw new Error('useCarousel must be used within a <Carousel />');

  return carouselState;
}

export { useCarousel, useProvideCarousel };
