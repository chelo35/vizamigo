import { useEffect, useRef } from 'react';

export interface UseModalA11yOptions {
  isOpen: boolean;
  onClose: () => void;
  modalRef: React.RefObject<HTMLElement | null>;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  closeOnEscape?: boolean;
}

/**
 * Custom hook providing WCAG 2.1 Level AA compliant modal focus management:
 * 1. Automatically traps keyboard Tab/Shift+Tab focus within the active modal.
 * 2. Focuses the first focusable element (or specified ref) on mount.
 * 3. Restores focus back to the triggering element when the modal closes.
 * 4. Listens for Escape key to trigger onClose.
 */
export function useModalA11y({
  isOpen,
  onClose,
  modalRef,
  initialFocusRef,
  closeOnEscape = true
}: UseModalA11yOptions) {
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 1. Save currently focused trigger element before modal takes focus
    if (document.activeElement instanceof HTMLElement) {
      previouslyFocusedElementRef.current = document.activeElement;
    }

    // 2. Programmatically move focus to the first focusable element or container
    const focusTimer = requestAnimationFrame(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
        return;
      }

      if (modalRef.current) {
        const focusableSelectors = [
          'button:not([disabled])',
          '[href]',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          '[tabindex]:not([tabindex="-1"])'
        ].join(', ');

        const focusables = Array.from(modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors))
          .filter((el) => el.offsetParent !== null && window.getComputedStyle(el).visibility !== 'hidden');

        if (focusables.length > 0) {
          focusables[0].focus();
        } else {
          modalRef.current.focus();
        }
      }
    });

    // 3. Handle Keydown: Cyclic Tab trap and Escape key close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableSelectors = [
          'button:not([disabled])',
          '[href]',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          '[tabindex]:not([tabindex="-1"])'
        ].join(', ');

        const focusables = Array.from(modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors))
          .filter((el) => el.offsetParent !== null && window.getComputedStyle(el).visibility !== 'hidden');

        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || document.activeElement === modalRef.current) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // 4. Cleanup on close: Restore focus back to original trigger button
    return () => {
      cancelAnimationFrame(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === 'function') {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, onClose, closeOnEscape, modalRef, initialFocusRef]);
}
