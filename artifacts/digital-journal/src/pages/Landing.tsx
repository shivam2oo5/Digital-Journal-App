import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PenTool, Heart, BarChart3, Lock, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary/20">
      <header className="py-6 px-8 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl text-primary">
            <PenTool className="h-6 w-6" />
          </div>
          <span className="font-bold text-xl tracking-tight">Digital Journal Pro</span>
        </div>
        <Link href="/dashboard">
          <Button variant="ghost" className="font-medium">Go to App</Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-multiply" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] -z-10 mix-blend-multiply" />
        
        <div className="max-w-4xl px-6 w-full text-center z-10 mt-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8 border border-border/50">
              <Sparkles className="h-4 w-4 text-primary" />
              Your personal workspace for clarity
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Capture your thoughts, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                organize your mind.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              A premium, completely private journaling experience. No servers, no tracking. 
              Just you and your thoughts in a beautifully crafted interface.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="rounded-2xl h-14 px-8 text-lg font-semibold shadow-lg shadow-primary/20 gap-2 w-full sm:w-auto transition-transform hover:-translate-y-1">
                  Get Started <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20 z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-card/50 backdrop-blur-sm border rounded-[24px] p-8 hover:bg-card transition-colors shadow-sm">
            <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center text-primary mb-6">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">100% Private</h3>
            <p className="text-muted-foreground leading-relaxed">
              Everything stays on your device. We use LocalStorage to ensure your personal thoughts remain completely yours.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border rounded-[24px] p-8 hover:bg-card transition-colors shadow-sm">
            <div className="bg-accent/10 w-12 h-12 rounded-2xl flex items-center justify-center text-accent mb-6">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Mood Tracking</h3>
            <p className="text-muted-foreground leading-relaxed">
              Log how you feel each day. Build a deeper understanding of your emotional patterns over time.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border rounded-[24px] p-8 hover:bg-card transition-colors shadow-sm">
            <div className="bg-chart-3/10 w-12 h-12 rounded-2xl flex items-center justify-center text-chart-3 mb-6">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Rich Analytics</h3>
            <p className="text-muted-foreground leading-relaxed">
              Visualize your writing habits with beautiful charts. Track your streak and category distribution.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
