export function saveScrollPosition() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("scrollPosition", window.scrollY.toString());
  }
}

export function restoreScrollPosition() {
  if (typeof window !== "undefined") {
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
      sessionStorage.removeItem("scrollPosition");
    }
  }
}
