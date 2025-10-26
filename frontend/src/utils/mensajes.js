export const MENSAJES = {
  // Conductores
  cargaConductores: "Cargando conductores...",
  exitoCreacion: "Conductor creado exitosamente",
  exitoActualizacion: "Conductor actualizado exitosamente",
  exitoEliminacion: "Conductor eliminado exitosamente",
  errorDNI: "DNI inválido. Formato: 12345678A",
  errorTelefono:
    "Teléfono inválido. Formato: 9 dígitos que empiecen por 6, 7, 8 o 9",
  confirmEliminar: (nombre) =>
    `¿Estás seguro de eliminar a ${nombre || "este conductor"}?`,

  // Municipios
  cargaMunicipios: "Cargando municipios...",
  exitoCreacionMunicipio: "Municipio creado exitosamente",
  exitoActualizacionMunicipio: "Municipio actualizado exitosamente",
  exitoEliminacionMunicipio: "Municipio eliminado exitosamente",
  errorCodigoPostal: "Código inválido. Formato: 01234",
  confirmEliminarMunicipio: (nombre) =>
    `¿Estás seguro de eliminar el municipio "${nombre}"?`,

  // Vehículos
  cargaVehiculos: "Cargando vehículos...",
  exitoCreacionVehiculo: "Vehículo creado exitosamente",
  exitoActualizacionVehiculo: "Vehículo actualizado exitosamente",
  exitoEliminacionVehiculo: "Vehículo eliminado exitosamente",
  errorMatricula: "Matrícula inválida. Formato esperado: 1234ABC",
  confirmEliminarVehiculo: (modelo) =>
    `¿Estás seguro de eliminar el vehículo "${modelo || "seleccionado"}"?`,

  // Paquetes
  cargaPaquetes: "Cargando paquetes...",
  exitoCreacionPaquete: "Paquete creado exitosamente",
  exitoActualizacionPaquete: "Paquete actualizado exitosamente",
  exitoEliminacionPaquete: "Paquete eliminado exitosamente",
  confirmEliminarPaquete: (descripcion) =>
    `¿Estás seguro de eliminar el paquete "${descripcion || "seleccionado"}"?`,

  // Conduces
  cargaConduces: "Cargando asignaciones de conducción...",
  exitoCreacionConduce: "Asignación creada exitosamente",
  exitoActualizacionConduce: "Asignación actualizada exitosamente",
  exitoEliminacionConduce: "Asignación eliminada exitosamente",
  confirmEliminarConduce: (nombre) =>
    `¿Estás seguro de eliminar la asignación de ${nombre || "este conductor"}?`,

  // General
  errorGeneral: "Ha ocurrido un error inesperado.",
};
