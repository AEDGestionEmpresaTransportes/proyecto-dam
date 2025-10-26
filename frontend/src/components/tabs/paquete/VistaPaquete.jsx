import React from "react";
import "../../comunes/tablaBase.css";

export default function VistaPaquetes({
  paquetes,
  selectedCodigo,
  setSelectedCodigo,
}) {
  if (!paquetes || paquetes.length === 0) {
    return (
      <table className="tabla-estilizada">
        <tbody>
          <tr>
            <td colSpan="6">No hay paquetes registrados</td>
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
          <th>Descripción</th>
          <th>Destinatario</th>
          <th>Dirección</th>
          <th>Municipio Destino</th>
          <th>Conductor</th>
        </tr>
      </thead>
      <tbody>
        {paquetes.map((p) => (
          <tr
            key={p.codigo}
            onClick={() => setSelectedCodigo(p.codigo)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedCodigo(p.codigo);
              }
            }}
            tabIndex={0}
            role="button"
            aria-selected={selectedCodigo === p.codigo}
            className={`fila-conductor${selectedCodigo === p.codigo ? " seleccionada" : ""}`}
          >
            <td>{p.codigo}</td>
            <td>{p.descripcion}</td>
            <td>{p.destinatario}</td>
            <td>{p.direccion}</td>
            <td>{p.municipioDestino?.nombre}</td>
            <td>{p.conductor?.nombre}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}