import { useState } from "react";

export default function useSubmitConductor({
  conductores,
  setConductores,
  setSelectedDni,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const submitConductor = async (conductor, modoFormulario, onSuccess) => {
    try {
      setSubmitting(true);
      setError(null);

      const url =
        modoFormulario === "crear"
          ? "http://localhost:8080/api/conductores"
          : `http://localhost:8080/api/conductores/${conductor.dni}`;

      const method = modoFormulario === "crear" ? "POST" : "PUT";

      /*
      const conductorFinal = {
        ...conductor,
        salario: conductor.salario ? parseFloat(conductor.salario) : 0,
      };*/

      const conductorFinal = {
        ...conductor,
        salario: conductor.salario ? parseFloat(conductor.salario) : 0,
        municipio: conductor.municipio
          ? { codigo: parseInt(conductor.municipio) }
          : null,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(conductorFinal),
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
          conductores.map((c) => (c.dni === conductor.dni ? resultado : c))
        );
        setSuccessMessage("Conductor actualizado exitosamente");
        setSelectedDni(null);
      }

      if (onSuccess) onSuccess();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitConductor,
    submitting,
    successMessage,
    error,
  };
}
