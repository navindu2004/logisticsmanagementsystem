import { useEffect, useState } from "react";
import axios from "../../api/axios";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get("/delivery-vehicles", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setVehicles(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Vehicles</h2>
      <ul className="space-y-2">
        {vehicles.map(v => (
          <li key={v._id} className="border p-4 rounded shadow">
            <p><strong>Registration:</strong> {v.registrationNumber}</p>
            <p><strong>Driver:</strong> {v.driver}</p>
            <p><strong>Capacity:</strong> {v.capacity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Vehicles;