import React, { useEffect, useState } from 'react';
import './TablaEstilos.css';

export default function PaquetesTab() {
  const [paquetes, setPaquetes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [nuevoPaquete, setNuevoPaquete] = useState({
    descripcion: '',
    peso: '',
    destino: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/paquetes')
      .then(res => res.json())
      .then(setPaquetes);
  }, []);

  const handleCreate = () => {
    setShowForm(true);
    setNuevoPaquete({ descripcion: '', peso: '', destino: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/paquetes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoPaquete),
    });
    if (res.ok) {
      const creado = await res.json();
      setPaquetes([...paquetes, creado]);
      setShowForm(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoPaquete(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    if (!selectedId) return alert('Selecciona un paquete para editar');
    alert(`Función de edición para ID: ${selectedId}`);
  };

  const handleDelete = async () => {
    if (!selectedId) return alert('Selecciona un paquete para eliminar');
    const confirm = window.confirm('¿Eliminar este paquete?');
    if (!confirm) return;
    await fetch(`http://localhost:8080/api/paquetes/${selectedId}`, { method: 'DELETE' });
    setPaquetes(paquetes.filter(p => p.id !== selectedId));
    setSelectedId(null);
  };

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Paquetes</h2>
      <div className="tabla-actions">
        <button onClick={handleCreate}>➕ Crear</button>
        <button onClick={handleEdit}>✏️ Editar</button>
        <button onClick={handleDelete}>🗑️ Eliminar</button>
      </div>

      {showForm && (
        <form className="formulario" onSubmit={handleSubmit}>
          <h3>Nuevo Paquete</h3>
          <input name="descripcion" placeholder="Descripción" value={nuevoPaquete.descripcion} onChange={handleChange} required />
          <input name="peso" placeholder="Peso" type="number" value={nuevoPaquete.peso} onChange={handleChange} required />
          <input name="destino" placeholder="Destino" value={nuevoPaquete.destino} onChange={handleChange} required />
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
            <th>Descripción</th>
            <th>Peso</th>
            <th>Destino</th>
          </tr>
        </thead>
        <tbody>
          {paquetes.map(p => (
            <tr
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              style={{ backgroundColor: selectedId === p.id ? '#c8e6c9' : '', cursor: 'pointer' }}
            >
              <td>{p.id}</td>
              <td>{p.descripcion}</td>
              <td>{p.peso}</td>
              <td>{p.destino}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
