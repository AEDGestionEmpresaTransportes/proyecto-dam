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

// Validar matrícula española
export const validarMatricula = (matricula) => {
  const matriculaRegex = /^[0-9]{4}[A-Z]{3}$/;
  return matriculaRegex.test(matricula);
};

// Validar fecha en formato YYYY-MM-DD
export const validarFechaISO = (fecha) => {
  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
  return fechaRegex.test(fecha);
};

// Validar de código postal español
export const validarCodigoPostal = (cp) => {
  const cpRegex = /^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/;
  return cpRegex.test(cp);
};
