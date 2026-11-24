import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { posts, categories } from '../data/index.js';
import PostCard from '../components/PostCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { SearchIcon, GridIcon, ListIcon, CloseIcon } from '../components/Icons.jsx';

const PAGE_SIZE = 6;
const allCategories = [
  { name: 'all', label: 'جميع المقالات' },
  ...categories.map((c) => ({ name: c.name, label: c.name })),
];

export default function Blog() {
  // All state lives in the URL (?category=&q=&view=&page=) so it survives refresh and sharing.
  const [params, setParams] = useSearchParams();

  const category = params.get('category') || 'all';
  const q = params.get('q') || '';
  const view = params.get('view') === 'list' ? 'list' : 'grid';
  const page = Math.max(1, parseInt(params.get('page') || '1', 10) || 1);

  const update = (changes) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => {
      const isDefault =
        value == null || value === '' ||
        (key === 'category' && value === 'all') ||
        (key === 'view' && value === 'grid') ||
        (key === 'page' && value === 1);
      if (isDefault) next.delete(key);
      else next.set(key, String(value));
    });
    setParams(next);
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return posts
      .filter((p) => category === 'all' || p.category === category)
      .filter((p) =>
        !term ||
        [p.title, p.excerpt, p.category, ...p.tags].some((text) => text.toLowerCase().includes(term))
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [category, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const hasFilters = category !== 'all' || q;

  const goToPage = (n) => {
    update({ page: n });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const chipBase = 'px-[18px] py-[9px] rounded-full border transition-all';

  return (
    <div className="wrap">
      <header className="text-center pt-16 pb-10">
        <span className="eyebrow">مدونتنا</span>
        <h1 className="text-[clamp(2rem,5vw,3.4rem)] my-[18px] mb-2">
          استكشف <span className="text-accent">مقالاتنا</span>
        </h1>
        <p className="text-muted m-0">اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث</p>
      </header>

      <div className="flex flex-wrap justify-between items-center gap-4 py-5 border-t border-line">
        <div className="flex flex-wrap gap-2">
          {allCategories.map((c) => {
            const active = category === c.name;
            return (
              <button
                key={c.name}
                onClick={() => update({ category: c.name, page: 1 })}
                className={`${chipBase} ${
                  active
                    ? 'bg-accent border-accent text-white'
                    : 'bg-surface border-line text-muted hover:text-ink'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2.5 w-full md:w-auto md:min-w-[280px] px-[18px] py-2.5 rounded-full bg-surface border border-line text-muted focus-within:border-accent">
          <SearchIcon />
          <input
            type="search"
            placeholder="ابحث في المقالات..."
            value={q}
            onChange={(e) => update({ q: e.target.value, page: 1 })}
            className="flex-1 min-w-0 bg-transparent border-0 outline-none text-ink placeholder:text-muted"
          />
        </label>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-3 my-4 mb-6">
        <div className="flex flex-wrap items-center gap-1 text-muted">
          {filtered.length ? (
            <>
              عرض <strong className="text-ink">{filtered.length}</strong> مقالات
              {category !== 'all' && <> في <span className="text-accent">{category}</span></>}
            </>
          ) : (
            'لا توجد نتائج مطابقة'
          )}
          {hasFilters && (
            <button
              onClick={() => setParams(new URLSearchParams())}
              className="inline-flex items-center gap-1.5 ms-3 bg-transparent border-0 text-muted hover:text-ink"
            >
              <CloseIcon /> مسح الفلاتر
            </button>
          )}
        </div>

        <div className="flex gap-1.5 p-1 bg-surface border border-line rounded-xl">
          {[
            { key: 'list', label: 'عرض قائمة', Icon: ListIcon },
            { key: 'grid', label: 'عرض شبكي', Icon: GridIcon },
          ].map(({ key, label, Icon }) => (
            <button
              key={key}
              aria-label={label}
              onClick={() => update({ view: key })}
              className={`p-2 rounded-lg grid place-items-center bg-transparent border-0 text-muted ${
                view === key ? '!bg-accent !text-white' : 'hover:text-ink'
              }`}
            >
              <Icon />
            </button>
          ))}
        </div>
      </div>

      {visible.length ? (
        <div
          className={
            view === 'list'
              ? 'flex flex-col gap-5'
              : 'grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6'
          }
        >
          {visible.map((post) => (
            <PostCard key={post.id} post={post} view={view} />
          ))}
        </div>
      ) : (
        <div className="text-center py-[60px] text-muted">جرّب كلمات بحث أو تصنيف مختلف.</div>
      )}

      <Pagination page={currentPage} totalPages={totalPages} onChange={goToPage} />
    </div>
  );
}
