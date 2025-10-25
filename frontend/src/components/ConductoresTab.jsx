import React, { useEffect, useState } from 'react';
import './TablaEstilos.css';

export default function ConductoresTab() {
  const [conductores, setConductores] = useState([]);
  const [selectedDni, setSelectedDni] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [nuevoConductor, setNuevoConductor] = useState({
    dni: '',
    nombre: '',
    telefono: '',
    direccion: '',
    salario: '',
    municipio: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/conductores')
      .then(res => res.json())
      .then(setConductores);
  }, []);

  // Crear nuevo conductor
  const handleCreate = () => {
    setShowForm(true);
    setNuevoConductor({
      dni: '',
      nombre: '',
      telefono: '',
      direccion: '',
      salario: '',
      municipio: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/conductores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoConductor),
      });
      if (res.ok) {
        const creado = await res.json();
        setConductores([...conductores, creado]);
        setShowForm(false);
      } else {
        alert('Error al crear conductor');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoConductor(prev => ({ ...prev, [name]: value }));
  };

  // Editar conductor seleccionado
  const handleEdit = () => {
    if (!selectedDni) {
      alert('Selecciona un conductor para editar');
      return;
    }
    alert(`Función de edición para DNI: ${selectedDni}`);
    // Aquí podrías abrir un formulario con los datos del conductor seleccionado
  };

  // Eliminar conductor seleccionado
  const handleDelete = async () => {
    if (!selectedDni) {
      alert('Selecciona un conductor para eliminar');
      return;
    }

    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este conductor?');
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:8080/api/conductores/${selectedDni}`, {
        method: 'DELETE',
      });
      setConductores(prev => prev.filter(c => c.dni !== selectedDni));
      setSelectedDni(null);
    } catch (error) {
      console.error('Error al eliminar conductor:', error);
    }
  };

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Conductores</h2>

      <div className="tabla-actions">
        <button onClick={handleCreate}>➕ Crear</button>
        <button onClick={handleEdit}>✏️ Editar</button>
        <button onClick={handleDelete}>🗑️ Eliminar</button>
      </div>

      {showForm && (
        <form className="formulario" onSubmit={handleSubmit}>
          <h3>Nuevo Conductor</h3>
          <input name="dni" placeholder="DNI" value={nuevoConductor.dni} onChange={handleChange} required />
          <input name="nombre" placeholder="Nombre" value={nuevoConductor.nombre} onChange={handleChange} required />
          <input name="telefono" placeholder="Teléfono" value={nuevoConductor.telefono} onChange={handleChange} />
          <input name="direccion" placeholder="Dirección" value={nuevoConductor.direccion} onChange={handleChange} />
          <input name="salario" placeholder="Salario" type="number" value={nuevoConductor.salario} onChange={handleChange} />
          <input name="municipio" placeholder="Municipio" value={nuevoConductor.municipio} onChange={handleChange} />
          <div className="formulario-botones">
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}

      <table className="tabla-estilizada">
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Salario</th>
            <th>Municipio</th>
          </tr>
        </thead>
        <tbody>
          {conductores.map(c => (
            <tr
              key={c.dni}
              onClick={() => setSelectedDni(c.dni)}
              style={{
                backgroundColor: selectedDni === c.dni ? '#c8e6c9' : '',
                cursor: 'pointer',
              }}
            >
              <td>{c.dni}</td>
              <td>{c.nombre}</td>
              <td>{c.telefono}</td>
              <td>{c.direccion}</td>
              <td>{c.salario}</td>
              <td>{c.municipio?.nombre || c.municipio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}