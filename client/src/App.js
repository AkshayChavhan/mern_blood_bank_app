import './App.css';
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Donar from "./pages/Dashboard/Donar";
import Hospitals from "./pages/Dashboard/Hospitals";
import OrganisationPage from './pages/Dashboard/OrganisationPage';



function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute><Homepage /> </ProtectedRoute>} />

        <Route path="/donar" element={
          <ProtectedRoute><Donar /> </ProtectedRoute>} />

        <Route path="/hospital" element={
          <ProtectedRoute><Hospitals /> </ProtectedRoute>} />

        <Route path="/organisation" element={
          <ProtectedRoute><OrganisationPage /> </ProtectedRoute>} />

        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Routes>
    </>
  );
}

export default App;
