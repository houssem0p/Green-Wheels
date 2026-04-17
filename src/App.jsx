import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Vehicules from "./pages/Vehicules";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Stations from "./pages/Stations";
function App() {
  return (
    <>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicules" element={<Vehicules />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
 <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/stations" element={<Stations />} />
      </Routes>
    </>
  );
}

export default App;