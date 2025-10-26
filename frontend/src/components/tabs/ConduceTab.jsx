import React, { useState } from "react";
import VistaConduces from "./conduce/VistaConduces";
import FormularioConduce from "./conduce/FormularioConduce";
import BotonesCRUD from "../comunes/BotonesCRUD";

import useConduces from "../../hooks/useConduces";
import useCRUD from "../../hooks/useCRUD";
import useConductores from "../../hooks/useConductores";
import useVehiculos from "../../hooks/useVehiculos";

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

export default function ConduceTab() {
  const { conductores } = useConductores();
  const { vehiculos } = useVehiculos();

  const { conduces, setConduces, isLoading } = useConduces();
  const [muestraFormulario, setMuestraFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [conduce, setConduce] = useState(CONDUCE_INICIAL);

  const { submitItem, submitting, successMessage, error } = useCRUD({
    items: conduces,
    setItems: setConduces,
    apiUrl: "http://localhost:8080/api/conduces",
    idField: "conductor.dni", // o el campo que uses como identificador
    transformBeforeSave: (c) => c,
    mensajes: {
      exitoCreacion: MENSAJES.exitoCreacionConduce,
    },
  });

  const handleCreate = () => {
    setModoFormulario("crear");
    setConduce(CONDUCE_INICIAL);
    setMuestraFormulario(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Campos anidados como conductor.dni o vehiculo.matricula
    if (name.includes(".")) {
      const [obj, prop] = name.split(".");
      setConduce((prev) => ({
        ...prev,
        [obj]: {
          ...prev[obj],
          [prop]: value,
        },
      }));
    } else {
      setConduce((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitItem(conduce, "crear", () => {
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
        <p className="mensaje-carga">
          {MENSAJES.cargaConduces || "Cargando asignaciones..."}
        </p>
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Asignaciones de Conducción</h2>

      {error && <div className="mensaje-error">⚠️ {error}</div>}
      {successMessage && (
        <div className="mensaje-exito">✓ {successMessage}</div>
      )}

      <BotonesCRUD onCreate={handleCreate} submitting={submitting} />

      {muestraFormulario && (
        <FormularioConduce
          conduce={conduce}
          modoFormulario={modoFormulario}
          submitting={submitting}
          conductores={conductores}
          vehiculos={vehiculos}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}

      <VistaConduces conduces={conduces} />
    </div>
  );
}
