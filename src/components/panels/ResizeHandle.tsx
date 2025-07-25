// src/components/panels/ResizeHandle.tsx
import React, { useRef } from 'react';
import { usePanel } from '@/hooks/usePanel';
import type { Anchor } from '@/types/panels';

interface ResizeHandleProps {
  anchor: Anchor;
  panelId: string;
  parentRef: React.RefObject<HTMLElement>;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({
  anchor,
  parentRef,
}) => {
  const { updatePanel } = usePanel();
  const dragging = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = parentRef.current?.offsetWidth || 400;
    const startHeight = parentRef.current?.offsetHeight || 300;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!dragging.current) return;

      let newSize;

      if (anchor === 'left') {
        const delta = moveEvent.clientX - startX;
        newSize = Math.max(250, startWidth + delta);
        updatePanel({ width: newSize });
      } else if (anchor === 'right') {
        const delta = startX - moveEvent.clientX;
        newSize = Math.max(250, startWidth + delta);
        updatePanel({ width: newSize });
      } else if (anchor === 'top') {
        const delta = moveEvent.clientY - startY;
        newSize = Math.max(150, startHeight + delta);
        updatePanel({ width: newSize });
      } else if (anchor === 'bottom') {
        const delta = startY - moveEvent.clientY;
        newSize = Math.max(150, startHeight + delta);
        updatePanel({ width: newSize });
      }
    };

    const onMouseUp = () => {
      dragging.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        zIndex: 1500,
        ...(['left', 'right'].includes(anchor) && {
          top: 0,
          bottom: 0,
          ...anchor === 'left' && { left: 0 },
          ...anchor === 'right' && { right: 0 },
          width: 6,
          cursor: 'ew-resize',
        }),
        ...(['top','bottom'].includes(anchor) && {
          ...anchor === 'top' && { top: 0 },
          ...anchor === 'bottom' && { bottom: 0 },
          left: 0,
          right: 0,
          height: 6,
          cursor: 'ns-resize',
        }),
      }}
    />

  );
};

export default ResizeHandle;