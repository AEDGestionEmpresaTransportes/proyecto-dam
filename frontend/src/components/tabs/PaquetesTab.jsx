import React, { useState } from "react";
import VistaPaquetes from "./paquete/VistaPaquete";
import FormularioPaquete from "./paquete/FormularioPaquete";
import BotonesCRUD from "../comunes/BotonesCRUD";

import usePaquete from "../../hooks/usePaquete";
import useMunicipios from "../../hooks/useMunicipios";
import useConductores from "../../hooks/useConductores";
import useCRUD from "../../hooks/useCRUD";

import { MENSAJES } from "../../utils/mensajes";
import "../comunes/tablaBase.css";

// Estado inicial del formulario
const PAQUETE_INICIAL = {
  codigo: "",
  descripcion: "",
  destinatario: "",
  direccion: "",
  municipioDestino: "",
  conductor: "",
};

export default function PaquetesTab() {
  const { paquetes, setPaquetes, isLoading } = usePaquete();
  const { municipios, isLoading: isLoadingMunicipios } = useMunicipios();
  const { conductores, isLoading: isLoadingConductores } = useConductores();

  const [selectedCodigo, setSelectedCodigo] = useState(null);
  const [muestraFormulario, setMuestraFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [paquete, setPaquete] = useState(PAQUETE_INICIAL);

  const { submitItem, deleteItem, submitting, successMessage, error } = useCRUD({
    items: paquetes,
    setItems: setPaquetes,
    setSelectedId: setSelectedCodigo,
    apiUrl: "http://localhost:8080/api/paquetes",
    idField: "codigo",
    transformBeforeSave: (paquete, modo) => ({
      ...paquete,
      municipioDestino: paquete.municipioDestino
        ? { codigo: parseInt(paquete.municipioDestino) }
        : null,
      conductor: paquete.conductor
        ? { dni: paquete.conductor }
        : null,
    }),
    mensajes: {
      exitoCreacion: MENSAJES.exitoCreacion,
      exitoActualizacion: MENSAJES.exitoActualizacion,
      exitoEliminacion: MENSAJES.exitoEliminacion,
    },
  });

  const handleCreate = () => {
    setModoFormulario("crear");
    setPaquete(PAQUETE_INICIAL);
    setMuestraFormulario(true);
  };

  const handleEdit = () => {
    if (!selectedCodigo) {
      alert("Selecciona un paquete para editar");
      return;
    }

    const paqueteSeleccionado = paquetes.find((p) => p.codigo === selectedCodigo);
    if (!paqueteSeleccionado) return;

    setModoFormulario("editar");
    setPaquete({
      ...paqueteSeleccionado,
      municipioDestino: paqueteSeleccionado.municipioDestino?.codigo
        ? String(paqueteSeleccionado.municipioDestino.codigo)
        : "",
      conductor: paqueteSeleccionado.conductor?.dni || "",
    });
    setMuestraFormulario(true);
  };

  const handleDelete = () => {
    if (!selectedCodigo) {
      alert("Selecciona un paquete para eliminar");
      return;
    }

    const paqueteSeleccionado = paquetes.find((p) => p.codigo === selectedCodigo);
    const mensaje = MENSAJES.confirmEliminar(paqueteSeleccionado?.descripcion);

    deleteItem(selectedCodigo, mensaje);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaquete((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitItem(paquete, modoFormulario, () => {
      setMuestraFormulario(false);
    });
  };

  const handleCancel = () => {
    setMuestraFormulario(false);
    setPaquete(PAQUETE_INICIAL);
  };

  if (isLoading || isLoadingMunicipios || isLoadingConductores) {
    return (
      <div className="tabla-container">
        <p className="mensaje-carga">
          {isLoading
            ? MENSAJES.cargaPaquetes
            : isLoadingMunicipios
            ? "Cargando municipios..."
            : "Cargando conductores..."}
        </p>
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Paquetes</h2>

      {error && <div className="mensaje-error">⚠️ {error}</div>}
      {successMessage && <div className="mensaje-exito">✓ {successMessage}</div>}

      <BotonesCRUD
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedDni={selectedCodigo}
        submitting={submitting}
      />

      {muestraFormulario && (
        <FormularioPaquete
          paquete={paquete}
          modoFormulario={modoFormulario}
          submitting={submitting}
          municipios={municipios}
          conductores={conductores}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}

      <VistaPaquetes
        paquetes={paquetes}
        selectedCodigo={selectedCodigo}
        setSelectedCodigo={setSelectedCodigo}
      />
    </div>
  );
}

