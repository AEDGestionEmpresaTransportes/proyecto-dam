import React, { useEffect, useState } from "react";
import useConductores from "../../hooks/useConductores";
import FormularioConductor from "./conductor/FormularioConductor";
import "../TablaEstilosMejoradov2.css";

// Estado inicial del formulario
const CONDUCTOR_INICIAL = {
  dni: "",
  nombre: "",
  telefono: "",
  direccion: "",
  salario: "",
  municipio: "",
};

export default function ConductoresTab() {
  // Importa el hook de la lógica de lectura de conductores
  const { conductores, setConductores, isLoading, error, fetchConductores } =
    useConductores();

  const [selectedDni, setSelectedDni] = useState(null); // DNI Seleccionado en la tabla
  //const [showForm, setShowForm] = useState(false); // Se muestra el formulario
  const [muestraFormulario, setMuestraFormulario] = useState(false); // Se muestra el formulario
  //const [formMode, setFormMode] = useState("crear"); // Modo 'crear' o 'editar'
  const [modoFormulario, setModoFormulario] = useState("crear"); // Modo 'crear' o 'editar'
  const [conductor, setConductor] = useState(CONDUCTOR_INICIAL); // Datos del conductor
  const [submitting, setSubmitting] = useState(false); // Está enviando?
  const [successMessage, setSuccessMessage] = useState(null); // Mensaje de éxito

  // VALIDACIONES DEL DNI Y TELEFONO
  // Validar DNI español (formato básico)
  const validarDNI = (dni) => {
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    return dniRegex.test(dni);
  };

  // Validar teléfono
  const validarTelefono = (telefono) => {
    if (!telefono) return true; // Campo opcional
    const telefonoRegex = /^[6-9][0-9]{8}$/;
    return telefonoRegex.test(telefono);
  };

  // --------------- CREATE ---------------
  // Abrir formulario para crear un nuevo conductor
  const handleCreate = () => {
    setModoFormulario("crear"); // Modo del formulario en 'crear'
    setConductor(CONDUCTOR_INICIAL); // Limpia campos
    setMuestraFormulario(true); // Muestra formulario

    // Limpieza de mensajes de error y éxito anteriores
    setError(null);
    setSuccessMessage(null);
  };

  // Abrir formulario para editar
  const handleEdit = () => {
    if (!selectedDni) {
      alert("Selecciona un conductor para editar");
      return;
    }

    const conductorSeleccionado = conductores.find(
      (c) => c.dni === selectedDni
    );
    if (!conductorSeleccionado) return;

    setmodoFormulario("editar");
    setConductor({
      ...conductorSeleccionado,
      municipio:
        conductorSeleccionado.municipio?.nombre ||
        conductorSeleccionado.municipio ||
        "",
    });
    setMuestraFormulario(true);
    setError(null);
    setSuccessMessage(null);
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConductor((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!validarDNI(conductor.dni) && modoFormulario === "crear") {
      alert("DNI inválido. Formato: 12345678A");
      return;
    }

    if (!validarTelefono(conductor.telefono)) {
      alert(
        "Teléfono inválido. Formato: 9 dígitos que empiecen por 6, 7, 8 o 9"
      );
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const url =
        modoFormulario === "crear"
          ? "http://localhost:8080/api/conductores"
          : `http://localhost:8080/api/conductores/${selectedDni}`;

      const method = modoFormulario === "crear" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(conductor),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData || "Error al guardar conductor");
      }

      const resultado = await res.json();

      if (modoFormulario === "crear") {
        setConductores([...conductores, resultado]);
        setSuccessMessage("Conductor creado exitosamente");
      } else {
        setConductores(
          conductores.map((c) => (c.dni === selectedDni ? resultado : c))
        );
        setSuccessMessage("Conductor actualizado exitosamente");
        setSelectedDni(null);
      }

      setMuestraFormulario(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Eliminar conductor
  const handleDelete = async () => {
    if (!selectedDni) {
      alert("Selecciona un conductor para eliminar");
      return;
    }

    const conductorSeleccionado = conductores.find(
      (c) => c.dni === selectedDni
    );
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar a ${
        conductorSeleccionado?.nombre || "este conductor"
      }?`
    );
    if (!confirmDelete) return;

    try {
      setSubmitting(true);
      const res = await fetch(
        `http://localhost:8080/api/conductores/${selectedDni}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Error al eliminar conductor");

      setConductores(conductores.filter((c) => c.dni !== selectedDni));
      setSelectedDni(null);
      setSuccessMessage("Conductor eliminado exitosamente");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Cancelar formulario
  const handleCancel = () => {
    setMuestraFormulario(false);
    setConductor(CONDUCTOR_INICIAL);
    setError(null);
  };

  // MENSAJE DE CARGA
  if (isLoading) {
    return (
      <div className="tabla-container">
        <p className="mensaje-carga">Cargando conductores...</p>
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Conductores</h2>

      {error && <div className="mensaje-error">⚠️ {error}</div>}

      {successMessage && (
        <div className="mensaje-exito">✓ {successMessage}</div>
      )}

      {/* Contenedor de acciones CRUD */}
      <div className="tabla-actions">
        <button onClick={handleCreate} disabled={submitting}>
          ➕ Crear
        </button>
        <button onClick={handleEdit} disabled={!selectedDni || submitting}>
          ✏️ Editar
        </button>
        <button onClick={handleDelete} disabled={!selectedDni || submitting}>
          🗑️ Eliminar
        </button>
      </div>

      {muestraFormulario && (
        <FormularioConductor
          conductor={conductor}
          modoFormulario={modoFormulario}
          submitting={submitting}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}

      {/*}
      {muestraFormulario && (
        <form className="formulario" onSubmit={handleSubmit}>
          <h3>
            {modoFormulario === "crear"
              ? "Nuevo Conductor"
              : "Editar Conductor"}
          </h3>

          <div>
            <label htmlFor="dni">DNI *</label>
            <input
              id="dni"
              name="dni"
              placeholder="12345678A"
              value={conductor.dni}
              onChange={handleChange}
              disabled={modoFormulario === "editar"}
              required
            />
          </div>

          <div>
            <label htmlFor="nombre">Nombre *</label>
            <input
              id="nombre"
              name="nombre"
              placeholder="Nombre completo"
              value={conductor.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              name="telefono"
              placeholder="612345678"
              value={conductor.telefono}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="direccion">Dirección</label>
            <input
              id="direccion"
              name="direccion"
              placeholder="Calle, número, ciudad"
              value={conductor.direccion}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="salario">Salario</label>
            <input
              id="salario"
              name="salario"
              placeholder="1500.00"
              type="number"
              step="0.01"
              min="0"
              value={conductor.salario}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="municipio">Municipio</label>
            <input
              id="municipio"
              name="municipio"
              placeholder="Nombre del municipio"
              value={conductor.municipio}
              onChange={handleChange}
            />
          </div>

          <div className="formulario-botones">
            <button type="submit" disabled={submitting}>
              {submitting ? "Guardando..." : "Guardar"}
            </button>
            <button type="button" onClick={handleCancel} disabled={submitting}>
              Cancelar
            </button>
          </div>
        </form>
      )}
        */}

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
          {conductores.length === 0 ? (
            <tr>
              <td colSpan="6">No hay conductores registrados</td>
            </tr>
          ) : (
            conductores.map((c) => (
              <tr
                key={c.dni}
                onClick={() => setSelectedDni(c.dni)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedDni(c.dni);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-selected={selectedDni === c.dni}
                className={`fila-conductor${
                  selectedDni === c.dni ? " seleccionada" : ""
                }`}
              >
                <td>{c.dni}</td>
                <td>{c.nombre}</td>
                <td>{c.telefono || "-"}</td>
                <td>{c.direccion || "-"}</td>
                <td>
                  {c.salario ? `${parseFloat(c.salario).toFixed(2)} €` : "-"}
                </td>
                <td>{c.municipio?.nombre || c.municipio || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
