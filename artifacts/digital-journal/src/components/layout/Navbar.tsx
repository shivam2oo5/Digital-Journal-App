import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./Sidebar";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  // Determine title based on location
  const getTitle = () => {
    if (location.startsWith("/journal/new")) return "New Journal Entry";
    if (location.startsWith("/journal/")) return "View Journal";
    if (location.startsWith("/dashboard")) return "Dashboard";
    if (location.startsWith("/journals")) return "My Journals";
    if (location.startsWith("/categories")) return "Categories";
    if (location.startsWith("/favorites")) return "Favorites";
    if (location.startsWith("/analytics")) return "Analytics";
    if (location.startsWith("/archive")) return "Archive";
    if (location.startsWith("/trash")) return "Trash";
    if (location.startsWith("/settings")) return "Settings";
    return "Digital Journal";
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-md">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 border-r-0">
          <Sidebar closeDrawer={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
      
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <h1 className="text-xl font-semibold tracking-tight">{getTitle()}</h1>
      </div>
    </header>
  );
}
