import React, { useState } from 'react';
import ConductoresTab from './ConductoresTab';
import VehiculosTab from './VehiculosTab';
import MunicipiosTab from './MunicipiosTab';
import PaquetesTab from './PaquetesTab';
import ConduceTab from './ConduceTab';
import './TabsContainer.css'; // Importa el CSS

export default function TabsContainer() {
  const [tab, setTab] = useState('conductores');

  return (
    <div className="tabs-container">
      <nav className="tabs-nav">
        <button onClick={() => setTab('conductores')}>Conductores</button>
        <button onClick={() => setTab('vehiculos')}>Vehículos</button>
        <button onClick={() => setTab('municipios')}>Municipios</button>
        <button onClick={() => setTab('paquetes')}>Paquetes</button>
        <button onClick={() => setTab('conduce')}>Conduce</button>
      </nav>
      <hr />
      <div className="tabs-content">
        {tab === 'conductores' && <ConductoresTab />}
        {tab === 'vehiculos' && <VehiculosTab />}
        {tab === 'municipios' && <MunicipiosTab />}
        {tab === 'paquetes' && <PaquetesTab />}
        {tab === 'conduce' && <ConduceTab />}
      </div>
    </div>
  );
}
