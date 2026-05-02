import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import MapPage from "./pages/MapPage";
import Subscriptions from "./pages/Subscriptions";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NewReservation from "./pages/NewReservation";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminStations from "./pages/admin/AdminStations";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminMaintenance from "./pages/admin/AdminMaintenance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/vehicles" element={<Layout><Vehicles /></Layout>} />
              <Route path="/vehicles/:id" element={<Layout><VehicleDetails /></Layout>} />
              <Route path="/map" element={<Layout><MapPage /></Layout>} />
              <Route path="/subscriptions" element={<Layout><Subscriptions /></Layout>} />
              <Route path="/auth" element={<Layout><Auth /></Layout>} />
              <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
              <Route path="/reservations/new" element={<Layout><NewReservation /></Layout>} />
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/faq" element={<Layout><FAQ /></Layout>} />

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="vehicles" element={<AdminVehicles />} />
                <Route path="stations" element={<AdminStations />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="reservations" element={<AdminReservations />} />
                <Route path="payments" element={<AdminPayments />} />
                <Route path="maintenance" element={<AdminMaintenance />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
