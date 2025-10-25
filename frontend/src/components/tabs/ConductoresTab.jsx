import React, { useEffect, useState } from "react";
import VistaConductores from "./conductor/VistaConductor";
import FormularioConductor from "./conductor/FormularioConductor";
import BotonesCRUD from "../botonesCRUD/BotonesCRUD";

import useConductores from "../../hooks/useConductores";
import { validarDNI, validarTelefono } from "../../utils/validaciones";

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
  const [muestraFormulario, setMuestraFormulario] = useState(false); // Se muestra el formulario
  const [modoFormulario, setModoFormulario] = useState("crear"); // Modo 'crear' o 'editar'
  const [conductor, setConductor] = useState(CONDUCTOR_INICIAL); // Datos del conductor
  const [submitting, setSubmitting] = useState(false); // Está enviando?
  const [successMessage, setSuccessMessage] = useState(null); // Mensaje de éxito

  // --------------- CREATE ---------------
  // Abrir formulario para crear un nuevo conductor
  const handleCreate = () => {
    setModoFormulario("crear"); // Modo del formulario en 'crear'
    setConductor(CONDUCTOR_INICIAL); // Limpia campos
    setMuestraFormulario(true); // Muestra formulario

    // Limpieza de mensajes de error y éxito anteriores
    setError(null);
    setSuccessMessage(null);
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

    setmodoFormulario("editar");
    setConductor({
      ...conductorSeleccionado,
      municipio:
        conductorSeleccionado.municipio?.nombre ||
        conductorSeleccionado.municipio ||
        "",
    });
    setMuestraFormulario(true);
    setError(null);
    setSuccessMessage(null);
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConductor((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!validarDNI(conductor.dni) && modoFormulario === "crear") {
      alert("DNI inválido. Formato: 12345678A");
      return;
    }

    if (!validarTelefono(conductor.telefono)) {
      alert(
        "Teléfono inválido. Formato: 9 dígitos que empiecen por 6, 7, 8 o 9"
      );
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const url =
        modoFormulario === "crear"
          ? "http://localhost:8080/api/conductores"
          : `http://localhost:8080/api/conductores/${selectedDni}`;

      const method = modoFormulario === "crear" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(conductor),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData || "Error al guardar conductor");
      }

      const resultado = await res.json();

      if (modoFormulario === "crear") {
        setConductores([...conductores, resultado]);
        setSuccessMessage("Conductor creado exitosamente");
      } else {
        setConductores(
          conductores.map((c) => (c.dni === selectedDni ? resultado : c))
        );
        setSuccessMessage("Conductor actualizado exitosamente");
        setSelectedDni(null);
      }

      setMuestraFormulario(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setSubmitting(false);
    }
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
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Cancelar formulario
  const handleCancel = () => {
    setMuestraFormulario(false);
    setConductor(CONDUCTOR_INICIAL);
    setError(null);
  };

  // MENSAJE DE CARGA
  if (isLoading) {
    return (
      <div className="tabla-container">
        <p className="mensaje-carga">Cargando conductores...</p>
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

      <VistaConductores
        conductores={conductores}
        selectedDni={selectedDni}
        setSelectedDni={setSelectedDni}
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
    </div>
  );
}
