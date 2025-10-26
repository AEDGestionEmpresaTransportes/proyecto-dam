const API_URL = "http://localhost:8080/api/paquetes";

const getAll = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener paquetes");
  return res.json();
};

const getByCodigo = async (codigo) => {
  const res = await fetch(`${API_URL}/${codigo}`);
  if (!res.ok) throw new Error("Error al obtener paquete por código");
  return res.json();
};

const create = async (paquete) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paquete),
  });
  if (!res.ok) throw new Error("Error al crear paquete");
  return res.json();
};

const update = async (codigo, paquete) => {
  const res = await fetch(`${API_URL}/${codigo}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paquete),
  });
  if (!res.ok) throw new Error("Error al actualizar paquete");
  return res.json();
};

const remove = async (codigo) => {
  const res = await fetch(`${API_URL}/${codigo}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar paquete");
};

export default { getAll, getByCodigo, create, update, remove };
