import { blogPosts } from '../data/blogPosts';

export function BlogPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-cyan-300">Mini Guides</h2>
      <p className="text-zinc-400">Practical roster-building notes. Share your content overview/references next and these can be expanded into full post series.</p>
      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <article key={post.id} className="glass rounded-2xl p-5 space-y-3 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)] transition">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <span className="text-xs text-zinc-400">{post.readTime}</span>
            </div>
            {post.heroImage && <img src={post.heroImage} alt={post.title} className="w-full h-36 object-contain bg-zinc-950/50 rounded-lg" />}
            <p className="text-zinc-300">{post.excerpt}</p>
            <div className="flex gap-2 flex-wrap">{post.tags.map((t)=><span key={t} className="text-xs px-2 py-1 border border-cyan-500/40 text-cyan-300 rounded-full">{t}</span>)}</div>
            <ol className="list-decimal ml-5 space-y-2 text-zinc-200">{post.content.map((point, i)=><li key={i}>{point}</li>)}</ol>
            {post.source && <a className="text-cyan-300 text-sm underline" href={post.source.url} target="_blank" rel="noreferrer">Source: {post.source.label}</a>}
          </article>
        ))}
      </div>
    </div>
  );
}
