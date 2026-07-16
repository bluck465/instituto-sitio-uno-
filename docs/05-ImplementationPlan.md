# 05 — Implementation Plan
### Fases, Tareas y Prompts del Desarrollo ITSU

---

## Oleada 1 — Cimientos ✅ COMPLETADA

### Fase 1.1: Setup del Proyecto

| Tarea | Estado |
|:---|:---|
| Crear proyecto React + Vite | Completada |
| Configurar alias `@` en `vite.config.js` | Completada |
| Crear estructura de carpetas (features, services, contexts, router) | Completada |
| Configurar ESLint | Completada |

### Fase 1.2: Sistema de Autenticacion

| Tarea | Estado |
|:---|:---|
| Crear `supabaseClient.js` — cliente unico de Supabase | Completada |
| Crear `.env` con credenciales | Completada |
| Crear contracts (`authContract.js`, `academicContract.js`) | Completada |
| Crear providers (`supabaseAuth.js`, `supabaseAcademic.js`) | Completada |
| Crear `dbProvider.js` — switch de proveedores | Completada |
| Crear `errorHandler.js` — mensajes en espanol | Completada |
| Crear `AuthContext.jsx` — contexto de autenticacion | Completada |
| Crear `LoginForm.jsx` | Completada |
| Crear `RegisterForm.jsx` (version inicial) | Completada |
| Crear `ProtectedRoute.jsx` | Completada |
| Crear `AuthOverlay.jsx` — modal de login/register | Completada |

### Fase 1.3: Landing Page

| Tarea | Estado |
|:---|:---|
| Crear `LandingPage.jsx` | Completada |
| Crear `BrandHeader.jsx` — header sticky con logo | Completada |
| Crear `HeroSection.jsx` | Completada |
| Crear `FooterSection.jsx` | Completada |
| Crear `App.css` — estilos globales | Completada |

### Fase 1.4: Dashboard Basico

| Tarea | Estado |
|:---|:---|
| Crear `DashboardLayout.jsx` — layout 2 columnas | Completada |
| Crear `DashboardPage.jsx` — dashboard del estudiante | Completada |
| Crear `Sidebar.jsx` — navegacion lateral | Completada |
| Crear `EnrolledClasses.jsx` — materias inscritas | Completada |
| Crear `DocentePage.jsx` — placeholder | Completada |
| Crear `AdminPage.jsx` — placeholder | Completada |

### Prompts usados en Oleada 1

```
"creame un login con supabase"
"agregame un register"
"creame el dashboard del estudiante"
"agregame las rutas protegidas"
"creame el header con el logo"
"creame el footer"
```

---

## Oleada 2 — Registro y Seguridad ⏳ EN PROGRESO

### Fase 2.1: Stepper de Registro

| Tarea | Estado |
|:---|:---|
| Crear `RegisterStepper.jsx` — indicador visual de pasos | Pendiente |
| Crear `ProfileStepFields.jsx` — campos dinamicos por rol | Pendiente |
| Modificar `RegisterForm.jsx` — 2 pasos internos | Pendiente |
| Agregar estilos del stepper en `App.css` | Pendiente |

### Fase 2.2: Seguridad por Roles

| Tarea | Estado |
|:---|:---|
| Validar dominio `@itsu.edu.ve` para profesores/admin | Pendiente |
| Modificar `register()` — setear `activo: false` para profesor/admin | Pendiente |
| Modificar `login()` — verificar `activo` despues de autenticar | Pendiente |
| Crear mensaje de error "Cuenta pendiente de aprobacion" | Pendiente |

### Fase 2.3: Tablas de Perfil

| Tarea | Estado |
|:---|:---|
| Ejecutar SQL: agregar columnas a `profesores` | Pendiente |
| Ejecutar SQL: agregar columnas a `administradores` | Pendiente |
| Crear `aprobarUsuario()` en `supabaseAuth.js` | Pendiente |

### Fase 2.4: Admin — Aprobacion de Usuarios

| Tarea | Estado |
|:---|:---|
| Modificar `AdminPage.jsx` — seccion "Pendientes de aprobacion" | Pendiente |
| Agregar botones Aprobar/Rechazar | Pendiente |
| Conectar con `supabaseAuth.js` | Pendiente |

### Fase 2.5: Limpieza

| Tarea | Estado |
|:---|:---|
| Eliminar `EstudianteProfileForm.jsx` | Pendiente |
| Eliminar `DocenteProfileForm.jsx` | Pendiente |
| Eliminar `AdministradorProfileForm.jsx` | Pendiente |
| Eliminar `ProfileLayout.jsx` | Pendiente |
| Eliminar `EstudianteProfilePage.jsx` | Pendiente |
| Eliminar `DocenteProfilePage.jsx` | Pendiente |
| Eliminar `AdministradorProfilePage.jsx` | Pendiente |
| Modificar `routes.jsx` — eliminar rutas `/profile/*` | Pendiente |

### Fase 2.6: Bugs Pendientes

| Tarea | Estado |
|:---|:---|
| Fix `supabaseAcademic.js` — `.eq('id', user.id)` a `.eq('usuario_id', user.id)` | Pendiente |
| Fix `AuthContext.jsx` — `logout()` con `supabase.auth.signOut()` | Pendiente |
| Conectar `errorHandler.js` en `AuthContext` | Pendiente |
| Agregar `VITE_API_BASE_URL` a `.env` | Pendiente |

### Prompts usados en Oleada 2

```
"aplica esto" (supabaseClient.js con console.warn en vez de throw)
"dame una solucion para poder conectar las apis de forma profesional a mi codigo front end"
"creame la imagen las tablas a ver"
"y la de completa tu perfil que haya dos opciones la de administrador y profesor"
"y el de profesor como seria que mas le falta a la tabla"
"puede tener una combinacion aprobacion manual y dominio de correo restringido"
```

---

## Oleada 3 — Academico y Biblioteca ⏳ PENDIENTE

### Fase 3.1: CRUD de Asignaturas

| Tarea | Estado |
|:---|:---|
| Crear `asignaturasService.js` | Pendiente |
| Crear `AsignaturasPage.jsx` (admin) | Pendiente |
| Crear formulario de crear/editar asignatura | Pendiente |
| Crear lista de asignaturas con busqueda | Pendiente |

### Fase 3.2: Secciones y Horarios

| Tarea | Estado |
|:---|:---|
| Crear `seccionesService.js` | Pendiente |
| Crear `SeccionesPage.jsx` (admin) | Pendiente |
| Crear formulario de crear seccion (asignatura + docente + horario) | Pendiente |
| Asignar docentes a secciones | Pendiente |

### Fase 3.3: Inscripciones

| Tarea | Estado |
|:---|:---|
| Crear `inscripcionesService.js` | Pendiente |
| Estudiante se inscribe en secciones | Pendiente |
| Admin gestiona inscripciones | Pendiente |
| Verificar cupos disponibles | Pendiente |

### Fase 3.4: Biblioteca Digital

| Tarea | Estado |
|:---|:---|
| Crear `materialesService.js` | Pendiente |
| Crear `MaterialesPage.jsx` (estudiante) | Pendiente |
| Crear upload de archivos (docente) | Pendiente |
| Conectar con Supabase Storage | Pendiente |
| Crear busqueda y filtros | Pendiente |
| Crear descarga de archivos | Pendiente |

### Fase 3.5: Dashboard del Docente

| Tarea | Estado |
|:---|:---|
| Modificar `DocentePage.jsx` — mostrar secciones asignadas | Pendiente |
| Crear vista de materiales por seccion | Pendiente |
| Crear formulario de upload de material | Pendiente |

### Prompts usados en Oleada 3 (proyectados)

```
"creame el CRUD de asignaturas"
"creame el upload de materiales a la biblioteca"
"conecta con supabase storage para archivos"
"creame la busqueda de materiales"
"mostra las secciones asignadas al docente"
```

---

## Oleada 4 — Horarios, Asistencias y Notas ⏳ PENDIENTE (3 meses)

### Fase 4.1: Horarios de Clases (Mes 1)

| Tarea | Estado |
|:---|:---|
| Crear tabla `horarios` en Supabase | Pendiente |
| Crear `horariosService.js` | Pendiente |
| Crear `HorariosPage.jsx` (estudiante) — vista semanal | Pendiente |
| Crear `HorariosPage.jsx` (docente) — gestionar horarios | Pendiente |
| Crear `HorariosPage.jsx` (admin) — CRUD de horarios | Pendiente |
| Vista de calendario con colores por materia | Pendiente |
| Filtro por dia de la semana | Pendiente |

### Fase 4.2: Control de Asistencias (Mes 2)

| Tarea | Estado |
|:---|:---|
| Crear tabla `asistencias` en Supabase | Pendiente |
| Crear `asistenciasService.js` | Pendiente |
| Crear `AsistenciasPage.jsx` (docente) — marcar asistencia | Pendiente |
| Crear `AsistenciasPage.jsx` (estudiante) — ver historial | Pendiente |
| Crear `AsistenciasPage.jsx` (admin) — reportes | Pendiente |
| Marcar presente/ausente/justificado | Pendiente |
| Estadisticas de asistencia por materia | Pendiente |
| Alerta de inasistencias (> 3 seguidas) | Pendiente |

### Fase 4.3: Carga de Calificaciones (Mes 3)

| Tarea | Estado |
|:---|:---|
| Crear tabla `calificaciones` en Supabase | Pendiente |
| Crear `calificacionesService.js` | Pendiente |
| Crear `CalificacionesPage.jsx` (docente) — cargar notas | Pendiente |
| Crear `CalificacionesPage.jsx` (estudiante) — ver notas | Pendiente |
| Crear `CalificacionesPage.jsx` (admin) — reportes | Pendiente |
| Calificacion por unidad tematica | Pendiente |
| Promedio automatico por materia | Pendiente |
| Escala de calificacion (0-20) | Pendiente |
| Boleta de calificaciones | Pendiente |

### Prompts usados en Oleada 4 (proyectados)

```
"creame el modulo de horarios"
"creame el control de asistencias"
"creame la carga de calificaciones"
"mostra las notas del estudiante en el dashboard"
"creame un reporte de asistencia por materia"
```

---

## Resumen de Oleadas

| Oleada | Fases | Archivos | Estado |
|:---|:---:|:---:|:---|
| **1 — Cimientos** | 4 | ~20 | ✅ Completada |
| **2 — Registro y Seguridad** | 6 | ~12 | ⏳ En progreso |
| **3 — Academico y Biblioteca** | 5 | ~15 | ⏳ Pendiente |
| **4 — Horarios, Asistencias, Notas** | 3 | ~18 | ⏳ Pendiente (3 meses) |

---

## Arquitectura de Capas (referencia rapida)

```
UI (Componentes React)
  │
  ▼
Feature Services (authService.js, dashboardService.js)
  │
  ▼
Context (AuthContext.jsx)
  │
  ▼
Services Layer (index.js → dbProvider.js)
  │
  ▼
Contracts (authContract.js, academicContract.js)
  │
  ▼
Providers (supabaseAuth.js, supabaseAcademic.js)
  │
  ▼
Database (Supabase PostgreSQL)
```

---

## Comandos Utiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint
```

---

## Variables de Entorno

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
VITE_API_BASE_URL=https://placeholder-api.com
```

---

*Documentacion de implementacion — ITSU Project*
