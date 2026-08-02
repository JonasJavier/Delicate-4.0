const baseProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const BagIcon = () => (
  <svg {...baseProps}><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>
);

export const MenuIcon = () => (
  <svg {...baseProps}><path d="M4 7h16M4 12h16M4 17h16"/></svg>
);

export const CloseIcon = () => (
  <svg {...baseProps}><path d="m6 6 12 12M18 6 6 18"/></svg>
);

export const ArrowIcon = () => (
  <svg {...baseProps}><path d="M5 12h14M14 7l5 5-5 5"/></svg>
);

export const LeafIcon = () => (
  <svg {...baseProps}><path d="M20 4c-7 0-13 3-13 9 0 3 2 5 5 5 6 0 8-7 8-14Z"/><path d="M4 21c3-6 7-9 13-13"/></svg>
);

export const SparkIcon = () => (
  <svg {...baseProps}><path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/></svg>
);

export const HeartIcon = () => (
  <svg {...baseProps}><path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z"/></svg>
);

export const WhatsAppIcon = () => (
  <svg {...baseProps} fill="currentColor" stroke="none"><path d="M12.04 2a9.84 9.84 0 0 0-8.53 14.76L2 22l5.38-1.41A9.96 9.96 0 1 0 12.04 2Zm0 17.94a8.04 8.04 0 0 1-4.1-1.12l-.3-.18-3.2.84.86-3.11-.2-.32a7.89 7.89 0 1 1 6.94 3.89Zm4.4-5.91c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.25-.62.79-.76.95-.14.17-.28.19-.52.07-.24-.12-1.02-.37-1.94-1.2a7.21 7.21 0 0 1-1.34-1.67c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.17.04-.31-.02-.43-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.25-.84.83-.84 2.01s.86 2.33.98 2.49c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg>
);
