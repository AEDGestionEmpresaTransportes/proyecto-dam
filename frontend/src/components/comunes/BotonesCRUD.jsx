import React from "react";
import "./botonesCRUD.css";

export default function BotonesCRUD({
  onCreate,
  onEdit,
  onDelete,
  selectedDni,
  submitting,
}) {
  return (
    <div className="tabla-actions">
      <button onClick={onCreate} disabled={submitting}>
        ➕ Crear
      </button>
      <button onClick={onEdit} disabled={!selectedDni || submitting}>
        ✏️ Editar
      </button>
      <button onClick={onDelete} disabled={!selectedDni || submitting}>
        🗑️ Eliminar
      </button>
    </div>
  );
}
