import React, { useEffect, useState } from 'react';
import './TablaEstilos.css';

export default function ConduceTab() {
  const [conduces, setConduces] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    conductorDni: '',
    vehiculoMatricula: '',
    fecha: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/conduces')
      .then(res => res.json())
      .then(setConduces);
  }, []);

  const handleCreate = () => {
    setShowForm(true);
    setNuevoRegistro({ conductorDni: '', vehiculoMatricula: '', fecha: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/conduces', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoRegistro),
    });
    if (res.ok) {
      const creado = await res.json();
      setConduces([...conduces, creado]);
      setShowForm(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoRegistro(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    if (selectedIndex === null) return alert('Selecciona un registro para editar');
    alert('Función de edición no implementada aún');
  };

  const handleDelete = async () => {
    if (selectedIndex === null) return alert('Selecciona un registro para eliminar');
    const registro = conduces[selectedIndex];
    const confirm = window.confirm('¿Eliminar este registro?');
    if (!confirm) return;
    await fetch(`http://localhost:8080/api/conduces/${registro.id}`, { method: 'DELETE' });
    setConduces(conduces.filter((_, i) => i !== selectedIndex));
    setSelectedIndex(null);
  };

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Conduce</h2>
      <div className="tabla-actions">
        <button onClick={handleCreate}>➕ Crear</button>
        <button onClick={handleEdit}>✏️ Editar</button>
        <button onClick={handleDelete}>🗑️ Eliminar</button>
      </div>

      {showForm && (
        <form className="formulario" onSubmit={handleSubmit}>
          <h3>Nuevo Registro</h3>
          <input name="conductorDni" placeholder="DNI del Conductor" value={nuevoRegistro.conductorDni} onChange={handleChange} required />
          <input name="vehiculoMatricula" placeholder="Matrícula del Vehículo" value={nuevoRegistro.vehiculoMatricula} onChange={handleChange} required />
          <input name="fecha" type="date" value={nuevoRegistro.fecha} onChange={handleChange} required />
          <div className="formulario-botones">
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}

      <table className="tabla-estilizada">
        <thead>
          <tr>
            <th>Conductor</th>
            <th>Vehículo</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {conduces.map((c, i) => (
            <tr
              key={i}
              onClick={() => setSelectedIndex(i)}
              style={{ backgroundColor: selectedIndex === i ? '#c8e6c9' : '', cursor: 'pointer' }}
            >
              <td>{c.conductor?.nombre || c.conductorDni}</td>
              <td>{c.vehiculo?.matricula || c.vehiculoMatricula}</td>
              <td>{c.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

