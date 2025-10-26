import { useState } from "react";
import "../../comunes/formularioBase.css";

export default function FormularioConduce({
  conduce,
  submitting,
  conductores,
  vehiculos,
  handleChange,
  handleSubmit,
  handleCancel,
}) {
  const [errores, setErrores] = useState({});

  const validarCampos = () => {
    const nuevosErrores = {};

    if (!conduce.conductor?.dni?.trim()) {
      nuevosErrores["conductor.dni"] = "El DNI del conductor es obligatorio";
    }

    if (!conduce.vehiculo?.matricula?.trim()) {
      nuevosErrores["vehiculo.matricula"] =
        "La matrícula del vehículo es obligatoria";
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
      <h3>Nueva Asignación</h3>

      {/* Datos del conductor */}
      <fieldset>
        <legend>Conductor</legend>

        <div>
          <label htmlFor="conductor.dni">DNI *</label>
          <select
            id="conductor.dni"
            name="conductor.dni"
            value={conduce.conductor?.dni || ""}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecciona un conductor --</option>
            {conductores.map((c) => (
              <option key={c.dni} value={c.dni}>
                {c.nombre} ({c.dni})
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* Datos del vehículo */}
      <fieldset>
        <legend>Vehículo</legend>

        <div>
          <label htmlFor="vehiculo.matricula">Matrícula *</label>
          <select
            id="vehiculo.matricula"
            name="vehiculo.matricula"
            value={conduce.vehiculo?.matricula || ""}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecciona un vehículo --</option>
            {vehiculos.map((v) => (
              <option key={v.matricula} value={v.matricula}>
                {v.modelo} ({v.matricula})
              </option>
            ))}
          </select>
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
