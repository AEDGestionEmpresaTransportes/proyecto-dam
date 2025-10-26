import React, { useState } from "react";
import VistaMunicipios from "./municipio/VistaMunicipios";
import FormularioMunicipio from "./municipio/FormularioMunicipio";
import BotonesCRUD from "../comunes/BotonesCRUD";

import useMunicipios from "../../hooks/useMunicipios";
import useCRUD from "../../hooks/useCRUD";
import { MENSAJES } from "../../utils/mensajes";
import "../comunes/tablaBase.css";

const MUNICIPIO_INICIAL = { codigo: "", nombre: "" };

export default function MunicipiosTab() {
  const { municipios, setMunicipios, isLoading } = useMunicipios();
  const [selectedId, setSelectedId] = useState(null);
  const [muestraFormulario, setMuestraFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [municipio, setMunicipio] = useState(MUNICIPIO_INICIAL);

  const { submitItem, deleteItem, submitting, successMessage, error } = useCRUD({
    items: municipios,
    setItems: setMunicipios,
    setSelectedId: setSelectedId,
    apiUrl: "http://localhost:8080/api/municipios",
    idField: "codigo",
    transformBeforeSave: (m) => m,
    mensajes: {
      exitoCreacion: MENSAJES.exitoCreacionMunicipio,
      exitoActualizacion: MENSAJES.exitoActualizacionMunicipio,
      exitoEliminacion: MENSAJES.exitoEliminacionMunicipio,
    },
  });

  const handleCreate = () => {
    setModoFormulario("crear");
    setMunicipio(MUNICIPIO_INICIAL);
    setMuestraFormulario(true);
  };

  const handleEdit = () => {
    if (!selectedId) return alert("Selecciona un municipio para editar");
    const seleccionado = municipios.find((m) => m.codigo === selectedId);
    if (!seleccionado) return;
    setModoFormulario("editar");
    setMunicipio({ ...seleccionado });
    setMuestraFormulario(true);
  };

  const handleDelete = () => {
    if (!selectedId) return alert("Selecciona un municipio para eliminar");
    const seleccionado = municipios.find((m) => m.codigo === selectedId);
    const mensaje = MENSAJES.confirmEliminarMunicipio(seleccionado?.nombre);
    deleteItem(selectedId, mensaje);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMunicipio((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitItem(municipio, modoFormulario, () => {
      setMuestraFormulario(false);
    });
  };

  const handleCancel = () => {
    setMuestraFormulario(false);
    setMunicipio(MUNICIPIO_INICIAL);
  };

  if (isLoading) {
    return (
      <div className="tabla-container">
        <p className="mensaje-carga">{MENSAJES.cargaMunicipios || "Cargando municipios..."}</p>
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Municipios</h2>

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
        <FormularioMunicipio
          municipio={municipio}
          modoFormulario={modoFormulario}
          submitting={submitting}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}

      <VistaMunicipios
        municipios={municipios}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
}




