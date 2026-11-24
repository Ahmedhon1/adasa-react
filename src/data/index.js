import data from './posts.json';

export const posts = data.posts;
export const categories = data.categories;
export const siteInfo = data.siteInfo;

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug);
