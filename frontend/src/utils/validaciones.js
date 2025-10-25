// Validar DNI español (formato básico: 8 dígitos + letra mayúscula)
export const validarDNI = (dni) => {
  const dniRegex = /^[0-9]{8}[A-Z]$/;
  return dniRegex.test(dni);
};

// Validar teléfono español (opcional, debe empezar por 6-9 y tener 9 dígitos)
export const validarTelefono = (telefono) => {
  if (!telefono) return true; // Campo opcional
  const telefonoRegex = /^[6-9][0-9]{8}$/;
  return telefonoRegex.test(telefono);
};
