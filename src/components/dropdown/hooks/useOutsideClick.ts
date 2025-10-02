import { useEffect, useRef } from 'react';

/**
 * Hook personnalisé pour détecter les clics à l'extérieur d'un élément.
 * Supporte les événements mouse et touch pour les appareils mobiles.
 * 
 * @param {Function} callback - Fonction appelée lors d'un clic extérieur
 * @returns {React.RefObject<HTMLDivElement>} Référence à attacher à l'élément à surveiller
 */
export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);


    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [callback]);

  return ref;
};