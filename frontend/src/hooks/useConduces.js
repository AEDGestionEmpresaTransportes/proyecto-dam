import { useEffect, useState } from "react";
import conducesAPI from "../services/conducesAPI";

export default function useConduces() {
  const [conduces, setConduces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConduces = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await conducesAPI.getAll();
      setConduces(data);
    } catch (err) {
      setError(err.message || "Error al cargar asignaciones de conducción");
      console.error("Error al cargar asignaciones:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConduces();
  }, []);

  return {
    conduces,
    setConduces,
    isLoading,
    error,
    fetchConduces,
  };
}
