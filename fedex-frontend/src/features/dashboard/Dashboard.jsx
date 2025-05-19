import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const role = useSelector((state) => state.auth.user?.role);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">FedEx Logistics Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link to="/items" className="bg-blue-500 text-white p-4 rounded">Manage Items</Link>
        <Link to="/orders" className="bg-green-500 text-white p-4 rounded">Manage Orders</Link>
        <Link to="/customers" className="bg-purple-500 text-white p-4 rounded">Manage Customers</Link>
        <Link to="/vehicles" className="bg-yellow-500 text-white p-4 rounded">Manage Vehicles</Link>
        {role === "admin" && <Link to="/users" className="bg-red-500 text-white p-4 rounded">User Management</Link>}
      </div>
    </div>
  );
};
export default Dashboard;
