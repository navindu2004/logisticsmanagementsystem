import { useEffect, useState } from "react";
import axios from "../../api/axios";

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("/items", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setItems(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Items</h2>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item._id} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{item.name}</h3>
            <p>{item.description}</p>
            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Items;