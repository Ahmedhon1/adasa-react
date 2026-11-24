const buttonBase =
  'min-w-[42px] h-[42px] px-3.5 rounded-xl bg-surface border border-line text-ink transition-all enabled:hover:border-accent disabled:opacity-40 disabled:cursor-not-allowed';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="ترقيم الصفحات" className="flex flex-wrap justify-center gap-2 my-12">
      <button className={buttonBase} disabled={page === 1} onClick={() => onChange(page - 1)}>
        السابق
      </button>
      {pages.map((n) => (
        <button
          key={n}
          aria-current={n === page ? 'page' : undefined}
          onClick={() => onChange(n)}
          className={`${buttonBase} ${n === page ? '!bg-accent !border-accent text-white' : ''}`}
        >
          {n}
        </button>
      ))}
      <button className={buttonBase} disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        التالي
      </button>
    </nav>
  );
}
