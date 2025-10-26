import { useEffect, useState } from "react";
import VehiculosAPI from "../services/VehiculosAPI.JS";

export default function useVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);       // Lista de vehículos cargados desde el backend
  const [isLoading, setIsLoading] = useState(true);     // Estado de carga
  const [error, setError] = useState(null);             // Mensaje de error si algo falla

  // Petición GET para obtener vehículos
  const fetchVehiculos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await VehiculosAPI.getAll();         // Uso correcto del nombre importado
      setVehiculos(data);
    } catch (err) {
      setError(err.message || "Error al cargar vehículos");
      console.error("Error al cargar vehículos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Se ejecuta al montar el componente
  useEffect(() => {
    fetchVehiculos();
  }, []);

  // Devuelve estado y funciones para que el componente los use
  return {
    vehiculos,
    setVehiculos,
    isLoading,
    error,
    fetchVehiculos,
  };
}
