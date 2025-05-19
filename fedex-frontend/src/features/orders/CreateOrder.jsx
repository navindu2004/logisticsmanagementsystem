import { useState, useEffect } from "react";
import axios from "../../api/axios";

const CreateOrder = () => {
  const [form, setForm] = useState({
    customerId: "", itemId: "", vehicleId: "",
    weight: "", dimensions: { length: "", width: "", height: "" },
    deliveryClass: "standard"
  });
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("/customers", { headers: { Authorization: `Bearer ${token}` }}).then(res => setCustomers(res.data));
    axios.get("/items", { headers: { Authorization: `Bearer ${token}` }}).then(res => setItems(res.data));
    axios.get("/delivery-vehicles", { headers: { Authorization: `Bearer ${token}` }}).then(res => setVehicles(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("/orders", form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Order created!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow space-y-4">
      <select name="customerId" onChange={e => setForm({ ...form, customerId: e.target.value })}>
        <option>Select Customer</option>
        {customers.map(c => <option value={c._id} key={c._id}>{c.name}</option>)}
      </select>
      <select name="itemId" onChange={e => setForm({ ...form, itemId: e.target.value })}>
        <option>Select Item</option>
        {items.map(i => <option value={i._id} key={i._id}>{i.name}</option>)}
      </select>
      <select name="vehicleId" onChange={e => setForm({ ...form, vehicleId: e.target.value })}>
        <option>Select Vehicle</option>
        {vehicles.map(v => <option value={v._id} key={v._id}>{v.registrationNumber}</option>)}
      </select>
      <input type="number" placeholder="Weight (kg)" onChange={e => setForm({ ...form, weight: e.target.value })} />
      <input type="text" placeholder="Length" onChange={e => setForm({ ...form, dimensions: { ...form.dimensions, length: e.target.value } })} />
      <input type="text" placeholder="Width" onChange={e => setForm({ ...form, dimensions: { ...form.dimensions, width: e.target.value } })} />
      <input type="text" placeholder="Height" onChange={e => setForm({ ...form, dimensions: { ...form.dimensions, height: e.target.value } })} />
      <select onChange={e => setForm({ ...form, deliveryClass: e.target.value })}>
        <option value="\standard\">Standard</option>
        <option value="\express\">Express</option>
      </select>
      <button type="\submit\" className="\bg-green-500 text-white px-4 py-2\">Place Order</button>
    </form>
  );
};
export default CreateOrder;
