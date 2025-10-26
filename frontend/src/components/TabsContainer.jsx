import React, { useState } from "react";
import ConductoresTab from "./tabs/ConductoresTab";
import MunicipiosTab from "./tabs/MunicipiosTab";
import VehiculosTab from "./tabs/VehiculosTab";
import PaquetesTab from "./tabs/PaquetesTab";
import ConduceTab from "./tabs/ConduceTab";
import "./tabsContainer.css";

export default function TabsContainer() {
  const [tab, setTab] = useState("conductores");

  return (
    <div className="tabs-container">
      <nav className="tabs-nav">
        <button
          onClick={() => setTab("conductores")}
          className={tab === "conductores" ? "active" : ""}
          aria-selected={tab === "conductores"}
        >
          Conductores
        </button>
        <button
          onClick={() => setTab("vehiculos")}
          className={tab === "vehiculos" ? "active" : ""}
          aria-selected={tab === "vehiculos"}
        >
          Vehículos
        </button>
        <button
          onClick={() => setTab("municipios")}
          className={tab === "municipios" ? "active" : ""}
          aria-selected={tab === "municipios"}
        >
          Municipios
        </button>
        <button
          onClick={() => setTab("paquetes")}
          className={tab === "paquetes" ? "active" : ""}
          aria-selected={tab === "paquetes"}
        >
          Paquetes
        </button>
        <button
          onClick={() => setTab("conduce")}
          className={tab === "conduce" ? "active" : ""}
          aria-selected={tab === "conduce"}
        >
          Conduce
        </button>
      </nav>

      <div className="tabs-content">
        {tab === "conductores" && <ConductoresTab />}
        {tab === "vehiculos" && <VehiculosTab />}
        {tab === "municipios" && <MunicipiosTab />}
        {tab === "paquetes" && <PaquetesTab />}
        {tab === "conduce" && <ConduceTab />}
      </div>
    </div>
  );
}
