export const MENSAJES = {
  cargaConductores: "Cargando conductores...",
  errorGeneral: "Ha ocurrido un error inesperado.",
  exitoCreacion: "Conductor creado exitosamente",
  exitoActualizacion: "Conductor actualizado exitosamente",
  exitoEliminacion: "Conductor eliminado exitosamente",
  errorDNI: "DNI inválido. Formato: 12345678A",
  errorTelefono:
    "Teléfono inválido. Formato: 9 dígitos que empiecen por 6, 7, 8 o 9",
  confirmEliminar: (nombre) =>
    `¿Estás seguro de eliminar a ${nombre || "este conductor"}?`,
};
