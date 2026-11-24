import { Link } from 'react-router-dom';
import { posts, siteInfo } from '../data/index.js';
import PostCard from '../components/PostCard.jsx';

export default function Home() {
  const featured = posts.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <section className="text-center pt-20 pb-[60px] bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,.18),transparent_60%)]">
        <div className="wrap">
          <span className="eyebrow">مرحبًا بك في {siteInfo.name}</span>
          <h1 className="text-[clamp(2.2rem,6vw,4rem)] leading-[1.3] my-[18px]">
            اكتشف عالم <span className="text-accent">التصوير الفوتوغرافي</span>
          </h1>
          <p className="text-muted max-w-[620px] mx-auto mb-7">{siteInfo.description}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/blog" className="btn btn-primary">ابدأ القراءة</Link>
            <Link to="/about" className="btn">من نحن</Link>
          </div>
        </div>
      </section>

      <section className="wrap py-12">
        <div className="flex justify-between items-end gap-3 mb-6">
          <h2 className="text-[1.8rem] m-0">مقالات مميزة</h2>
          <Link to="/blog" className="text-accent font-semibold">عرض كل المقالات ←</Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {featured.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
