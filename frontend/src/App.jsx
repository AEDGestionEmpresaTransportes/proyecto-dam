import React from "react";
import TabsContainer from "./components/TabsContainer";
import "./app.css";
import "./styles/global.css";

export default function App() {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>Sistema de Gestión - DAM</h1>
      </header>
      <main className="app-main">
        <TabsContainer />
      </main>
    </div>
  );
}
