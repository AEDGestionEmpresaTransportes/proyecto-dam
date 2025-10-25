// URL base de la API REST para conductores
const API_URL = "http://localhost:8080/api/conductores";

// Obtener todos los conductores (READ)
const getAll = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener conductores");
  return res.json();
};

// Obtener un conductor por DNI (READ individual)
const getByDni = async (dni) => {
  const res = await fetch(`${API_URL}/${dni}`);
  if (!res.ok) throw new Error("Error al obtener conductor por DNI");
  return res.json();
};

// Crear un nuevo conductor (CREATE)
const create = async (conductor) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(conductor),
  });
  if (!res.ok) throw new Error("Error al crear conductor");
  return res.json();
};

// Actualizar un conductor existente (UPDATE)
const update = async (dni, conductor) => {
  const res = await fetch(`${API_URL}/${dni}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(conductor),
  });
  if (!res.ok) throw new Error("Error al actualizar conductor");
  return res.json();
};

// Eliminar un conductor por DNI (DELETE)
const remove = async (dni) => {
  const res = await fetch(`${API_URL}/${dni}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar conductor");
};

// Exporta todas las funciones como un objeto para uso externo
export default { getAll, getByDni, create, update, remove };
