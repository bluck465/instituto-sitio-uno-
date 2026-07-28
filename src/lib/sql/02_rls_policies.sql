-- ================================================================
-- ITSU - Políticas Row Level Security (RLS)
-- Ejecutar en Supabase SQL Editor DESPUÉS de crear las tablas
-- ================================================================

-- ── ACTIVAR RLS EN TODAS LAS TABLAS ─────────────────────────

ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estudiantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profesores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.administradores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carreras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asignaturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.periodos_lectivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.secciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscripciones ENABLE ROW LEVEL SECURITY;


-- ================================================================
-- POLÍTICAS: ADMIN (acceso total)
-- ================================================================

CREATE POLICY "admin_all_usuarios" ON public.usuarios
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.usuarios WHERE rol = 'administrador')
  );

CREATE POLICY "admin_all_estudiantes" ON public.estudiantes
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.usuarios WHERE rol = 'administrador')
  );

CREATE POLICY "admin_all_profesores" ON public.profesores
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.usuarios WHERE rol = 'administrador')
  );

CREATE POLICY "admin_all_administradores" ON public.administradores
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.usuarios WHERE rol = 'administrador')
  );

CREATE POLICY "admin_all_carreras" ON public.carreras
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.usuarios WHERE rol = 'administrador')
  );

CREATE POLICY "admin_all_asignaturas" ON public.asignaturas
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.usuarios WHERE rol = 'administrador')
  );

CREATE POLICY "admin_all_periodos" ON public.periodos_lectivos
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.usuarios WHERE rol = 'administrador')
  );

CREATE POLICY "admin_all_secciones" ON public.secciones
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.usuarios WHERE rol = 'administrador')
  );

CREATE POLICY "admin_all_inscripciones" ON public.inscripciones
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.usuarios WHERE rol = 'administrador')
  );


-- ================================================================
-- POLÍTICAS: LECTURA PÚBLICA (catálogos)
-- ================================================================

CREATE POLICY "public_read_carreras" ON public.carreras
  FOR SELECT USING (true);

CREATE POLICY "public_read_asignaturas" ON public.asignaturas
  FOR SELECT USING (true);

CREATE POLICY "public_read_periodos" ON public.periodos_lectivos
  FOR SELECT USING (true);

CREATE POLICY "public_read_secciones" ON public.secciones
  FOR SELECT USING (true);


-- ================================================================
-- POLÍTICAS: ESTUDIANTE
-- ================================================================

CREATE POLICY "estudiante_select_own_profile" ON public.estudiantes
  FOR SELECT USING (
    usuario_id = auth.uid()
  );

CREATE POLICY "estudiante_update_own_profile" ON public.estudiantes
  FOR UPDATE USING (
    usuario_id = auth.uid()
  );

CREATE POLICY "estudiante_select_own_inscripciones" ON public.inscripciones
  FOR SELECT USING (
    estudiante_id IN (
      SELECT id FROM public.estudiantes WHERE usuario_id = auth.uid()
    )
  );

CREATE POLICY "estudiante_insert_own_inscripciones" ON public.inscripciones
  FOR INSERT WITH CHECK (
    estudiante_id IN (
      SELECT id FROM public.estudiantes WHERE usuario_id = auth.uid()
    )
  );


-- ================================================================
-- POLÍTICAS: DOCENTE
-- ================================================================

CREATE POLICY "docente_select_own_profile" ON public.profesores
  FOR SELECT USING (
    usuario_id = auth.uid()
  );

CREATE POLICY "docente_update_own_profile" ON public.profesores
  FOR UPDATE USING (
    usuario_id = auth.uid()
  );

CREATE POLICY "docente_select_own_secciones" ON public.secciones
  FOR SELECT USING (
    profesor_id IN (
      SELECT id FROM public.profesores WHERE usuario_id = auth.uid()
    )
  );

CREATE POLICY "docente_select_inscripciones_of_own_sections" ON public.inscripciones
  FOR SELECT USING (
    seccion_id IN (
      SELECT s.id FROM public.secciones s
      JOIN public.profesores p ON s.profesor_id = p.id
      WHERE p.usuario_id = auth.uid()
    )
  );


-- ================================================================
-- VERIFICACIÓN (ejecutar para comprobar)
-- ================================================================

-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies
-- WHERE schemaname = 'public';
