const API_URL = 'http://localhost:8080/api/municipios';

const getAll = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

const getByCodigo = async (codigo) => {
  const res = await fetch(`${API_URL}/${codigo}`);
  return res.json();
};

const create = async (municipio) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(municipio),
  });
  return res.json();
};

const update = async (codigo, municipio) => {
  const res = await fetch(`${API_URL}/${codigo}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(municipio),
  });
  return res.json();
};

const remove = async (codigo) => {
  await fetch(`${API_URL}/${codigo}`, { method: 'DELETE' });
};

export default { getAll, getByCodigo, create, update, remove };
