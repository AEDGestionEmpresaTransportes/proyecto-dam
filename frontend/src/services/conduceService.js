const API_URL = 'http://localhost:8080/api/conduces';

const getAll = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

const create = async (conduce) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(conduce),
  });
  return res.json();
};

export default { getAll, create };