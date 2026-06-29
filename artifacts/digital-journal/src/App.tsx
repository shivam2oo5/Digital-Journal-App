import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Journals from "@/pages/Journals";
import JournalDetail from "@/pages/JournalDetail";
import Categories from "@/pages/Categories";
import Favorites from "@/pages/Favorites";
import Analytics from "@/pages/Analytics";
import Archive from "@/pages/Archive";
import Trash from "@/pages/Trash";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      
      <Route path="/dashboard">
        <AppLayout><Dashboard /></AppLayout>
      </Route>
      
      <Route path="/journals">
        <AppLayout><Journals /></AppLayout>
      </Route>
      
      <Route path="/journal/new">
        <AppLayout><JournalDetail /></AppLayout>
      </Route>
      
      <Route path="/journal/:id">
        <AppLayout><JournalDetail /></AppLayout>
      </Route>
      
      <Route path="/categories">
        <AppLayout><Categories /></AppLayout>
      </Route>
      
      <Route path="/favorites">
        <AppLayout><Favorites /></AppLayout>
      </Route>
      
      <Route path="/analytics">
        <AppLayout><Analytics /></AppLayout>
      </Route>
      
      <Route path="/archive">
        <AppLayout><Archive /></AppLayout>
      </Route>
      
      <Route path="/trash">
        <AppLayout><Trash /></AppLayout>
      </Route>
      
      <Route path="/settings">
        <AppLayout><Settings /></AppLayout>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster position="bottom-right" className="font-sans" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
