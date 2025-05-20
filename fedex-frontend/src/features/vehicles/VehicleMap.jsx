import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "../../api/axios";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const VehicleMap = ({ vehicleId }) => {
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/delivery-vehicles/${vehicleId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVehicle(res.data);
    };
    fetchVehicle();
  }, [vehicleId]);

  useEffect(() => {
    if (vehicle?.location) {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [vehicle.location.lng, vehicle.location.lat],
        zoom: 12
      });

      new mapboxgl.Marker()
        .setLngLat([vehicle.location.lng, vehicle.location.lat])
        .addTo(map);
    }
  }, [vehicle]);

  return <div id="map" className="h-96 w-full rounded shadow" />;
};

export default VehicleMap;
