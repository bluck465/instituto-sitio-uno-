# ITSU — Plataforma Academica Inteligente
### Instituto Tecnologico Sitio Uno

---

## Que es ITSU?

Una plataforma web que centraliza toda la gestion academica del instituto: registro de estudiantes, control de asistencias, calificaciones, biblioteca digital y comunicacion — todo desde un solo lugar.

---

## Que incluye el MVP

### 1. Registro y Acceso

| Funcionalidad | Detalle |
|:---|:---|
| Registro por roles | Estudiantes, docentes y administradores con formularios adaptados |
| Seguridad por rol | Solo correos institucionales para docentes y admins |
| Aprobacion manual | Los administradores aprueban el acceso de docentes y admins |
| Login seguro | JWT con sesiones protegidas |

### 2. Dashboard del Estudiante

| Funcionalidad | Detalle |
|:---|:---|
| Perfil completo | Datos personales y estado de matricula |
| Materias inscritas | Lista de materias del periodo actual |
| Biblioteca digital | Acceso a materiales por materia (PDFs, documentos, enlaces) |
| Descarga directa | Sin restricciones para materias inscritas |

### 3. Dashboard del Administrador

| Funcionalidad | Detalle |
|:---|:---|
| Gestion de usuarios | Ver, aprobar y gestionar cuentas |
| Aprobacion de docentes | Revisar y activar registros pendientes |
| Vista general | Resumen de actividad del instituto |

### 4. Landing Page

| Funcionalidad | Detalle |
|:---|:---|
| Presentacion institucional | Mensaje, valores y propuesta de valor |
| Responsive | Funciona en desktop y movil |
| Acceso rapido | Botones de login y registro destacados |

---

## Que NO incluye el MVP (se construye despues)

- App movil nativa
- Chat en tiempo real
- Notificaciones push
- Pasarela de pagos
- Reportes exportables

---

## Stack Tecnico

| Capa | Tecnologia |
|:---|:---|
| Frontend | React + Vite |
| Base de datos | Supabase (PostgreSQL) |
| Autenticacion | Supabase Auth + JWT |
| Almacenamiento | Supabase Storage |
| Despliegue | Vercel |

---

## Timeline de Desarrollo

### Oleada 1 — Completada
- Setup del proyecto
- Sistema de autenticacion
- Dashboard del estudiante

### Oleada 2 — En progreso
- Formulario de registro con stepper
- Seguridad por roles (correo institucional + aprobacion)
- Tablas de docentes y administradores

### Oleada 3 — Siguiente
- CRUD de asignaturas y secciones
- Biblioteca digital (upload, busqueda, descarga)
- Dashboard del administrador completo

---

## Que viene en los proximos 3 meses

| Mes | Funcionalidad | Impacto |
|:---|:---|:---|
| **Mes 1** | Horarios de clases | Los estudiantes ven sus horarios organizados por dia y hora |
| **Mes 2** | Control de asistencias | Los docentes registran asistencias, los estudiantes ven su historial |
| **Mes 3** | Carga de calificaciones | Los docentes suben notas, los estudiantes ven sus promedios |

---

## Criterios de Calidad

- Carga en menos de 2 segundos
- Responsive en movil y desktop
- Mensajes de error en espanol
- Sin errores en consola
- Datos protegidos con RLS en Supabase

---

## Para quienes es

| Usuario | Que gana |
|:---|:---|
| **Estudiante** | Acceso rapido a sus materias, materiales y calificaciones |
| **Docente** | Herramienta para cargar notas, subir materiales y ver asistencias |
| **Administrador** | Control total del instituto desde un solo panel |

---

*ITSU — Transformando la gestion academica del Instituto Tecnologico Sitio Uno.*
