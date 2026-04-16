import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import TourListings from "@/pages/tour-listings";
import TourDetail from "@/pages/tour-detail";
import MyTrips from "@/pages/my-trips";
import BlogDetail from "@/pages/blog-detail";
import { AuthProvider } from "@/lib/auth-context";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tour-packages" component={TourListings} />
      <Route path="/tours/:id" component={TourDetail} />
      <Route path="/blog/:id" component={BlogDetail} />
      <Route path="/my-trips" component={MyTrips} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
            <Router />
          </WouterRouter>
          <Toaster />
          <Sonner position="top-center" richColors theme="dark" />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
