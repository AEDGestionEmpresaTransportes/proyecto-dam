import React, { useState } from "react";
import VistaConduces from "./conduce/VistaConduces";
import FormularioConduce from "./conduce/FormularioConduce";
import BotonesCRUD from "../comunes/BotonesCRUD";

import useConduces from "../../hooks/useConduces";
import useCRUD from "../../hooks/useCRUD";
import { MENSAJES } from "../../utils/mensajes";
import "../comunes/tablaBase.css";

const CONDUCE_INICIAL = {
  conductor: {
    dni: "",
    nombre: "",
    telefono: "",
    direccion: "",
    salario: 0,
    municipio: { codigo: "", nombre: "" },
  },
  vehiculo: {
    matricula: "",
    modelo: "",
    tipo: "",
    potencia: 0,
  },
  fecha: "",
};

export default function ConducesTab() {
  const { conduces, setConduces, isLoading } = useConduces();
  const [selectedId, setSelectedId] = useState(null);
  const [muestraFormulario, setMuestraFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [conduce, setConduce] = useState(CONDUCE_INICIAL);

  const { submitItem, deleteItem, submitting, successMessage, error } = useCRUD({
    items: conduces,
    setItems: setConduces,
    setSelectedId: setSelectedId,
    apiUrl: "http://localhost:8080/api/conduces",
    idField: "conductor.dni", // o el campo que uses como identificador
    transformBeforeSave: (c) => c,
    mensajes: {
      exitoCreacion: MENSAJES.exitoCreacionConduce,
      exitoActualizacion: MENSAJES.exitoActualizacionConduce,
      exitoEliminacion: MENSAJES.exitoEliminacionConduce,
    },
  });

  const handleCreate = () => {
    setModoFormulario("crear");
    setConduce(CONDUCE_INICIAL);
    setMuestraFormulario(true);
  };

  const handleEdit = () => {
    if (!selectedId) return alert("Selecciona una asignación para editar");
    const seleccionado = conduces.find((c) => c.conductor.dni === selectedId);
    if (!seleccionado) return;
    setModoFormulario("editar");
    setConduce({ ...seleccionado });
    setMuestraFormulario(true);
  };

  const handleDelete = () => {
    if (!selectedId) return alert("Selecciona una asignación para eliminar");
    const seleccionado = conduces.find((c) => c.conductor.dni === selectedId);
    const mensaje = MENSAJES.confirmEliminarConduce(seleccionado?.conductor?.nombre);
    deleteItem(selectedId, mensaje);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConduce((prev) => ({
      ...prev,
      [name.includes("conductor.") ? "conductor" : name.includes("vehiculo.") ? "vehiculo" : name]: {
        ...prev[name.includes("conductor.") ? "conductor" : name.includes("vehiculo.") ? "vehiculo" : name],
        [name.split(".")[1]]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitItem(conduce, modoFormulario, () => {
      setMuestraFormulario(false);
    });
  };

  const handleCancel = () => {
    setMuestraFormulario(false);
    setConduce(CONDUCE_INICIAL);
  };

  if (isLoading) {
    return (
      <div className="tabla-container">
        <p className="mensaje-carga">{MENSAJES.cargaConduces || "Cargando asignaciones..."}</p>
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Asignaciones de Conducción</h2>

      {error && <div className="mensaje-error">⚠️ {error}</div>}
      {successMessage && <div className="mensaje-exito">✓ {successMessage}</div>}

      <BotonesCRUD
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedDni={selectedId}
        submitting={submitting}
      />

      {muestraFormulario && (
        <FormularioConduce
          conduce={conduce}
          modoFormulario={modoFormulario}
          submitting={submitting}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}

      <VistaConduces
        conduces={conduces}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
}


