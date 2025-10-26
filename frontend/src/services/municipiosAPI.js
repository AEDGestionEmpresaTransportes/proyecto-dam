const API_URL = "http://localhost:8080/api/municipios";

const getAll = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener municipios");
  return res.json();
};

const getByCodigo = async (codigo) => {
  const res = await fetch(`${API_URL}/${codigo}`);
  if (!res.ok) throw new Error("Error al obtener municipio por código");
  return res.json();
};

const create = async (municipio) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(municipio),
  });
  if (!res.ok) throw new Error("Error al crear municipio");
  return res.json();
};

const update = async (codigo, municipio) => {
  const res = await fetch(`${API_URL}/${codigo}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(municipio),
  });
  if (!res.ok) throw new Error("Error al actualizar municipio");
  return res.json();
};

const remove = async (codigo) => {
  const res = await fetch(`${API_URL}/${codigo}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar municipio");
};

export default { getAll, getByCodigo, create, update, remove };

