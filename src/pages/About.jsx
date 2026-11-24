import { siteInfo } from '../data/index.js';

export default function About() {
  return (
    <div className="wrap max-w-[760px] py-[60px]">
      <span className="eyebrow">من نحن</span>
      <h1 className="text-[2.4rem] my-4">{siteInfo.name}</h1>
      <p className="text-body text-[1.1rem]">{siteInfo.description}</p>
      <p className="text-body text-[1.1rem]">
        للتواصل معنا:{' '}
        <a href={`mailto:${siteInfo.email}`} className="text-accent font-semibold">{siteInfo.email}</a>
      </p>
    </div>
  );
}
