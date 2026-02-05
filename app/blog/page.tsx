import { SectionHeading } from "@/components/ui/section-heading";
import { StoryCard } from "@/components/ui/story-card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Resources & Stories | Bridge Olutindo",
  description:
    "Guides, stories, and resources for Ugandans preparing to learn, work, and study in Japan.",
};

const POSTS = [
  {
    category: "Career Track",
    categoryColor: "blue" as const,
    title: "From Kampala to Osaka: John&apos;s Engineering Journey",
    excerpt:
      "How John prepared for N4, navigated interviews, and settled into his first factory role in Osaka.",
  },
  {
    category: "Study Abroad",
    categoryColor: "orange" as const,
    title: "Sarah&apos;s Scholarship Path to Tokyo",
    excerpt:
      "A look at the steps, documents, and interviews that led Sarah to a scholarship in Tokyo.",
  },
  {
    category: "Language",
    categoryColor: "red" as const,
    title: "Five habits that accelerate your Japanese learning",
    excerpt:
      "Practical tips from our instructors to help you maintain momentum from N5 to N3.",
  },
];

const TAGS = ["Learn Japanese", "Jobs in Japan", "Study & Exchange", "Life in Japan"];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-16 md:py-24 space-y-6">
          <SectionHeading
            eyebrow="Resources"
            title="Stories and guides from Uganda to Japan."
            description="This section will host detailed guides, success stories, and updates tailored to Ugandans heading to Japan."
          />
          <div className="flex flex-wrap gap-3 text-xs">
            {TAGS.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-slate-300 text-slate-700"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 space-y-8">
          <div className="grid gap-8 md:grid-cols-3">
            {POSTS.map((post) => (
              <StoryCard
                key={post.title}
                category={post.category}
                categoryColor={post.categoryColor}
                title={post.title}
                excerpt={post.excerpt}
                href="/blog"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
