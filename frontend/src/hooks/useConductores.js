import { useEffect, useState } from "react";
import conductoresAPI from "../services/conductoresAPI"; // Importa API con las operaciones CRUD

export default function useConductores() {
  const [conductores, setConductores] = useState([]); // Lista de conductores cargados desde el backend
  const [isLoading, setIsLoading] = useState(true); // Esta cargando?
  const [error, setError] = useState(null); // Mensaje de error si algo falla

  // Petición GET para obtener conductores
  const fetchConductores = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await conductoresAPI.getAll(); // Llama a la función getAll()
      setConductores(data); // Actualiza la lista
    } catch (err) {
      setError(err.message || "Error al cargar conductores");
      console.error("Error al cargar conductores:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Se ejecuta al montar el componente
  useEffect(() => {
    fetchConductores();
  }, []);

  // Devuelve estado y funciones para que el componente los use
  return {
    conductores,
    setConductores,
    isLoading,
    error,
    fetchConductores,
  };
}
