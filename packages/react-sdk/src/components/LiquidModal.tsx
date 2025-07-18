import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { LiquidConfig, AskLiquidParams } from "@liquid/core";
import { ModalContent } from "./ModalContent";
import "./LiquidModal.css";

interface LiquidModalProps {
  config: LiquidConfig;
  params: AskLiquidParams;
  isOpen: boolean;
  onClose: () => void;
}

export const LiquidModal: React.FC<LiquidModalProps> = ({
  config,
  params,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Get the modal style from params or config
  const modalStyle =
    params.modalStyle || config.modalStyle || "halfBottomSheet";
  const mode = config.mode || "light";

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Find all focusable elements within the modal
      const modal = modalRef.current;
      if (modal) {
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        focusableElementsRef.current = Array.from(focusableElements);

        // Focus the first focusable element
        if (focusableElementsRef.current.length > 0) {
          focusableElementsRef.current[0].focus();
        }
      }
    } else {
      // Restore focus to the previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  // Handle tab key for focus trapping
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      const focusableElements = focusableElementsRef.current;
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const currentIndex = focusableElements.indexOf(
        event.target as HTMLElement
      );

      if (event.shiftKey) {
        // Shift + Tab (backwards)
        if (currentIndex === 0 || currentIndex === -1) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab (forwards)
        if (currentIndex === focusableElements.length - 1) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === backdropRef.current) {
      onClose();
    }
  };

  // Get CSS classes for modal style and mode
  const getModalClasses = () => {
    const baseClass = "liquid-modal";
    const styleClass = `liquid-modal--${modalStyle}`;
    const modeClass = `liquid-modal--${mode}`;
    const openClass = isOpen ? "liquid-modal--open" : "liquid-modal--closed";

    return `${baseClass} ${styleClass} ${modeClass} ${openClass}`;
  };

  const getBackdropClasses = () => {
    const baseClass = "liquid-backdrop";
    const modeClass = `liquid-backdrop--${mode}`;
    const openClass = isOpen
      ? "liquid-backdrop--open"
      : "liquid-backdrop--closed";

    return `${baseClass} ${modeClass} ${openClass}`;
  };

  // Don't render anything on server-side
  if (typeof window === "undefined") {
    return null;
  }

  // Use portal to render outside the component tree
  return createPortal(
    <div
      ref={backdropRef}
      className={getBackdropClasses()}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="liquid-modal-title"
      aria-describedby="liquid-modal-description"
    >
      <div
        ref={modalRef}
        className={getModalClasses()}
        onKeyDown={handleKeyDown}
        role="document"
      >
        <ModalContent config={config} params={params} onClose={onClose} />
      </div>
    </div>,
    document.body
  );
};
