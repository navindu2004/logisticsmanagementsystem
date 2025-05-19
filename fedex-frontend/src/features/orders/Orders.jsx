import { useEffect, useState } from "react";
import axios from "../../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      <ul className="space-y-2">
        {orders.map(order => (
          <li key={order._id} className="border p-4 rounded shadow">
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Customer:</strong> {order.customerId?.name}</p>
            <p><strong>Item:</strong> {order.itemId?.name}</p>
            <p><strong>Vehicle:</strong> {order.vehicleId?.registrationNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Orders;