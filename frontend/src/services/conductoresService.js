const API_URL = 'http://localhost:8080/api/conductores';

const getAll = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

const getByDni = async (dni) => {
  const res = await fetch(`${API_URL}/${dni}`);
  return res.json();
};

const create = async (conductor) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(conductor),
  });
  return res.json();
};

const update = async (dni, conductor) => {
  const res = await fetch(`${API_URL}/${dni}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(conductor),
  });
  return res.json();
};

const remove = async (dni) => {
  await fetch(`${API_URL}/${dni}`, { method: 'DELETE' });
};

export default { getAll, getByDni, create, update, remove };