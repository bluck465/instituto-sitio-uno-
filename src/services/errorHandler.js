export function parseServerError(error) {
  if (!error) {
    return { friendly: 'Ocurrio un error inesperado. Intenta de nuevo.', raw: null }
  }

  if (error.message) {
    const msg = error.message

    // ── Errores de inicio de sesion y registro ──
    if (msg.includes('Invalid login credentials'))
      return { friendly: 'El correo o la contrasena son incorrectos. Intenta de nuevo.', raw: error }

    if (msg.includes('User already registered'))
      return { friendly: 'Ya existe una cuenta con este correo. Intenta iniciar sesion.', raw: error }

    if (msg.includes('Password should be at least') || msg.includes('password too short'))
      return { friendly: 'Tu contrasena es muy corta. Usa al menos 6 caracteres.', raw: error }

    if (msg.includes('Unable to validate email address') || msg.includes('Invalid email'))
      return { friendly: 'El correo que ingresaste no es valido. Verificalo.', raw: error }

    // ── Errores de rate limit y configuracion ──
    if (msg.includes('Email rate limit exceeded') || msg.includes('over_email_send_rate'))
      return { friendly: 'Hiciste muchos intentos seguidos. Espera un minutito y vuelve a intentar.', raw: error }

    if (msg.includes('Signup is disabled'))
      return { friendly: 'El registro no esta disponible ahora mismo. Intenta mas tarde.', raw: error }

    if (msg.includes('Email not confirmed'))
      return { friendly: 'Debes confirmar tu correo antes de entrar. Revisa tu bandeja de entrada.', raw: error }

    // ── Errores de sesion ──
    if (msg.includes('JWT expired') || msg.includes('session not found'))
      return { friendly: 'Tu sesion ya expiro. Inicia sesion de nuevo para continuar.', raw: error }

    // ── Errores de base de datos ──
    if (msg.includes('violates not-null constraint'))
      return { friendly: 'Faltan datos obligatorios. Asegurate de completar todos los campos.', raw: error }

    if (msg.includes('violates unique constraint'))
      return { friendly: 'Ya existe un registro con esa informacion. Verifica los datos.', raw: error }

    if (msg.includes('violates foreign key constraint'))
      return { friendly: 'Algun dato que ingresaste no es valido. Revisa la informacion.', raw: error }

    if (msg.includes('violates row-level security') || msg.includes('new row violates row-level security'))
      return { friendly: 'No tienes permiso para hacer esta operacion.', raw: error }

    if (msg.includes('permission denied for table'))
      return { friendly: 'No tienes acceso a esta tabla. Contacta al administrador.', raw: error }

    if (msg.includes('relation does not exist'))
      return { friendly: 'La tabla no existe en la base de datos.', raw: error }

    // ── Cualquier otro error ──
    return { friendly: 'Ocurrio un error. Intenta de nuevo.', raw: error }
  }

  return { friendly: 'Ocurrio un error inesperado. Intenta de nuevo.', raw: error }
}
