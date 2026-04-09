import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Vehicules from "./pages/Vehicules";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicules" element={<Vehicules />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;