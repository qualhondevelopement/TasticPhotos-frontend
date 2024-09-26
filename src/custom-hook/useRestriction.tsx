const usePreventActions = () => {
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 123) {
      // Prevent F12
      event.preventDefault();
    } else if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
      // Prevent Ctrl+Shift+I
      event.preventDefault();
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
