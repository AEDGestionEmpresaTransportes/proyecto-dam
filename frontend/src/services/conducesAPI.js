const API_URL = "http://localhost:8080/api/conduces";

const getAll = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener asignaciones de conducción");
  return res.json();
};

const getById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener asignación por ID");
  return res.json();
};

const create = async (conduce) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(conduce),
  });
  if (!res.ok) throw new Error("Error al crear asignación");
  return res.json();
};

const update = async (id, conduce) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(conduce),
  });
  if (!res.ok) throw new Error("Error al actualizar asignación");
  return res.json();
};

const remove = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar asignación");
};

export default { getAll, getById, create, update, remove };
