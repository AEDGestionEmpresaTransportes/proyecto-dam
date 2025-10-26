import React, { useState } from "react";
import VistaVehiculos from "./vehiculo/VistaVehiculo";
import FormularioVehiculo from "./vehiculo/FormularioVehiculo";
import BotonesCRUD from "../comunes/BotonesCRUD";

import useVehiculos from "../../hooks/useVehiculos";
import useCRUD from "../../hooks/useCRUD";

import { MENSAJES } from "../../utils/mensajes";
import "../comunes/tablaBase.css";

// Estado inicial del formulario
const VEHICULO_INICIAL = {
  matricula: "",
  modelo: "",
  tipo: "",
  potencia: "",
};

export default function VehiculosTab() {
  const { vehiculos, setVehiculos, isLoading } = useVehiculos();

  const [selectedMatricula, setSelectedMatricula] = useState(null);
  const [muestraFormulario, setMuestraFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [vehiculo, setVehiculo] = useState(VEHICULO_INICIAL);

  const { submitItem, deleteItem, submitting, successMessage, error } = useCRUD({
    items: vehiculos,
    setItems: setVehiculos,
    setSelectedId: setSelectedMatricula,
    apiUrl: "http://localhost:8080/api/vehiculos",
    idField: "matricula",
    transformBeforeSave: (vehiculo) => ({
      ...vehiculo,
      potencia: vehiculo.potencia ? parseInt(vehiculo.potencia) : 0,
    }),
    mensajes: {
      exitoCreacion: MENSAJES.exitoCreacion,
      exitoActualizacion: MENSAJES.exitoActualizacion,
      exitoEliminacion: MENSAJES.exitoEliminacion,
    },
  });

  const handleCreate = () => {
    setModoFormulario("crear");
    setVehiculo(VEHICULO_INICIAL);
    setMuestraFormulario(true);
  };

  const handleEdit = () => {
    if (!selectedMatricula) {
      alert("Selecciona un vehículo para editar");
      return;
    }

    const vehiculoSeleccionado = vehiculos.find(
      (v) => v.matricula === selectedMatricula
    );
    if (!vehiculoSeleccionado) return;

    setModoFormulario("editar");
    setVehiculo({ ...vehiculoSeleccionado });
    setMuestraFormulario(true);
  };

  const handleDelete = () => {
    if (!selectedMatricula) {
      alert("Selecciona un vehículo para eliminar");
      return;
    }

    const vehiculoSeleccionado = vehiculos.find(
      (v) => v.matricula === selectedMatricula
    );
    const mensaje = MENSAJES.confirmEliminar(vehiculoSeleccionado?.modelo);

    deleteItem(selectedMatricula, mensaje);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitItem(vehiculo, modoFormulario, () => {
      setMuestraFormulario(false);
    });
  };

  const handleCancel = () => {
    setMuestraFormulario(false);
    setVehiculo(VEHICULO_INICIAL);
  };

  if (isLoading) {
    return (
      <div className="tabla-container">
        <p className="mensaje-carga">{MENSAJES.cargaVehiculos || "Cargando vehículos..."}</p>
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Vehículos</h2>

      {error && <div className="mensaje-error">⚠️ {error}</div>}
      {successMessage && <div className="mensaje-exito">✓ {successMessage}</div>}

      <BotonesCRUD
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedDni={selectedMatricula}
        submitting={submitting}
      />

      {muestraFormulario && (
        <FormularioVehiculo
          vehiculo={vehiculo}
          modoFormulario={modoFormulario}
          submitting={submitting}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}

      <VistaVehiculos
        vehiculos={vehiculos}
        selectedMatricula={selectedMatricula}
        setSelectedMatricula={setSelectedMatricula}
      />
    </div>
  );
}
