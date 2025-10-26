import { useState } from "react";
import "../../comunes/formularioBase.css";

export default function FormularioConduce({
  conduce,
  modoFormulario,
  submitting,
  handleChange,
  handleSubmit,
  handleCancel,
}) {
  const [errores, setErrores] = useState({});

  const validarCampos = () => {
    const nuevosErrores = {};

    // Validaciones básicas
    if (!conduce.conductor?.dni?.trim()) {
      nuevosErrores["conductor.dni"] = "El DNI del conductor es obligatorio";
    }

    if (!conduce.conductor?.nombre?.trim()) {
      nuevosErrores["conductor.nombre"] = "El nombre del conductor es obligatorio";
    }

    if (!conduce.vehiculo?.matricula?.trim()) {
      nuevosErrores["vehiculo.matricula"] = "La matrícula del vehículo es obligatoria";
    }

    if (!conduce.vehiculo?.modelo?.trim()) {
      nuevosErrores["vehiculo.modelo"] = "El modelo del vehículo es obligatorio";
    }

    if (!conduce.fecha?.trim()) {
      nuevosErrores.fecha = "La fecha de asignación es obligatoria";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    if (!validarCampos()) return;
    handleSubmit(e);
  };

  return (
    <form className="formulario" onSubmit={handleLocalSubmit}>
      <h3>{modoFormulario === "crear" ? "Nueva Asignación" : "Editar Asignación"}</h3>

      {/* Datos del conductor */}
      <fieldset>
        <legend>Conductor</legend>

        <div>
          <label htmlFor="conductor.dni">DNI *</label>
          <input
            id="conductor.dni"
            name="conductor.dni"
            value={conduce.conductor.dni}
            onChange={handleChange}
            disabled={modoFormulario === "editar"}
            required
          />
          {errores["conductor.dni"] && <p className="error">{errores["conductor.dni"]}</p>}
        </div>

        <div>
          <label htmlFor="conductor.nombre">Nombre *</label>
          <input
            id="conductor.nombre"
            name="conductor.nombre"
            value={conduce.conductor.nombre}
            onChange={handleChange}
            required
          />
          {errores["conductor.nombre"] && <p className="error">{errores["conductor.nombre"]}</p>}
        </div>
      </fieldset>

      {/* Datos del vehículo */}
      <fieldset>
        <legend>Vehículo</legend>

        <div>
          <label htmlFor="vehiculo.matricula">Matrícula *</label>
          <input
            id="vehiculo.matricula"
            name="vehiculo.matricula"
            value={conduce.vehiculo.matricula}
            onChange={handleChange}
            required
          />
          {errores["vehiculo.matricula"] && <p className="error">{errores["vehiculo.matricula"]}</p>}
        </div>

        <div>
          <label htmlFor="vehiculo.modelo">Modelo *</label>
          <input
            id="vehiculo.modelo"
            name="vehiculo.modelo"
            value={conduce.vehiculo.modelo}
            onChange={handleChange}
            required
          />
          {errores["vehiculo.modelo"] && <p className="error">{errores["vehiculo.modelo"]}</p>}
        </div>
      </fieldset>

      {/* Fecha */}
      <div>
        <label htmlFor="fecha">Fecha *</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={conduce.fecha}
          onChange={handleChange}
          required
        />
        {errores.fecha && <p className="error">{errores.fecha}</p>}
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
  );
}
