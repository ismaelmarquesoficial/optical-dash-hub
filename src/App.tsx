import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/comercial" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/comercial/*" element={<MainLayout><div className="p-8 text-center text-muted-foreground">Página em desenvolvimento</div></MainLayout>} />
          <Route path="/financeiro/*" element={<MainLayout><div className="p-8 text-center text-muted-foreground">Módulo Financeiro em desenvolvimento</div></MainLayout>} />
          <Route path="/gestao/*" element={<MainLayout><div className="p-8 text-center text-muted-foreground">Módulo Gestão em desenvolvimento</div></MainLayout>} />
          <Route path="/integracoes/*" element={<MainLayout><div className="p-8 text-center text-muted-foreground">Módulo Integrações em desenvolvimento</div></MainLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
