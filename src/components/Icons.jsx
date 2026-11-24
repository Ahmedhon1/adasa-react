const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const SearchIcon = () => (
  <svg {...base}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);
export const GridIcon = () => (
  <svg {...base}>
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
export const ListIcon = () => (
  <svg {...base}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
);
export const CloseIcon = () => (
  <svg {...base} width={14} height={14}><path d="M18 6 6 18M6 6l12 12" /></svg>
);
export const ClockIcon = () => (
  <svg {...base} width={15} height={15}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const CalendarIcon = () => (
  <svg {...base} width={15} height={15}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
);
