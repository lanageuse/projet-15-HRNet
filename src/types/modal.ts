// Types pour les options du modal
export interface ModalPosition {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
}

export interface ModalOptions {
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'custom';
  size?: 'small' | 'medium' | 'large' | 'fullscreen' | 'auto';
  content?: string
  overlay?: boolean;
  overlayClosable?: boolean;
  escapeClosable?: boolean;
  className?: string;
}

export interface ModalState {
  isOpen: boolean;
  options: ModalOptions;
}

export interface ModalActions {
  openModal: (options?: Partial<ModalOptions>) => void;
  closeModal: () => void;
  toggleModal: (options?: Partial<ModalOptions>) => void;
  updateOptions: (options: Partial<ModalOptions>) => void;
}

// Props du composant Modal
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  options?: ModalOptions;
  title?: string;
  footer?: React.ReactNode;
}