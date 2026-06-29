import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Journal } from "@/lib/storage";
import { JournalCard } from "./JournalCard";

interface JournalListProps {
  journals: Journal[];
  emptyState?: ReactNode;
}

export function JournalList({ journals, emptyState }: JournalListProps) {
  if (journals.length === 0 && emptyState) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex justify-center py-20"
      >
        {emptyState}
      </motion.div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {journals.map(journal => (
        <motion.div key={journal.id} variants={item}>
          <JournalCard journal={journal} />
        </motion.div>
      ))}
    </motion.div>
  );
}
