import { useEffect } from "react";

const useKeyboardEvents = (
  handlers: Record<string, (event: KeyboardEvent) => void>
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const handler = handlers[event.key.toLowerCase()];
      if (!event.repeat && handler) {
        event.preventDefault();
        handler(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handlers]);
};

export default useKeyboardEvents;
