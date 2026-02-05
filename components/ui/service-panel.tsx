import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ServicePanelProps {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    theme: "red" | "blue" | "orange" | "teal" | "slate";
    className?: string;
    backgroundImage?: string;
}

export function ServicePanel({ title, description, href, icon, theme, className, backgroundImage }: ServicePanelProps) {

    const themeStyles = {
        red: "bg-brand-red text-white hover:bg-brand-red/90",
        blue: "bg-brand-blue text-white hover:bg-brand-blue/90",
        orange: "bg-brand-orange text-white hover:bg-brand-orange/90",
        teal: "bg-network-teal text-white hover:bg-network-teal/90",
        slate: "bg-slate-800 text-white hover:bg-slate-900",
    };

    const borderStyles = {
        red: "border-brand-red/20 hover:border-brand-red",
        blue: "border-brand-blue/20 hover:border-brand-blue",
        orange: "border-brand-orange/20 hover:border-brand-orange",
        teal: "border-network-teal/20 hover:border-network-teal",
        slate: "border-slate-200 hover:border-slate-400",
    };

    return (
        <Link
            href={href}
            className={cn(
                "group relative flex flex-col justify-between p-6 md:p-8 rounded-xl border-2 transition-all duration-300 hover:shadow-lg overflow-hidden",
                borderStyles[theme],
                className
            )}
        >
            {/* Optional Background Image Overlay */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity bg-cover bg-center z-0"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            )}

            <div className="relative z-10">
                <div className={cn("inline-flex p-3 rounded-lg mb-4 text-white shadow-sm", themeStyles[theme])}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-red transition-colors dark:text-foreground">{title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
            </div>

            <div className="relative z-10 mt-auto">
                <span className={cn("inline-flex items-center text-sm font-semibold group-hover:underline underline-offset-4 decoration-2",
                    theme === 'red' ? 'text-brand-red' :
                        theme === 'blue' ? 'text-brand-blue' :
                            theme === 'orange' ? 'text-brand-orange' :
                                theme === 'teal' ? 'text-network-teal' : 'text-slate-700'
                )}>
                    Explore {title} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    );
}
