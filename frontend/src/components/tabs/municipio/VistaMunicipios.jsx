import React from "react";
import "../../comunes/tablaBase.css";

export default function VistaMunicipios({
  municipios,
  selectedId,
  setSelectedId,
}) {
  if (!municipios || municipios.length === 0) {
    return (
      <table className="tabla-estilizada">
        <tbody>
          <tr>
            <td colSpan="2">No hay municipios registrados</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="tabla-estilizada">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {municipios.map((m) => (
          <tr
            key={m.codigo}
            onClick={() => setSelectedId(m.codigo)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedId(m.codigo);
              }
            }}
            tabIndex={0}
            role="button"
            aria-selected={selectedId === m.codigo}
            className={`fila-conductor${selectedId === m.codigo ? " seleccionada" : ""}`}
          >
            <td>{m.codigo}</td>
            <td>{m.nombre}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

