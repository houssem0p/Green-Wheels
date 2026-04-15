import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Vehicules from "./pages/Vehicules";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
<<<<<<< HEAD
import Stations from "./pages/Stations";
=======
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminVehicules from "./pages/AdminVehicules/AdminVehicules";
import AdminStations from "./pages/AdminStations/AdminStations";
import AdminUtilisateurs from "./pages/AdminUtilisateurs/AdminUtilisateurs";
import AdminReservations from "./pages/AdminReservations/AdminReservations";
import AdminPayments from "./pages/AdminPayments/AdminPayments";
import AdminMaintenance from "./pages/AdminMaintenance/AdminMaintenance";

>>>>>>> 06ca969 (update frontend)
function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicules" element={<Vehicules />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
 <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/stations" element={<Stations />} />
=======
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/vehicules" element={<AdminVehicules />} />
        <Route path="/admin/stations" element={<AdminStations />} />
        <Route path="/admin/utilisateurs" element={<AdminUtilisateurs />} />
        <Route path="/admin/reservations" element={<AdminReservations />} />
        <Route path="/admin/paiements" element={<AdminPayments />} />
        <Route path="/admin/maintenance" element={<AdminMaintenance />} />
>>>>>>> 06ca969 (update frontend)
      </Routes >
    </>
  );
}

export default App;