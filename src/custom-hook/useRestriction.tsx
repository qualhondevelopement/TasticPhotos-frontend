const usePreventActions = () => {
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };
 

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "F12") {
      e.preventDefault(); // Prevent F12
    }
    if (e.ctrlKey && e.shiftKey) {
      if (e.key === "I" || e.key === "C" || e.key === "J") {
        e.preventDefault(); // Prevent Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J
      }
    }
    if (e.ctrlKey && e.key === "u") {
      e.preventDefault(); // Prevent Ctrl+U
    }
  };

  document.addEventListener("contextmenu", handleContextMenu);
  document.addEventListener("keydown", handleKeyDown);

  // Return a cleanup function to remove the listeners
  return () => {
    document.removeEventListener("contextmenu", handleContextMenu);
    document.removeEventListener("keydown", handleKeyDown);
  };
};

export default usePreventActions;
