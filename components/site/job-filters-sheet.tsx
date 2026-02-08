"use client";

import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function JobFiltersSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-11 rounded-xl px-4 text-sm font-semibold">
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[88vh] rounded-t-2xl px-4 pb-6 pt-2">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-300" />
        <SheetHeader className="px-0 pb-2 pt-0">
          <SheetTitle className="text-lg">Filter jobs</SheetTitle>
          <SheetDescription>Refine by category, location, language level, and delivery mode.</SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 overflow-y-auto pb-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Job category</label>
            <Select defaultValue="all">
              <option value="all">All categories</option>
              <option value="factory">Factory</option>
              <option value="caregiving">Caregiving</option>
              <option value="it">IT & Digital</option>
              <option value="other">Other</option>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Location</label>
            <Input placeholder="Tokyo, Osaka, Aichi..." className="h-11 rounded-xl" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">JLPT minimum</label>
              <Select defaultValue="n5">
                <option value="n5">N5</option>
                <option value="n4">N4</option>
                <option value="n3">N3</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Training mode</label>
              <Select defaultValue="all">
                <option value="all">Any</option>
                <option value="in-person">In-person</option>
                <option value="hybrid">Hybrid</option>
                <option value="online">Online</option>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Duration</label>
              <Select defaultValue="all">
                <option value="all">Any</option>
                <option value="3-6">3-6 months</option>
                <option value="6-9">6-9 months</option>
                <option value="6-12">6-12 months</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Sort by</label>
              <Select defaultValue="popular">
                <option value="popular">Most popular</option>
                <option value="newest">Newest</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t pt-4">
          <Button variant="outline" className="h-11 rounded-xl">
            Reset
          </Button>
          <Button className="h-11 rounded-xl bg-slate-900 text-white hover:bg-slate-800">Show jobs</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
