import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] w-full bg-background text-foreground selection:bg-primary/20">
      <div className="hidden md:flex flex-col fixed inset-y-0 z-40 w-72">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col md:pl-72 w-full transition-all duration-300">
        <Navbar />
        <main className="flex-1 p-6 lg:p-10 w-full max-w-7xl mx-auto overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
