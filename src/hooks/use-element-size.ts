
'use client';

import { useState, useLayoutEffect, useCallback } from 'react';

type ElementSize = {
  width: number;
  height: number;
};

// This custom hook measures the size of an element and updates on resize.
// It returns a ref to attach to the element and the size object.
export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  ElementSize | null
] {
  const [ref, setRef] = useState<T | null>(null);
  const [size, setSize] = useState<ElementSize | null>(null);

  const handleSize = useCallback(() => {
    if (ref) {
      setSize({
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      });
    }
  }, [ref]);

  useLayoutEffect(() => {
    if (!ref) {
      return;
    }

    handleSize();

    // Use ResizeObserver to handle size changes
    const resizeObserver = new ResizeObserver(() => handleSize());
    resizeObserver.observe(ref);

    // Cleanup observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, handleSize]);

  return [setRef, size];
}
