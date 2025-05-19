import { useEffect, useState } from "react";
import axios from "../../api/axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("/customers", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setCustomers(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Customers</h2>
      <ul className="space-y-2">
        {customers.map(c => (
          <li key={c._id} className="border p-4 rounded shadow">
            <p><strong>Name:</strong> {c.name}</p>
            <p><strong>Email:</strong> {c.email}</p>
            <p><strong>Phone:</strong> {c.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Customers;
