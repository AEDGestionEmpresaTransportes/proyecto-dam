const API_URL = 'http://localhost:8080/api/vehiculos';

const getAll = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

const getByMatricula = async (matricula) => {
  const res = await fetch(`${API_URL}/${matricula}`);
  return res.json();
};

const create = async (vehiculo) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehiculo),
  });
  return res.json();
};

const update = async (matricula, vehiculo) => {
  const res = await fetch(`${API_URL}/${matricula}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehiculo),
  });
  return res.json();
};

const remove = async (matricula) => {
  await fetch(`${API_URL}/${matricula}`, { method: 'DELETE' });
};

export default { getAll, getByMatricula, create, update, remove };