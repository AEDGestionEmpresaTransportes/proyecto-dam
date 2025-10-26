import { useState } from "react";
import { validarDNI, validarTelefono } from "../../../utils/validaciones";
import { MENSAJES } from "../../../utils/mensajes";
import "../../comunes/formularioBase.css";

export default function FormularioConductor({
  conductor,
  modoFormulario,
  submitting,
  municipios = [],
  handleChange,
  handleSubmit,
  handleCancel,
}) {
  const [errores, setErrores] = useState({});

  const validarCampos = () => {
    const nuevosErrores = {};

    if (!validarDNI(conductor.dni) && modoFormulario === "crear") {
      nuevosErrores.dni = MENSAJES.errorDNI;
    }

    if (!validarTelefono(conductor.telefono)) {
      nuevosErrores.telefono = MENSAJES.errorTelefono;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault(); // evita que el formulario se envíe automáticamente
    if (!validarCampos()) return; // si hay errores, no continúa
    handleSubmit(e); // si todo está bien, llama al padre
  };

  return (
    <form className="formulario" onSubmit={handleLocalSubmit}>
      <h3>
        {modoFormulario === "crear" ? "Nuevo Conductor" : "Editar Conductor"}
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
        {errores.dni && <p className="error">{errores.dni}</p>}
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
        {errores.telefono && <p className="error">{errores.telefono}</p>}
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
        <select
          id="municipio"
          name="municipio"
          value={conductor.municipio}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona municipio</option>
          {/* Mapea los municipios dinámicamente */}
          {municipios.map((m) => (
            <option key={m.codigo} value={m.codigo}>
              {m.nombre}
            </option>
          ))}
        </select>
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
