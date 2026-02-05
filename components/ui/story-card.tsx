import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface StoryCardProps {
  category: string;
  categoryColor?: "red" | "blue" | "orange";
  title: string;
  excerpt: string;
  href: string;
  className?: string;
}

const categoryColorMap: Record<
  NonNullable<StoryCardProps["categoryColor"]>,
  string
> = {
  red: "text-brand-red",
  blue: "text-brand-blue",
  orange: "text-brand-orange",
};

export function StoryCard({
  category,
  categoryColor = "blue",
  title,
  excerpt,
  href,
  className,
}: StoryCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-md transition-shadow border",
        className
      )}
    >
      <div className="h-40 bg-slate-200 w-full relative">
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">
          Story image
        </div>
      </div>
      <CardContent className="pt-6 pb-4">
        <div
          className={cn(
            "text-[0.7rem] font-semibold mb-2 uppercase tracking-[0.2em]",
            categoryColorMap[categoryColor]
          )}
        >
          {category}
        </div>
        <CardTitle className="text-base md:text-lg mb-2 line-clamp-2 hover:text-brand-blue cursor-pointer">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm">
          {excerpt}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-0 pb-5 px-6">
        <Link
          href={href}
          className="text-sm font-medium hover:text-brand-red transition-colors"
        >
          Read full story
        </Link>
      </CardFooter>
    </Card>
  );
}

