import React from "react";
import "../../comunes/tablaBase.css";

export default function VistaVehiculos({
  vehiculos,
  selectedMatricula,
  setSelectedMatricula,
}) {
  if (!vehiculos || vehiculos.length === 0) {
    return (
      <table className="tabla-estilizada">
        <tbody>
          <tr>
            <td colSpan="4">No hay vehículos registrados</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="tabla-estilizada">
      <thead>
        <tr>
          <th>Matrícula</th>
          <th>Modelo</th>
          <th>Tipo</th>
          <th>Potencia (CV)</th>
        </tr>
      </thead>
      <tbody>
        {vehiculos.map((v) => (
          <tr
            key={v.matricula}
            onClick={() => setSelectedMatricula(v.matricula)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedMatricula(v.matricula);
              }
            }}
            tabIndex={0}
            role="button"
            aria-selected={selectedMatricula === v.matricula}
            className={`fila-conductor${selectedMatricula === v.matricula ? " seleccionada" : ""}`}
          >
            <td>{v.matricula}</td>
            <td>{v.modelo}</td>
            <td>{v.tipo}</td>
            <td>{v.potencia}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
