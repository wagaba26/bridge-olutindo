import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Linkedin, Twitter, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Logo variant="light" />
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Connecting Uganda and Japan through education, career opportunities, and cultural exchange.
                            Your bridge to a global future.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="hover:text-brand-orange transition-colors"><Facebook className="w-5 h-5" /></Link>
                            <Link href="#" className="hover:text-brand-orange transition-colors"><Twitter className="w-5 h-5" /></Link>
                            <Link href="#" className="hover:text-brand-orange transition-colors"><Instagram className="w-5 h-5" /></Link>
                            <Link href="#" className="hover:text-brand-orange transition-colors"><Linkedin className="w-5 h-5" /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Discover</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/learn" className="hover:text-brand-orange transition-colors">Learn Japanese</Link></li>
                            <li><Link href="/jobs" className="hover:text-brand-orange transition-colors">Jobs in Japan</Link></li>
                            <li><Link href="/study" className="hover:text-brand-orange transition-colors">Study & Exchange</Link></li>
                            <li><Link href="/programs" className="hover:text-brand-orange transition-colors">All Programs</Link></li>
                            <li><Link href="/partners" className="hover:text-brand-orange transition-colors">For Partners</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Support</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-orange transition-colors">Contact Center</Link></li>
                            <li><Link href="/faq" className="hover:text-brand-orange transition-colors">FAQs</Link></li>
                            <li><Link href="/privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-brand-orange transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Stay Connected</h3>
                        <p className="text-sm text-slate-400 mb-4">
                            Get the latest updates on jobs, scholarships, and programs.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Enter your email"
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-brand-orange"
                            />
                            <Button className="bg-brand-red hover:bg-brand-red/90 text-white">
                                Subscribe
                            </Button>
                        </div>
                    </div>

                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Bridge Olutindo. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Kampala, Uganda</span>
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Tokyo, Japan</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
