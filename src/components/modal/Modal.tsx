import React, { useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

import type {ModalOptions, ModalProps} from '@types'

// Composant Modal principal
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  options = {},
  title,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const finalOptions: ModalOptions = {
    position: 'center',
    size: 'small',
    overlay: true,
    overlayClosable: true,
    escapeClosable: true,
    ...options
  };

  // Gestion du clic sur le overlay
  const handleOverlayClick = useCallback((event: React.MouseEvent) => {
    if (finalOptions.overlayClosable && event.target === overlayRef.current) {
      onClose();
    }
  }, [finalOptions.overlayClosable, onClose]);

  // Calcul de la position
  const getPositionStyles = (): React.CSSProperties => {
    const { position } = finalOptions;

    const positions = {
      center: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      },
      top: {
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)'
      },
      bottom: {
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)'
      },
      left: {
        top: '50%',
        left: '10%',
        transform: 'translateY(-50%)'
      },
      right: {
        top: '50%',
        right: '10%',
        transform: 'translateY(-50%)'
      }
    };

    return positions[position as keyof typeof positions] || positions.center;
  };

  // Calcul de la taille
  const getSizeClass = (): string => {
    const sizeClasses = {
      small: 'modal--small',
      medium: 'modal--medium',
      large: 'modal--large',
      fullscreen: 'modal--fullscreen',
      auto: 'modal--auto'
    };
    
    return sizeClasses[finalOptions.size as keyof typeof sizeClasses] || sizeClasses.medium;
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      className="modal-overlay modal-overlay--fade"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`modal modal--fade ${getSizeClass()} ${finalOptions.className || ''}`}
        style={getPositionStyles()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
          <div className="modal__header">
            <button
              className="modal__close"
              onClick={onClose}
              aria-label="close modal"
            >
              ×
            </button>
          </div>
        <div className="modal__content">
            {finalOptions.content ?? "no content"}
        </div>
      </div>
    </div>
  );

  // Utilisation d'un portal pour rendre la modal à la racine du DOM
  return createPortal(modalContent, document.body);
};