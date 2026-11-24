import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { siteInfo } from '../data/index.js';

const navItems = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/blog', label: 'المدونة' },
  { to: '/about', label: 'من نحن' },
];

const socialLabels = { twitter: 'X', github: 'GitHub', linkedin: 'LinkedIn', youtube: 'YouTube' };

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-page/85 backdrop-blur-md border-b border-line">
        <div className="wrap flex items-center justify-between gap-4 py-3.5 relative">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span
              aria-hidden="true"
              className="size-10 rounded-full bg-[conic-gradient(var(--color-accent),#7c2d12,var(--color-accent))]"
            />
            <span>
              <span className="block font-bold text-xl leading-tight">{siteInfo.name}</span>
              <span className="block text-xs text-accent">{siteInfo.tagline}</span>
            </span>
          </Link>

          <nav
            onClick={() => setOpen(false)}
            className={`gap-1 p-1.5 bg-surface border border-line rounded-full md:flex md:flex-row md:static md:mt-0 ${
              open
                ? 'flex flex-col absolute top-full inset-x-[4%] mt-2 rounded-2xl'
                : 'hidden'
            }`}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-[18px] py-2 rounded-full transition-colors ${
                    isActive ? 'bg-accent text-white' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link to="/blog" className="btn btn-primary btn-sm max-md:hidden">ابدأ القراءة</Link>
            <button
              aria-label="القائمة"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="md:hidden bg-transparent text-ink border border-line rounded-[10px] px-2.5 py-1.5 text-lg"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-[60px] py-10 bg-surface border-t border-line">
        <div className="wrap flex flex-wrap justify-between gap-6">
          <div>
            <strong className="font-bold">{siteInfo.name}</strong>
            <p className="text-muted max-w-[420px] mt-2 mb-0">{siteInfo.description}</p>
          </div>
          <div>
            <a href={`mailto:${siteInfo.email}`} className="hover:text-accent transition-colors">
              {siteInfo.email}
            </a>
            <div className="flex flex-wrap gap-3.5 text-muted mt-2">
              {Object.entries(siteInfo.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {socialLabels[key] || key}
                </a>
              ))}
            </div>
          </div>
          <p className="w-full text-center text-muted text-[.85rem] mt-6 mb-0">
            © {new Date().getFullYear()} {siteInfo.name}. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}
