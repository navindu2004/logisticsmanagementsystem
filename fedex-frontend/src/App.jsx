import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "/features/auth/Login";
import Register from "./features/auth/Register";
import Dashboard from "./features/dashboard/Dashboard";
import Items from "./features/items/Items";
import Orders from "./features/orders/Orders";
import Customers from "./features/customers/Customers";
import Vehicles from "./features/vehicles/Vehicles";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateOrder from "./features/orders/CreateOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        <Route path="/vehicles" element={<ProtectedRoute><Vehicles /></ProtectedRoute>} />
        <Route path="\/orders/new\" element={<ProtectedRoute><CreateOrder /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
export default App;
