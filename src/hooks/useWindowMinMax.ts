import useWindowManagerStore from "../stores/windowManagerStore";

function toPx(value: number) {
  return `${value}px`;
}
function useWindowMinMax(windowRef: React.RefObject<HTMLElement>) {
  const winMan = useWindowManagerStore();

  function maximize() {
    const boundary = winMan.contentRef.current?.getBoundingClientRect();
    const window = windowRef.current;
    if (!boundary || !window) return;

    window.style.top = toPx(boundary.y);
    window.style.left = toPx(boundary.x);
    window.style.width = toPx(boundary.width);
    window.style.height = toPx(boundary.height);
    window.style.transform = "";
  }

  function minimize() {
    const window = windowRef.current;
    if (!window) return;

    const oldTransition = window.style.transition;
    const oldTransform = window.style.transform;
    const oldOpacity = window.style.opacity;

    window.style.transition = "all 0.2s linear";
    window.style.opacity = "0";
    window.style.transform = "scale(0.5) translate(0, 500%)";

    window.addEventListener("transitionend", (e) => {
      if (e.target === window) {
        window.style.display = "none";
        window.style.transition = oldTransition;
        window.style.transform = oldTransform;
        window.style.opacity = oldOpacity;
      }
    });
  }

  return {
    maximize,
    minimize,
  };
}

export default useWindowMinMax;
