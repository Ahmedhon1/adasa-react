import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { posts, getPostBySlug } from '../data/index.js';
import PostCard from '../components/PostCard.jsx';
import NotFound from './NotFound.jsx';
import { formatDate, categoryBadge } from '../utils.js';
import { CalendarIcon, ClockIcon } from '../components/Icons.jsx';

// The content field uses "## " for headings and plain lines for paragraphs.
function renderContent(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, i) => {
      if (line.startsWith('### ')) return <h3 key={i} className="text-[1.3rem] mt-7 mb-2.5">{line.slice(4)}</h3>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-[1.6rem] mt-10 mb-3">{line.slice(3)}</h2>;
      return <p key={i} className="text-body text-[1.08rem] mt-0 mb-[18px]">{line}</p>;
    });
}

export default function BlogDetails() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <NotFound />;

  const related = posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="wrap max-w-[820px] pt-10 pb-[60px]">
      <Link to="/blog" className="inline-block text-muted hover:text-accent mb-6">
        → العودة للمدونة
      </Link>

      <header>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${categoryBadge(post.category)}`}>
          {post.category}
        </span>
        <h1 className="text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.4] my-4">{post.title}</h1>
        <p className="text-muted text-[1.1rem] m-0">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-3 mt-[18px] text-sm text-muted">
          <span className="inline-flex items-center gap-1.5"><CalendarIcon />{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1.5"><ClockIcon />{post.readTime}</span>
          <span className="flex items-center gap-2.5 text-ink">
            <img src={post.author.avatar} alt={post.author.name} className="size-[38px] rounded-full object-cover" />
            <span>
              <strong className="block">{post.author.name}</strong>
              <small className="text-muted text-xs">{post.author.role}</small>
            </span>
          </span>
        </div>
      </header>

      <img
        src={post.image}
        alt={post.title}
        className="w-full aspect-video object-cover rounded-2xl my-8"
      />

      <div>{renderContent(post.content)}</div>

      <div className="flex flex-wrap gap-2 mt-10">
        {post.tags.map((tag) => (
          <span key={tag} className="px-3.5 py-1.5 rounded-full bg-surface border border-line text-sm text-muted">
            #{tag}
          </span>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-[60px]">
          <h2 className="text-[1.6rem] mb-5">مقالات ذات صلة</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
