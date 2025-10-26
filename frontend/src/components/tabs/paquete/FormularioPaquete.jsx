import { useState } from "react";
import "../../comunes/formularioBase.css";

export default function FormularioPaquete({
  paquete,
  modoFormulario,
  submitting,
  municipios,
  conductores,
  handleChange,
  handleSubmitPaquete,
  handleCancel,
}) {
  const [errores, setErrores] = useState({});

  const validarCampos = () => {
    const nuevosErrores = {};

    if (modoFormulario === "editar" && !paquete.codigo) {
      nuevosErrores.codigo = "El código es obligatorio";
    }

    if (!paquete.descripcion || paquete.descripcion.trim() === "") {
      nuevosErrores.descripcion = "La descripción es obligatoria";
    }

    if (!paquete.destinatario || paquete.destinatario.trim() === "") {
      nuevosErrores.destinatario = "El destinatario es obligatorio";
    }

    if (!paquete.direccion || paquete.direccion.trim() === "") {
      nuevosErrores.direccion = "La dirección es obligatoria";
    }

    if (!paquete.municipioDestino) {
      nuevosErrores.municipioDestino = "El municipio de destino es obligatorio";
    }

    if (!paquete.conductor) {
      nuevosErrores.conductor = "El conductor es obligatorio";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    handleSubmitPaquete(paquete);
  };

  return (
    <form className="formulario" onSubmit={handleLocalSubmit}>
      <h3>{modoFormulario === "crear" ? "Nuevo Paquete" : "Editar Paquete"}</h3>
      <div>
        <label htmlFor="codigo">Código</label>
        <input
          id="codigo"
          name="codigo"
          value={paquete.codigo || ""}
          readOnly
        />
      </div>

      <div>
        <label htmlFor="descripcion">Descripción *</label>
        <input
          id="descripcion"
          name="descripcion"
          placeholder="Descripción del paquete"
          value={paquete.descripcion}
          onChange={handleChange}
          required
        />
        {errores.descripcion && <p className="error">{errores.descripcion}</p>}
      </div>

      <div>
        <label htmlFor="destinatario">Destinatario *</label>
        <input
          id="destinatario"
          name="destinatario"
          placeholder="Nombre del destinatario"
          value={paquete.destinatario}
          onChange={handleChange}
          required
        />
        {errores.destinatario && (
          <p className="error">{errores.destinatario}</p>
        )}
      </div>

      <div>
        <label htmlFor="direccion">Dirección *</label>
        <input
          id="direccion"
          name="direccion"
          placeholder="Dirección de entrega"
          value={paquete.direccion}
          onChange={handleChange}
          required
        />
        {errores.direccion && <p className="error">{errores.direccion}</p>}
      </div>

      <div>
        <label htmlFor="municipioDestino">Municipio de destino *</label>
        <select
          id="municipioDestino"
          name="municipioDestino"
          value={paquete.municipioDestino}
          onChange={handleChange}
          required
        >
          <option value="">-- Selecciona un municipio --</option>
          {municipios.map((m) => (
            <option key={m.codigo} value={m.codigo}>
              {m.nombre}
            </option>
          ))}
        </select>
        {errores.municipioDestino && (
          <p className="error">{errores.municipioDestino}</p>
        )}
      </div>

      <div>
        <label htmlFor="conductor">Conductor *</label>
        <select
          id="conductor"
          name="conductor"
          value={paquete.conductor}
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
        {errores.conductor && <p className="error">{errores.conductor}</p>}
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
