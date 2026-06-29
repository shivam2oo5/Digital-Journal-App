import { useState, useMemo } from "react";
import { useJournals } from "@/hooks/use-journals";
import { JournalList } from "@/components/journals/JournalList";
import { CATEGORY_COLORS, Category } from "@/lib/storage";
import { FolderOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function Categories() {
  const { activeJournals } = useJournals();
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");

  const categories = Object.keys(CATEGORY_COLORS) as Category[];

  const counts = useMemo(() => {
    const acc: Record<string, number> = {};
    activeJournals.forEach(j => {
      acc[j.category] = (acc[j.category] || 0) + 1;
    });
    return acc;
  }, [activeJournals]);

  const filteredJournals = useMemo(() => {
    let result = [...activeJournals];
    if (selectedCategory !== "all") {
      result = result.filter(j => j.category === selectedCategory);
    }
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return result;
  }, [activeJournals, selectedCategory]);

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={() => setSelectedCategory("all")}
          className={`cursor-pointer rounded-[20px] p-5 border transition-all duration-300 flex flex-col items-center justify-center text-center gap-3 h-32 ${
            selectedCategory === "all" ? "bg-secondary border-primary shadow-sm" : "bg-card hover:bg-secondary/50 hover:-translate-y-1"
          }`}
        >
          <div className="font-semibold">All Categories</div>
          <div className="text-2xl font-bold text-muted-foreground">{activeJournals.length}</div>
        </div>

        {categories.map((c) => (
          <div 
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`cursor-pointer rounded-[20px] p-5 border transition-all duration-300 flex flex-col items-center justify-center text-center gap-3 h-32 ${
              selectedCategory === c ? "shadow-md" : "bg-card hover:bg-secondary/50 hover:-translate-y-1"
            }`}
            style={{ 
              borderColor: selectedCategory === c ? CATEGORY_COLORS[c] : "",
              backgroundColor: selectedCategory === c ? `${CATEGORY_COLORS[c]}15` : "" 
            }}
          >
            <div className="font-semibold" style={{ color: selectedCategory === c ? CATEGORY_COLORS[c] : "" }}>{c}</div>
            <div className="text-2xl font-bold" style={{ color: selectedCategory === c ? CATEGORY_COLORS[c] : "var(--muted-foreground)" }}>
              {counts[c] || 0}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <h2 className="text-xl font-bold mb-6">
          {selectedCategory === "all" ? "All Entries" : `${selectedCategory} Entries`}
        </h2>
        <JournalList 
          journals={filteredJournals}
          emptyState={
            <div className="flex flex-col items-center text-center py-10">
              <FolderOpen className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">No entries in this category.</p>
            </div>
          }
        />
      </div>
    </div>
  );
}
