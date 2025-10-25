import React, { useEffect, useState } from 'react';
import './TablaEstilos.css';

export default function MunicipiosTab() {
  const [municipios, setMunicipios] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [nuevoMunicipio, setNuevoMunicipio] = useState({
    nombre: '',
    provincia: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/municipios')
      .then(res => res.json())
      .then(setMunicipios);
  }, []);

  const handleCreate = () => {
    setShowForm(true);
    setNuevoMunicipio({ nombre: '', provincia: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/municipios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoMunicipio),
    });
    if (res.ok) {
      const creado = await res.json();
      setMunicipios([...municipios, creado]);
      setShowForm(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoMunicipio(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    if (!selectedId) return alert('Selecciona un municipio para editar');
    alert(`Función de edición para ID: ${selectedId}`);
  };

  const handleDelete = async () => {
    if (!selectedId) return alert('Selecciona un municipio para eliminar');
    const confirm = window.confirm('¿Eliminar este municipio?');
    if (!confirm) return;
    await fetch(`http://localhost:8080/api/municipios/${selectedId}`, { method: 'DELETE' });
    setMunicipios(municipios.filter(m => m.id !== selectedId));
    setSelectedId(null);
  };

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Municipios</h2>
      <div className="tabla-actions">
        <button onClick={handleCreate}>➕ Crear</button>
        <button onClick={handleEdit}>✏️ Editar</button>
        <button onClick={handleDelete}>🗑️ Eliminar</button>
      </div>

      {showForm && (
        <form className="formulario" onSubmit={handleSubmit}>
          <h3>Nuevo Municipio</h3>
          <input name="nombre" placeholder="Nombre" value={nuevoMunicipio.nombre} onChange={handleChange} required />
          <input name="provincia" placeholder="Provincia" value={nuevoMunicipio.provincia} onChange={handleChange} required />
          <div className="formulario-botones">
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}

      <table className="tabla-estilizada">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Provincia</th>
          </tr>
        </thead>
        <tbody>
          {municipios.map(m => (
            <tr
              key={m.id}
              onClick={() => setSelectedId(m.id)}
              style={{ backgroundColor: selectedId === m.id ? '#c8e6c9' : '', cursor: 'pointer' }}
            >
              <td>{m.id}</td>
              <td>{m.nombre}</td>
              <td>{m.provincia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


