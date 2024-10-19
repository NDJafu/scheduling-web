import { useState, useRef, useMemo } from "react";

export const useEditNoteCard = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const transform = useMemo(() => {
    const rect = triggerRef.current?.getBoundingClientRect();

    if (!rect || !open) return "initial";

    const [vw, vh] = [window.innerWidth, window.innerHeight];
    const [x, y] = [vw / 2 - rect.width / 2, vh / 2 - rect.height / 2];

    const [offsetX, offsetY] = [x - rect.left, y - rect.top];

    return `translate(${offsetX}px, ${offsetY}px)`;
  }, [triggerRef, open]);

  return { open, setOpen, triggerRef, transform };
};
