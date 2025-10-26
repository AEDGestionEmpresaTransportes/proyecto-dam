import React from "react";
import "../../comunes/tablaBase.css";

export default function VistaConduces({ conduces }) {
  if (conduces.length === 0) {
    return (
      <table className="tabla-estilizada">
        <tbody>
          <tr>
            <td colSpan="7">No hay asignaciones registradas</td>
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
          <th>Vehículo</th>
          <th>Modelo</th>
          <th>Tipo</th>
          <th>Potencia</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {conduces.map((c) => (
          <tr key={c.conductor.dni}>
            <td>{c.conductor.dni}</td>
            <td>{c.conductor.nombre}</td>
            <td>{c.vehiculo.matricula}</td>
            <td>{c.vehiculo.modelo}</td>
            <td>{c.vehiculo.tipo}</td>
            <td>{c.vehiculo.potencia} CV</td>
            <td>{c.fecha}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
