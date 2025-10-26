const API_URL = "http://localhost:8080/api/vehiculos";

const getAll = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener vehículos");
  return res.json();
};

const getByMatricula = async (matricula) => {
  const res = await fetch(`${API_URL}/${matricula}`);
  if (!res.ok) throw new Error("Error al obtener vehículo por matrícula");
  return res.json();
};

const create = async (vehiculo) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehiculo),
  });
  if (!res.ok) throw new Error("Error al crear vehículo");
  return res.json();
};

const update = async (matricula, vehiculo) => {
  const res = await fetch(`${API_URL}/${matricula}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehiculo),
  });
  if (!res.ok) throw new Error("Error al actualizar vehículo");
  return res.json();
};

const remove = async (matricula) => {
  const res = await fetch(`${API_URL}/${matricula}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar vehículo");
};

export default { getAll, getByMatricula, create, update, remove };
