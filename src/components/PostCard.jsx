import { Link } from 'react-router-dom';
import { formatDate, categoryBadge } from '../utils.js';
import { CalendarIcon, ClockIcon } from './Icons.jsx';

export default function PostCard({ post, view = 'grid' }) {
  const to = `/blog/${post.slug}`;
  const isList = view === 'list';

  return (
    <article
      className={`group bg-surface border border-line rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 ${
        isList ? 'grid grid-cols-[1fr_340px] max-md:grid-cols-1' : 'flex flex-col'
      }`}
    >
      <Link
        to={to}
        className={`block overflow-hidden ${
          isList ? 'h-full min-h-[220px] max-md:min-h-0 max-md:aspect-[16/10]' : 'aspect-[16/10]'
        }`}
      >
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="p-[22px] flex flex-col gap-2.5 flex-1">
        <div className="flex flex-wrap items-center gap-3 text-[.85rem] text-muted">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${categoryBadge(post.category)}`}>
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1.5"><CalendarIcon />{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1.5"><ClockIcon />{post.readTime}</span>
        </div>

        <h3 className="text-xl leading-normal m-0">
          <Link to={to} className="hover:text-accent transition-colors">{post.title}</Link>
        </h3>

        <p className="text-muted text-[.95rem] m-0 line-clamp-3">{post.excerpt}</p>

        <div className="mt-auto pt-3 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2.5">
            <img src={post.author.avatar} alt={post.author.name} className="size-[38px] rounded-full object-cover" />
            <div>
              <strong className="block text-[.9rem] leading-snug">{post.author.name}</strong>
              <small className="text-muted text-xs">{post.author.role}</small>
            </div>
          </div>
          <Link to={to} className="text-accent font-semibold text-[.9rem] whitespace-nowrap">
            اقرأ المقال ←
          </Link>
        </div>
      </div>
    </article>
  );
}
