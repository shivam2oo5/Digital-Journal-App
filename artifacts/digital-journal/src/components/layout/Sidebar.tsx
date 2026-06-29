import { Link, useLocation } from "wouter";
import { 
  Home, 
  BookText, 
  PlusCircle, 
  FolderOpen, 
  Heart, 
  BarChart3, 
  Archive, 
  Trash2, 
  Settings,
  PenTool
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const mainNav: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: BookText, label: "My Journals", href: "/journals" },
  { icon: FolderOpen, label: "Categories", href: "/categories" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
];

const secondaryNav: NavItem[] = [
  { icon: Archive, label: "Archive", href: "/archive" },
  { icon: Trash2, label: "Trash", href: "/trash" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar({ className, closeDrawer }: { className?: string; closeDrawer?: () => void }) {
  const [location] = useLocation();

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = location === item.href || (location.startsWith(item.href) && item.href !== "/");
    return (
      <Link href={item.href} onClick={closeDrawer}>
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-[14px] transition-all cursor-pointer font-medium",
            isActive 
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          )}
        >
          <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
          <span>{item.label}</span>
        </div>
      </Link>
    );
  };

  return (
    <div className={cn("flex flex-col h-full bg-card border-r w-72 p-4", className)}>
      <div className="flex items-center gap-3 px-4 py-2 mb-8">
        <div className="bg-primary/10 p-2 rounded-xl text-primary">
          <PenTool className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-bold text-lg tracking-tight">Digital Journal</h2>
          <p className="text-xs text-muted-foreground font-medium">Pro Workspace</p>
        </div>
      </div>

      <div className="px-4 mb-6">
        <Link href="/journal/new" onClick={closeDrawer}>
          <Button className="w-full justify-start gap-2 h-12 rounded-[14px] shadow-sm" size="lg">
            <PlusCircle className="h-5 w-5" />
            New Entry
          </Button>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto space-y-8">
        <div className="space-y-1">
          <p className="px-4 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-2">
            Main
          </p>
          {mainNav.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>

        <div className="space-y-1">
          <p className="px-4 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-2">
            Library
          </p>
          {secondaryNav.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
