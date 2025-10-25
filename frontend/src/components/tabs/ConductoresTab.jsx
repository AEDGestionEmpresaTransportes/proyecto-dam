import React, { useEffect, useState } from "react";
import VistaConductores from "./conductor/VistaConductor";
import FormularioConductor from "./conductor/FormularioConductor";
import BotonesCRUD from "../botonesCRUD/BotonesCRUD";

import useConductores from "../../hooks/useConductores";
import useSubmitConductor from "../../hooks/useSubmitConductor";

import { MENSAJES } from "../../utils/mensajes";

//import "../TablaEstilosMejoradov2.css";

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
  // Importa el hook de la lógica de lectura de conductores
  const { conductores, setConductores, isLoading, error, fetchConductores } =
    useConductores();

  const [selectedDni, setSelectedDni] = useState(null); // DNI Seleccionado en la tabla

  // Importa el hook de la lógica de creación de conductores
  const {
    submitConductor,
    submitting,
    successMessage,
    error: submitError,
  } = useSubmitConductor({
    conductores,
    setConductores,
    setSelectedDni,
  });

  const [muestraFormulario, setMuestraFormulario] = useState(false); // Se muestra el formulario
  const [modoFormulario, setModoFormulario] = useState("crear"); // Modo 'crear' o 'editar'
  const [conductor, setConductor] = useState(CONDUCTOR_INICIAL); // Datos del conductor
  //const [submitting, setSubmitting] = useState(false); // Está enviando?
  //const [successMessage, setSuccessMessage] = useState(null); // Mensaje de éxito

  // --------------- CREATE ---------------
  // Abrir formulario para crear un nuevo conductor
  const handleCreate = () => {
    setModoFormulario("crear"); // Modo del formulario en 'crear'
    setConductor(CONDUCTOR_INICIAL); // Limpia campos
    setMuestraFormulario(true); // Muestra formulario

    // Limpieza de mensajes de error y éxito anteriores
    //setError(null);
    //setSuccessMessage(null);
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
      municipio:
        conductorSeleccionado.municipio?.nombre ||
        conductorSeleccionado.municipio ||
        "",
    });
    setMuestraFormulario(true);
    //setError(null);
    setSuccessMessage(null);
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConductor((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    submitConductor(conductor, modoFormulario, () => {
      setMuestraFormulario(false);
    });
  };

  // Eliminar conductor
  const handleDelete = async () => {
    if (!selectedDni) {
      alert("Selecciona un conductor para eliminar");
      return;
    }

    const conductorSeleccionado = conductores.find(
      (c) => c.dni === selectedDni
    );
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar a ${
        conductorSeleccionado?.nombre || "este conductor"
      }?`
    );
    if (!confirmDelete) return;

    try {
      setSubmitting(true);
      const res = await fetch(
        `http://localhost:8080/api/conductores/${selectedDni}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Error al eliminar conductor");

      setConductores(conductores.filter((c) => c.dni !== selectedDni));
      setSelectedDni(null);
      setSuccessMessage("Conductor eliminado exitosamente");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      //setError(err.message);
      console.error("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Cancelar formulario
  const handleCancel = () => {
    setMuestraFormulario(false);
    setConductor(CONDUCTOR_INICIAL);
    //setError(null);
  };

  // MENSAJE DE CARGA
  if (isLoading) {
    return (
      <div className="tabla-container">
        <p className="mensaje-carga">{MENSAJES.cargaConductores}</p>
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Conductores</h2>

      {submitError && <div className="mensaje-error">⚠️ {submitError}</div>}

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
