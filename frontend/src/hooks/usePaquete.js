import { useEffect, useState } from "react";
import paqueteAPI from "../services/paqueteAPI.js"; // Importa API con las operaciones CRUD

export default function usePaquete() {
  const [paquetes, setPaquetes] = useState([]); // Lista de paquetes cargados desde el backend
  const [isLoading, setIsLoading] = useState(true); // ¿Está cargando?
  const [error, setError] = useState(null); // Mensaje de error si algo falla

  // Petición GET para obtener paquetes
  const fetchPaquetes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await paqueteAPI.getAll(); // Llama a la función getAll()
      setPaquetes(data); // Actualiza la lista
    } catch (err) {
      setError(err.message || "Error al cargar paquetes");
      console.error("Error al cargar paquetes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Se ejecuta al montar el componente
  useEffect(() => {
    fetchPaquetes();
  }, []);

  // Devuelve estado y funciones para que el componente los use
  return {
    paquetes,
    setPaquetes,
    isLoading,
    error,
    fetchPaquetes,
  };
}
