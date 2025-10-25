import React, { useEffect, useState } from 'react';
import './TablaEstilos.css';

export default function VehiculosTab() {
  const [vehiculos, setVehiculos] = useState([]);
  const [selectedMatricula, setSelectedMatricula] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    matricula: '',
    modelo: '',
    tipo: '',
    peso: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/vehiculos')
      .then(res => res.json())
      .then(setVehiculos);
  }, []);

  const handleCreate = () => {
    setShowForm(true);
    setNuevoVehiculo({ matricula: '', modelo: '', tipo: '', peso: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/vehiculos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoVehiculo),
    });
    if (res.ok) {
      const creado = await res.json();
      setVehiculos([...vehiculos, creado]);
      setShowForm(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoVehiculo(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    if (!selectedMatricula) return alert('Selecciona un vehículo para editar');
    alert(`Función de edición para matrícula: ${selectedMatricula}`);
  };

  const handleDelete = async () => {
    if (!selectedMatricula) return alert('Selecciona un vehículo para eliminar');
    const confirm = window.confirm('¿Eliminar este vehículo?');
    if (!confirm) return;
    await fetch(`http://localhost:8080/api/vehiculos/${selectedMatricula}`, { method: 'DELETE' });
    setVehiculos(vehiculos.filter(v => v.matricula !== selectedMatricula));
    setSelectedMatricula(null);
  };

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Vehículos</h2>
      <div className="tabla-actions">
        <button onClick={handleCreate}>➕ Crear</button>
        <button onClick={handleEdit}>✏️ Editar</button>
        <button onClick={handleDelete}>🗑️ Eliminar</button>
      </div>

      {showForm && (
        <form className="formulario" onSubmit={handleSubmit}>
          <h3>Nuevo Vehículo</h3>
          <input name="matricula" placeholder="Matrícula" value={nuevoVehiculo.matricula} onChange={handleChange} required />
          <input name="modelo" placeholder="Modelo" value={nuevoVehiculo.modelo} onChange={handleChange} required />
          <input name="tipo" placeholder="Tipo" value={nuevoVehiculo.tipo} onChange={handleChange} />
          <input name="peso" placeholder="Peso" type="number" value={nuevoVehiculo.peso} onChange={handleChange} />
          <div className="formulario-botones">
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}

      <table className="tabla-estilizada">
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Modelo</th>
            <th>Tipo</th>
            <th>Peso</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map(v => (
            <tr
              key={v.matricula}
              onClick={() => setSelectedMatricula(v.matricula)}
              style={{ backgroundColor: selectedMatricula === v.matricula ? '#c8e6c9' : '', cursor: 'pointer' }}
            >
              <td>{v.matricula}</td>
              <td>{v.modelo}</td>
              <td>{v.tipo}</td>
              <td>{v.peso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


