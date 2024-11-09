import { useEventListener } from '@vueuse/core';
import { onMounted } from 'vue';

const FALLBACK_SCROLL_OFFSET = 64 + 4; // sticky header height + space

export function customSrollTo({
  el,
  hash,
  smooth,
  anchorLinkClassName = 'header-anchor',
  scrollOffset = FALLBACK_SCROLL_OFFSET,
}: {
  el: Element;
  hash: string;
  smooth?: boolean;
  anchorLinkClassName?: string;
  scrollOffset?: number;
}) {
  const target = el.classList.contains(anchorLinkClassName)
    ? el
    : document.getElementById(decodeURIComponent(hash).slice(1));

  if (target) {
    const targetTop =
      window.scrollY +
      target.getBoundingClientRect().top -
      scrollOffset +
      parseInt(window.getComputedStyle(target).paddingTop, 10);

    const scrollToTarget = () => {
      if (!smooth || Math.abs(targetTop - window.scrollY) > window.innerHeight)
        window.scrollTo(0, targetTop);
      else window.scrollTo({ left: 0, top: targetTop, behavior: 'smooth' });
    };

    const checkScroll = () => {
      const currentY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      // Check whether you have reached the target position or reached the end of the page
      if (Math.abs(currentY - targetTop) < 1 || currentY >= maxScroll) {
        window.location.assign(hash);
      } else {
        requestAnimationFrame(checkScroll);
      }
    };

    requestAnimationFrame(scrollToTarget);
    requestAnimationFrame(checkScroll);
  }
}

export const useCustomScrollTo = ({
  parentSelector,
  anchorLinkClassName = 'header-anchor',
  scrollOffset = FALLBACK_SCROLL_OFFSET,
}: {
  parentSelector: string;
  anchorLinkClassName?: string;
  scrollOffset?: number;
}) => {
  onMounted(() => {
    if (typeof window === 'undefined') return;
    const { hash } = new URL(window.location.href);

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash).slice(1));
      if (target) {
        customSrollTo({
          el: target,
          hash,
          anchorLinkClassName,
          scrollOffset,
        });
      }
    }

    useEventListener(document, 'click', (e) => {
      if (
        e.defaultPrevented ||
        !(e.target instanceof Element) ||
        e.button !== 0 ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.metaKey
      )
        return;

      const link = e.target.closest<HTMLAnchorElement | SVGAElement>('a');

      if (
        !link ||
        link.hasAttribute('download') ||
        link.hasAttribute('target') ||
        !link.closest(parentSelector)
      )
        return;

      const linkHref =
        link.getAttribute('href') ??
        (link instanceof SVGAElement ? link.getAttribute('xlink:href') : null);
      if (linkHref == null) return;

      const { origin, pathname, hash, search } = new URL(
        linkHref,
        link.baseURI,
      );
      const currentUrl = new URL(location.href);

      if (origin === currentUrl.origin) {
        e.preventDefault();

        if (pathname === currentUrl.pathname && search === currentUrl.search) {
          // scroll between hash anchors in the same page
          // avoid duplicate history entries when the hash is same
          if (hash && hash !== currentUrl.hash) {
            history.pushState({}, '', linkHref);
            window.dispatchEvent(
              new HashChangeEvent('hashchange', {
                oldURL: currentUrl.href,
                newURL: linkHref,
              }),
            );
            customSrollTo({
              el: link,
              hash,
              smooth: link.classList.contains(anchorLinkClassName),
              anchorLinkClassName,
              scrollOffset,
            });
          }
        }
      }
    });
  });
};
