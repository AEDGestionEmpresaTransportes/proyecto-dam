import { useState } from "react";

/**
 * Hook genérico para operaciones CRUD
 * @param {Object} config - Configuración del hook
 * @param {Array} config.items - Lista de items actual
 * @param {Function} config.setItems - Función para actualizar la lista
 * @param {Function} config.setSelectedId - Función para actualizar el ID seleccionado
 * @param {string} config.apiUrl - URL base de la API
 * @param {string} config.idField - Campo que se usa como ID (por defecto: 'id')
 * @param {Function} config.transformBeforeSave - Función opcional para transformar datos antes de guardar
 * @param {Object} config.mensajes - Mensajes personalizados
 */
export default function useCRUD({
  items,
  setItems,
  setSelectedId,
  apiUrl,
  idField = "id",
  transformBeforeSave = (item) => item,
  mensajes = {},
}) {
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const defaultMensajes = {
    exitoCreacion: "Elemento creado exitosamente",
    exitoActualizacion: "Elemento actualizado exitosamente",
    exitoEliminacion: "Elemento eliminado exitosamente",
    ...mensajes,
  };

  /**
   * Crear o actualizar un elemento
   */
  const submitItem = async (item, modo, onSuccess) => {
    try {
      setSubmitting(true);
      setError(null);

      const url = modo === "crear" ? apiUrl : `${apiUrl}/${item[idField]}`;
      const method = modo === "crear" ? "POST" : "PUT";

      // Transforma el item antes de enviarlo (útil para casos especiales)
      const itemFinal = transformBeforeSave(item, modo);

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemFinal),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData || "Error al guardar");
      }

      const resultado = await res.json();

      if (modo === "crear") {
        setItems([...items, resultado]);
        setSuccessMessage(defaultMensajes.exitoCreacion);
      } else {
        setItems(
          items.map((i) => (i[idField] === item[idField] ? resultado : i))
        );
        setSuccessMessage(defaultMensajes.exitoActualizacion);
        setSelectedId(null);
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

  /**
   * Eliminar un elemento
   */
  const deleteItem = async (id, confirmMessage) => {
    try {
      const confirmar = window.confirm(
        confirmMessage || "¿Estás seguro de eliminar este elemento?"
      );
      if (!confirmar) return;

      setSubmitting(true);
      setError(null);

      const res = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      setItems(items.filter((i) => i[idField] !== id));
      setSelectedId(null);
      setSuccessMessage(defaultMensajes.exitoEliminacion);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Limpiar mensajes
   */
  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return {
    submitItem,
    deleteItem,
    submitting,
    successMessage,
    error,
    clearMessages,
  };
}
