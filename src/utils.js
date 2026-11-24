import { categories } from './data/index.js';

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });

// Full class strings so Tailwind can detect them at build time.
const badgeColors = {
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  orange: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
};

export const categoryBadge = (name) => {
  const color = categories.find((c) => c.name === name)?.color || 'orange';
  return badgeColors[color] || badgeColors.orange;
};
