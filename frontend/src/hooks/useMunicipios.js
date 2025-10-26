import { useEffect, useState } from "react";
import municipiosAPI from "../services/municipiosAPI";

export default function useMunicipios() {
  const [municipios, setMunicipios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMunicipios = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await municipiosAPI.getAll();
      setMunicipios(data);
    } catch (err) {
      setError(err.message || "Error al cargar municipios");
      console.error("Error al cargar municipios:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMunicipios();
  }, []);

  return {
    municipios,
    setMunicipios,
    isLoading,
    error,
    fetchMunicipios,
  };
}
