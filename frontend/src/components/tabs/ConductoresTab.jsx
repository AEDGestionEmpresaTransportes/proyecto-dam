import React, { useState } from "react";
import VistaConductores from "./conductor/VistaConductor";
import FormularioConductor from "./conductor/FormularioConductor";
import BotonesCRUD from "../comunes/BotonesCRUD";

import useConductores from "../../hooks/useConductores";
import useMunicipios from "../../hooks/useMunicipios";
import useCRUD from "../../hooks/useCRUD";

import { MENSAJES } from "../../utils/mensajes";
import "../comunes/tablaBase.css";

// Estado inicial del formulario
const CONDUCTOR_INICIAL = {
  dni: "",
  nombre: "",
  telefono: "",
  direccion: "",
  salario: "",
  municipio: "",
};

export default function ConductoresTab() {
  // Hook para cargar conductores
  const { conductores, setConductores, isLoading } = useConductores();

  // Hook para cargar municipios
  const { municipios, isLoading: isLoadingMunicipios } = useMunicipios();

  const [selectedDni, setSelectedDni] = useState(null);
  const [muestraFormulario, setMuestraFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [conductor, setConductor] = useState(CONDUCTOR_INICIAL);

  // Hook genérico CRUD
  const { submitItem, deleteItem, submitting, successMessage, error } = useCRUD(
    {
      items: conductores,
      setItems: setConductores,
      setSelectedId: setSelectedDni,
      apiUrl: "http://localhost:8080/api/conductores",
      idField: "dni",
      transformBeforeSave: (conductor, modo) => ({
        ...conductor,
        salario: conductor.salario ? parseFloat(conductor.salario) : 0,
        municipio: conductor.municipio
          ? { codigo: parseInt(conductor.municipio) }
          : null,
      }),
      mensajes: {
        exitoCreacion: MENSAJES.exitoCreacion,
        exitoActualizacion: MENSAJES.exitoActualizacion,
        exitoEliminacion: MENSAJES.exitoEliminacion,
      },
    }
  );

  // Abrir formulario para crear
  const handleCreate = () => {
    setModoFormulario("crear");
    setConductor(CONDUCTOR_INICIAL);
    setMuestraFormulario(true);
  };

  // Abrir formulario para editar
  const handleEdit = () => {
    if (!selectedDni) {
      alert("Selecciona un conductor para editar");
      return;
    }

    const conductorSeleccionado = conductores.find(
      (c) => c.dni === selectedDni
    );
    if (!conductorSeleccionado) return;

    setModoFormulario("editar");
    setConductor({
      ...conductorSeleccionado,
      // Extrae el código del municipio correctamente
      municipio: conductorSeleccionado.municipio?.codigo
        ? String(conductorSeleccionado.municipio.codigo)
        : conductorSeleccionado.municipio || "",
    });
    setMuestraFormulario(true);
  };

  // Eliminar conductor
  const handleDelete = () => {
    if (!selectedDni) {
      alert("Selecciona un conductor para eliminar");
      return;
    }

    const conductorSeleccionado = conductores.find(
      (c) => c.dni === selectedDni
    );
    const mensaje = MENSAJES.confirmEliminar(conductorSeleccionado?.nombre);

    deleteItem(selectedDni, mensaje);
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConductor((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    submitItem(conductor, modoFormulario, () => {
      setMuestraFormulario(false);
    });
  };

  // Cancelar formulario
  const handleCancel = () => {
    setMuestraFormulario(false);
    setConductor(CONDUCTOR_INICIAL);
  };

  // Mensaje de carga
  if (isLoading || isLoadingMunicipios) {
    return (
      <div className="tabla-container">
        <p className="mensaje-carga">
          {isLoading ? MENSAJES.cargaConductores : "Cargando municipios..."}
        </p>
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Conductores</h2>

      {error && <div className="mensaje-error">⚠️ {error}</div>}
      {successMessage && (
        <div className="mensaje-exito">✓ {successMessage}</div>
      )}

      <BotonesCRUD
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedDni={selectedDni}
        submitting={submitting}
      />

      {muestraFormulario && (
        <FormularioConductor
          conductor={conductor}
          modoFormulario={modoFormulario}
          submitting={submitting}
          municipios={municipios}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}

      <VistaConductores
        conductores={conductores}
        selectedDni={selectedDni}
        setSelectedDni={setSelectedDni}
      />
    </div>
  );
}
