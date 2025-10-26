import { useEffect, useState } from "react";

export default function useMunicipios() {
  const [municipios, setMunicipios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch("http://localhost:8080/api/municipios");
        if (!res.ok) throw new Error("Error al cargar municipios");
        const data = await res.json();
        setMunicipios(data);
      } catch (err) {
        setError(err.message);
        console.error("Error al cargar municipios:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMunicipios();
  }, []);

  return { municipios, setMunicipios, isLoading, error };
}
