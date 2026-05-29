// Lightweight wrapper that turns lucide icons into React components.
// Lucide UMD exposes window.lucide.icons as { IconName: { toSvg, ... } } —
// we read SVG paths via `lucide.createIcons` style and just render <i data-lucide>
// then call lucide.createIcons() after each render. That's reliable & tiny.

const { useEffect, useRef } = React;

function Icon({ name, size = 20, strokeWidth = 1.75, className = "", color, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.lucide && ref.current) {
      // Clear and re-create to avoid stale icons after re-render
      ref.current.innerHTML = `<i data-lucide="${name}"
        style="width:${size}px;height:${size}px;display:inline-block;"
        ></i>`;
      try {
        window.lucide.createIcons({
          attrs: { 'stroke-width': strokeWidth, width: size, height: size },
          nameAttr: 'data-lucide',
          icons: window.lucide.icons || undefined,
          // restrict scope
          target: ref.current,
        });
      } catch (e) {
        // Older API: createIcons() globally; svg appears
        try { window.lucide.createIcons(); } catch (_) {}
      }
    }
  }, [name, size, strokeWidth]);
  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: color || "currentColor",
        lineHeight: 0,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

window.Icon = Icon;
