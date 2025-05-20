import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

const TrackOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrder(res.data);
      } catch (err) {
        setError("Order not found or unauthorized");
      }
    };
    fetchOrder();
  }, [id]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">Tracking Order: #{order._id}</h2>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Customer:</strong> {order.customerId?.name}</p>
      <p><strong>Item:</strong> {order.itemId?.name}</p>
      <p><strong>Delivery Class:</strong> {order.deliveryClass}</p>
      <p><strong>Weight:</strong> {order.weight} kg</p>

      <h3 className="mt-6 text-lg font-semibold">Status History</h3>
      <ul className="mt-2 space-y-1">
        {order.statusLog.map((log, idx) => (
          <li key={idx} className="text-sm text-gray-700">
            {new Date(log.timestamp).toLocaleString()} → {log.status.toUpperCase()}
          </li>
        ))}
        {order.vehicleId && (
  <div className="mt-6">
    <h3 className="font-semibold mb-2">Vehicle Location</h3>
    <VehicleMap vehicleId={order.vehicleId._id} />
  </div>
)}

      </ul>
    </div>
  );
};
export default TrackOrder;