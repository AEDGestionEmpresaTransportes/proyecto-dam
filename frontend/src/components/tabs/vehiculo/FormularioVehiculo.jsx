import { useState } from "react";
import { validarMatricula } from "../../../utils/validaciones";
import { MENSAJES } from "../../../utils/mensajes";
import "../../comunes/formularioBase.css";

export default function FormularioVehiculo({
  vehiculo,
  modoFormulario,
  submitting,
  handleChange,
  handleSubmit,
  handleCancel,
}) {
  const [errores, setErrores] = useState({});

  const validarCampos = () => {
    const nuevosErrores = {};

    // Usamos validaciones.js
    if (!validarMatricula(vehiculo.matricula) && modoFormulario === "crear") {
      nuevosErrores.matricula = MENSAJES.errorMatricula;
    }

    if (!vehiculo.modelo || vehiculo.modelo.trim() === "") {
      nuevosErrores.modelo = "El modelo es obligatorio";
    }

    if (!vehiculo.tipo || vehiculo.tipo.trim() === "") {
      nuevosErrores.tipo = "El tipo es obligatorio";
    }

    if (!vehiculo.potencia || isNaN(vehiculo.potencia)) {
      nuevosErrores.potencia = "La potencia debe ser un número";
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
      <h3>
        {modoFormulario === "crear" ? "Nuevo Vehículo" : "Editar Vehículo"}
      </h3>

      <div>
        <label htmlFor="matricula">Matrícula *</label>
        <input
          id="matricula"
          name="matricula"
          placeholder="Ej. 1234ABC"
          value={vehiculo.matricula}
          onChange={handleChange}
          disabled={modoFormulario === "editar"}
          required
        />
        {errores.matricula && <p className="error">{errores.matricula}</p>}
      </div>

      <div>
        <label htmlFor="modelo">Modelo *</label>
        <input
          id="modelo"
          name="modelo"
          placeholder="Ej. Polo"
          value={vehiculo.modelo}
          onChange={handleChange}
          required
        />
        {errores.modelo && <p className="error">{errores.modelo}</p>}
      </div>

      <div>
        <label htmlFor="tipo">Tipo *</label>
        <input
          id="tipo"
          name="tipo"
          placeholder="Ej. Turismo"
          value={vehiculo.tipo}
          onChange={handleChange}
          required
        />
        {errores.tipo && <p className="error">{errores.tipo}</p>}
      </div>

      <div>
        <label htmlFor="potencia">Potencia (CV) *</label>
        <input
          id="potencia"
          name="potencia"
          type="number"
          placeholder="Ej. 95"
          value={vehiculo.potencia}
          onChange={handleChange}
          required
        />
        {errores.potencia && <p className="error">{errores.potencia}</p>}
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
