import { useState } from "react";
import { validarCodigoPostal } from "../../../utils/validaciones";
import { MENSAJES } from "../../../utils/mensajes";
import "../../comunes/formularioBase.css";

export default function FormularioMunicipio({
  municipio,
  modoFormulario,
  submitting,
  handleChange,
  handleSubmit,
  handleCancel,
}) {
  const [errores, setErrores] = useState({});

  const validarCampos = () => {
    const nuevosErrores = {};

    if (!validarCodigoPostal(municipio.codigo) && modoFormulario === "crear") {
      nuevosErrores.codigo = MENSAJES.errorCodigoPostal;
    }

    if (!municipio.nombre || municipio.nombre.trim() === "") {
      nuevosErrores.nombre = "El nombre es obligatorio";
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
        {modoFormulario === "crear" ? "Nuevo Municipio" : "Editar Municipio"}
      </h3>

      <div>
        <label htmlFor="codigo">Código *</label>
        <input
          id="codigo"
          name="codigo"
          placeholder="Ej. 35200"
          value={municipio.codigo}
          onChange={handleChange}
          disabled={modoFormulario === "editar"} // no editable en edición
          required
        />
        {errores.codigo && <p className="error">{errores.codigo}</p>}
      </div>

      <div>
        <label htmlFor="nombre">Nombre *</label>
        <input
          id="nombre"
          name="nombre"
          placeholder="Nombre del municipio"
          value={municipio.nombre}
          onChange={handleChange}
          required
        />
        {errores.nombre && <p className="error">{errores.nombre}</p>}
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
