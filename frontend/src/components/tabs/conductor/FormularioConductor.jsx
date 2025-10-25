import "./formularioConductor.css";

export default function FormularioConductor({
  conductor,
  modoFormulario,
  submitting,
  handleChange,
  handleSubmit,
  handleCancel,
}) {
  return (
    <form className="formulario" onSubmit={handleSubmit}>
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
  );
}
