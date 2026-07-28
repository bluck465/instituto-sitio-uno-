-- ================================================================
-- ITSU - Tablas relacionales del dominio académico
-- Ejecutar en Supabase SQL Editor
-- ================================================================

-- ── CARRERAS ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.carreras (
  id         SERIAL PRIMARY KEY,
  codigo     VARCHAR(10)  NOT NULL UNIQUE,
  nombre     VARCHAR(150) NOT NULL,
  duracion   VARCHAR(50),
  estado     VARCHAR(20)  NOT NULL DEFAULT 'activa'
             CHECK (estado IN ('activa', 'inactiva'))
);

INSERT INTO public.carreras (codigo, nombre, duracion, estado) VALUES
  ('PROG', 'Programación',              '2 años', 'activa'),
  ('ELEC', 'Electrónica',               '2 años', 'activa'),
  ('INDU', 'Industrial',                '2 años', 'activa'),
  ('MECA', 'Mecatrónica',               '2 años', 'activa');


-- ── ASIGNATURAS ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.asignaturas (
  id           SERIAL PRIMARY KEY,
  carrera_id   INT          NOT NULL REFERENCES public.carreras(id),
  codigo       VARCHAR(20)  NOT NULL UNIQUE,
  nombre       VARCHAR(150) NOT NULL,
  creditos     INT          NOT NULL DEFAULT 4
               CHECK (creditos > 0),
  estado       VARCHAR(20)  NOT NULL DEFAULT 'activa'
               CHECK (estado IN ('activa', 'inactiva'))
);

INSERT INTO public.asignaturas (carrera_id, codigo, nombre, creditos) VALUES
  -- 1er trimestre
  ((SELECT id FROM public.carreras WHERE codigo = 'PROG'), 'PROG-101', 'Programación Fundamental con Python', 6),
  ((SELECT id FROM public.carreras WHERE codigo = 'PROG'), 'PROG-102', 'Fundamentos de Hardware y Redes', 5),
  ((SELECT id FROM public.carreras WHERE codigo = 'PROG'), 'PROG-103', 'Inteligencia Artificial', 5),
  ((SELECT id FROM public.carreras WHERE codigo = 'PROG'), 'PROG-104', 'Fundamentos de Sistemas y Entornos de Desarrollo', 5),
  -- 2do trimestre
  ((SELECT id FROM public.carreras WHERE codigo = 'PROG'), 'PROG-201', 'Base de Datos Relacionales SQL y No Relacionales', 6),
  ((SELECT id FROM public.carreras WHERE codigo = 'PROG'), 'PROG-202', 'Fundamentos de DWF: HTML, CSS y JS', 6),
  ((SELECT id FROM public.carreras WHERE codigo = 'PROG'), 'PROG-203', 'Programación Orientada a Objetos (POO)', 6),
  -- 3er trimestre
  ((SELECT id FROM public.carreras WHERE codigo = 'PROG'), 'PROG-301', 'Desarrollo de Aplicaciones Móviles', 6),
  ((SELECT id FROM public.carreras WHERE codigo = 'PROG'), 'PROG-302', 'Desarrollo Web Full Stack', 6),
  ((SELECT id FROM public.carreras WHERE codigo = 'PROG'), 'PROG-303', 'Proyecto Integrador de Software', 6);


-- ── PERÍODOS LECTIVOS ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.periodos_lectivos (
  id      SERIAL PRIMARY KEY,
  codigo  VARCHAR(20) NOT NULL UNIQUE,
  anio    INT         NOT NULL,
  trimestre INT       NOT NULL CHECK (trimestre BETWEEN 1 AND 3),
  activo  BOOLEAN     NOT NULL DEFAULT false,
  CONSTRAINT uq_periodo UNIQUE (anio, trimestre)
);


-- ── SECCIONES ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.secciones (
  id              SERIAL PRIMARY KEY,
  asignatura_id   INT          NOT NULL REFERENCES public.asignaturas(id),
  periodo_id      INT          NOT NULL REFERENCES public.periodos_lectivos(id),
  profesor_id     UUID         NOT NULL REFERENCES public.profesores(id),
  codigo_seccion  VARCHAR(20)  NOT NULL,
  aula            VARCHAR(50),
  cupo_maximo     INT          NOT NULL DEFAULT 30
                  CHECK (cupo_maximo > 0),
  CONSTRAINT uq_seccion UNIQUE (asignatura_id, periodo_id, codigo_seccion)
);


-- ── INSCRIPCIONES ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.inscripciones (
  id              SERIAL PRIMARY KEY,
  estudiante_id   UUID        NOT NULL REFERENCES public.estudiantes(id),
  seccion_id      INT         NOT NULL REFERENCES public.secciones(id),
  fecha_inscripcion TIMESTAMP NOT NULL DEFAULT now(),
  nota_final      NUMERIC(4,2),
  estado_materia  VARCHAR(20) NOT NULL DEFAULT 'cursando'
                  CHECK (estado_materia IN ('cursando','aprobado','reprobado','retirado')),
  CONSTRAINT uq_inscripcion UNIQUE (estudiante_id, seccion_id)
);
