import React, { useEffect, useCallback } from 'react';
import type {ModalOptions, ModalState, ModalActions} from '@types'


// Hook personnalisé useModal
export const useModal = (initialOptions: ModalOptions = {}): ModalState & ModalActions => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [options, setOptions] = React.useState<ModalOptions>({
    position: 'center',
    size: 'medium',
    content : "",
    overlay: true,
    overlayClosable: true,
    escapeClosable: true,
    ...initialOptions
  });

  const openModal = useCallback((newOptions?: Partial<ModalOptions>) => {
    if (newOptions) {
      setOptions(prev => ({ ...prev, ...newOptions }));
    }
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback((newOptions?: Partial<ModalOptions>) => {
    if (isOpen) {
      closeModal();
    } else {
      openModal(newOptions);
    }
  }, [isOpen, openModal, closeModal]);

  const updateOptions = useCallback((newOptions: Partial<ModalOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  }, []);

  // Gestion de la touche Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && options.escapeClosable && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, options.escapeClosable, closeModal]);

  return {
    isOpen,
    options,
    openModal,
    closeModal,
    toggleModal,
    updateOptions
  };
};