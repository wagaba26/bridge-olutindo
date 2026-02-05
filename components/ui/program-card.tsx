import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProgramCardProps {
  title: string;
  level?: string;
  badge?: string;
  duration?: string;
  mode?: "Online" | "In-person" | "Hybrid";
  highlights?: string[];
  ctaLabel?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function ProgramCard({
  title,
  level,
  badge,
  duration,
  mode,
  highlights = [],
  ctaLabel = "View details",
  href,
  onClick,
  className,
}: ProgramCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            {badge && (
              <Badge variant="outline" className="border-brand-orange text-brand-orange">
                {badge}
              </Badge>
            )}
            <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
            {level && (
              <CardDescription className="font-medium text-brand-blue">
                Level: {level}
              </CardDescription>
            )}
          </div>
          {(duration || mode) && (
            <CardAction className="text-xs text-muted-foreground text-right space-y-1">
              {duration && <div>Duration: {duration}</div>}
              {mode && <div>{mode}</div>}
            </CardAction>
          )}
        </div>
      </CardHeader>
      {highlights.length > 0 && (
        <CardContent>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-red" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
      <CardFooter className="border-t border-border/70 mt-2 pt-4 flex justify-end">
        {href ? (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
          >
            <Link href={href}>{ctaLabel}</Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
            type="button"
            onClick={onClick}
          >
            {ctaLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
