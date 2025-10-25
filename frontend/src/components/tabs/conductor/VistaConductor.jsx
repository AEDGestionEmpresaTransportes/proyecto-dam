import React from "react";

import "./vistaConductor.css";

export default function VistaConductores({
  conductores,
  selectedDni,
  setSelectedDni,
}) {
  if (conductores.length === 0) {
    return (
      <table className="tabla-estilizada">
        <tbody>
          <tr>
            <td colSpan="6">No hay conductores registrados</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
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
        {conductores.map((c) => (
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
            <td>{c.salario ? `${parseFloat(c.salario).toFixed(2)} €` : "-"}</td>
            <td>{c.municipio?.nombre || c.municipio || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
