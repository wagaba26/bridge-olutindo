import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Resources | Bridge Olutindo",
  description: "Stories and guides to help Ugandans prepare for learning, work, and life in Japan.",
};

const categories = [
  { label: "Learn Japanese", count: 14 },
  { label: "Jobs in Japan", count: 18 },
  { label: "Study & Exchange", count: 9 },
  { label: "Life in Japan", count: 11 },
];

const stories = [
  {
    tag: "Jobs in Japan",
    readTime: "7 min read",
    title: "From Kampala to Osaka: preparing for your first factory interview",
    excerpt: "A practical guide on documents, language expectations, and interview confidence.",
    image: "/images/blog/guide-1.jpg",
  },
  {
    tag: "Study & Exchange",
    readTime: "6 min read",
    title: "Scholarship planning timeline for Ugandan applicants",
    excerpt: "Map out your school search, recommendation letters, and funding milestones.",
    image: "/images/blog/guide-2.jpg",
  },
  {
    tag: "Learn Japanese",
    readTime: "5 min read",
    title: "Simple weekly system that helps learners move from N5 to N4",
    excerpt: "How to combine drills, listening sessions, and speaking practice without burnout.",
    image: "/images/blog/guide-3.jpg",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Resources</p>
          <h1 className="mt-3 max-w-3xl">Stories and guides from Uganda to Japan.</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-600 md:text-base">
            Practical insights for language learning, career preparation, and education planning.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.label}
                type="button"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700"
              >
                {category.label}
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {stories.map((story) => (
              <article key={story.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={story.image} alt={story.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{story.tag}</span>
                  <span>{story.readTime}</span>
                </div>
                <h2 className="mt-3 text-xl">{story.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{story.excerpt}</p>
                <Link href="/blog" className="mt-4 inline-flex text-sm font-semibold text-slate-900">
                  Read guide
                </Link>
              </article>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white">
              <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl">
                <Image
                  src="/images/blog/guide-1.jpg"
                  alt="Featured Japan guide"
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">Featured guide</p>
              <h3 className="mt-2 text-xl">Japan 101 starter checklist for Ugandans</h3>
              <p className="mt-2 text-sm text-slate-200">Everything to prepare before you travel: paperwork, housing, and first-week setup.</p>
              <Link
                href="/blog"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-white px-4 text-sm font-semibold text-slate-900"
              >
                Open guide
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold">Newsletter</h3>
              <p className="mt-2 text-sm text-slate-600">Monthly updates on intakes, jobs, and scholarship opportunities.</p>
              <form className="mt-3 space-y-2">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm"
                />
                <button type="submit" className="h-11 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white">
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
