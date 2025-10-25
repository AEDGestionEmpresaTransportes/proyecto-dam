import React from "react";
import TabsContainer from "./components/TabsContainer";
import "./App.css"; // Importa el CSS

function App() {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>Gestión Empresa de Paquetería</h1>
      </header>
      <main className="app-main">
        <TabsContainer />
      </main>
    </div>
  );
}

export default App;
