// src/components/panels/ResizeHandle.tsx
import React, { useRef } from 'react';
import { usePanel } from '@/hooks/usePanel';

interface ResizeHandleProps {
  isLeft: boolean;
  panelId: string;
  parentRef: React.RefObject<HTMLElement>;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({
  isLeft,
  panelId,
  parentRef,
}) => {
  const { updatePanel } = usePanel(panelId);
  const dragging = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = parentRef.current?.offsetWidth || 400;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!dragging.current) return;
      const delta = isLeft
        ? moveEvent.clientX - startX
        : startX - moveEvent.clientX;
      const newWidth = Math.max(250, startWidth + delta);
      updatePanel({ width: newWidth });
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
        top: 0,
        bottom: 0,
        [isLeft ? 'right' : 'left']: 0,
        width: 6,
        cursor: isLeft ? 'ew-resize' : 'we-resize',
        zIndex: 1310,
      }}
    />
  );
};

export default ResizeHandle;