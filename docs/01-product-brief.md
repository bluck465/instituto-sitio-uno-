# Product Brief — Instituto Tecnologico Sitio Uno (ITSU)

> **Versión:** 1.0  
> **Fecha:** Julio 2026  
> **Estado:** En desarrollo

---

## 1. Resumen Ejecutivo

**ITSU** (Instituto Tecnologico Sitio Uno) es una aplicación web de tipo SPA (Single Page Application) diseñada para digitalizar los procesos administrativos y académicos de un instituto tecnológico. El sistema opera bajo un modelo de **tres portales** que atienden a los diferentes actores de la comunidad educativa: estudiantes, docentes y personal administrativo (junto con otras futures y pages para automatizar el proceso de las clases dentro del intituto).

El producto transforma la presencia digital del instituto desde un sitio web estático hacia una plataforma interactiva con autenticación segura, gestión de datos en tiempo real y una arquitectura modular que permite escalabilidad sostenida.

**Tagline:** *"Sistema de Gestión Unificado para la transformación digital educativa."*

---

## 2. Problema que Resuelve

### Contexto actual

Los institutos tecnológicos enfrentan procesos administrativos y académicos que dependen en gran medida de herramientas manuales o sistemas fragmentados:

- **Procesos de inscripción presenciales** — Los aspirantes deben acudir físicamente al instituto, generando cuellos de botella y tiempos de espera innecesarios.
- **Gestión académica dispersa** — Las notas, horarios y materiales se manejan en hojas de cálculo o plataformas genéricas sin integración entre sí.
- **Comunicación fragmentada** — No existe un canal unificado donde estudiantes, docentes y administración se comuniquen de forma eficiente.
- **Falta de transparencia** — Los estudiantes no tienen acceso directo a su historial académico, estado de matrícula o información financiera.
- **Escalabilidad limitada** — Los procesos manuales no crecen con la demanda del instituto.

### Oportunidad

La digitalización de estos procesos permite:

- Reducir tiempos de atención en un 60-70%
- Eliminar errores humanos en carga de datos académicos
- Mejorar la experiencia del estudiante desde el primer contacto
- Generar datos analíticos para la toma de decisiones institucionales
- Posicionar al instituto como una entidad tecnológicamente avanzada

---

## 3. Solución Propuesta

ITSU propone una **arquitectura de tres portales** que cubre el ciclo completo de vida del estudiante dentro del instituto:

### Portal del Estudiante

- Registro y autenticación segura (JWT + Supabase Auth)
- Dashboard personal con perfil académico
- Consulta de historial académico e índice de rendimiento
- Estado de matrícula en tiempo real
- Vista de materias inscritas y horarios
- **Biblioteca digital** — Acceso a materiales de estudio organizados por materia (PDFs, documentos, enlaces, videos)
- Estado de cuenta y pagos para tener al dia los pago-movil del cel junto con el admin para llevar los datos

### Portal del Docente

- Gestión de secciones asignadas
- Carga y edición de calificaciones
- Registro de asistencia
- Publicación de materiales y recursos didácticos
- Comunicación con estudiantes

### Portal Administrativo

- Panel de control institucional
- Gestión de oferta académica (periodos, asignaturas, secciones)
- Control de matrículas y reinscripciones
- Administración de usuarios y roles (RBAC)
- Reportes y analíticas
- Auditoría de cambios

### Diferenciadores clave

| Característica | Descripción |
|:---|:---|
| **RBAC** | Control de acceso basado en roles con permisos granulares por portal |
| **Autenticación segura** | JWT con refresh tokens, almacenamiento persistente en localStorage |
| **Arquitectura modular** | Cada dominio (auth, académico, finanzas) opera como módulo independiente |
| **Mobile-first** | Diseño responsive que funciona en dispositivos móviles, tablets y desktop |
| **Biblioteca digital** | Repositorio de materiales de estudio accesible por materia, con control de visibilidad por docente |
| **Experiencia moderna** | SPA con lazy loading, transiciones suaves y Feedback en tiempo real |

---

## 4. Público Objetivo

### Personas del producto

| Persona | Descripción | Necesidades principales |
|:---|:---|:---|
| **Aspirante** | Persona interesada en inscribirse en el instituto | Conocer oferta académica, requisitos de admisión, proceso de inscripción, costos |
| **Estudiante activo** | Alumno matriculado en el instituto | Consultar notas, horarios, acceder a material de estudio, estado de matrícula, realizar pagos |
| **Docente** | Profesor que imparte asignaturas | Gestionar secciones, cargar calificaciones, publicar materiales, registrar asistencia |
| **Personal administrativo** | Staff del instituto (coordinación, dirección, secretaría) | Administrar oferta académica, controlar matrículas, generar reportes, auditar cambios |

### Journey del estudiante (fases de interacción)

```
Descubrimiento → Consideración → Inscripción → Matrícula → Formación → Egresado
```

1. **Descubrimiento**: El aspirante visita la landing page y conoce el instituto
2. **Consideración**: Explora programas, costos, requisitos
3. **Inscripción**: Crea cuenta y completa formulario de admisión
4. **Matrícula**: Tras la aprobación, selecciona asignaturas y confirma matrícula
5. **Formación**: Accede al dashboard, consulta notas, materiales, horarios
6. **Egresado**: Mantiene acceso al historial y certificaciones

---

## 5. Objetivos del Producto

### Objetivos institucionales

| Objetivo | Descripción |
|:---|:---|
| **Digitalización** | Eliminar procesos 100% presenciales para inscripción, consulta de notas y pagos |
| **Transparencia** | Dar acceso directo a los estudiantes a toda su información académica y financiera |
| **Eficiencia operativa** | Reducir tiempo de gestión administrativa en al menos un 50% |
| **Experiencia del usuario** | Ofrecer una interfaz moderna, intuitiva y accessible desde cualquier dispositivo |
| **Escalabilidad** | Construir una arquitectura que permita agregar nuevos módulos sin reescribir código existente |

### KPIs (Key Performance Indicators)

| Métrica | Meta | Periodo |
|:---|:---|:---|
| Tasa de inscripción digital | 80% de nuevas inscripciones realizadas online | 6 meses post-lanzamiento |
| Tiempo de carga de dashboard | < 2 segundos | Continuo |
| Uptime del sistema | 99.5% | Mensual |
| Tasa de satisfacción del estudiante | > 4.0/5.0 | Trimestral (encuesta) |
| Reducción de trámites presenciales | 60% menos visitas a oficinas administrativas | 12 meses |

---

## 6. Alcance del MVP

### Fase 1 — Cimientos (COMPLETADA ✅)

- [x] Setup del proyecto con React + Vite + React Router
- [x] Landing page institucional (header, hero, valores, footer)
- [x] Sistema de rutas con lazy loading
- [x] Autenticación visual (login + registro)
- [x] Contexto global de autenticación con JWT
- [x] Cliente HTTP con adjunción automática de token
- [x] Dashboard del estudiante (layout de dos columnas)
- [x] Manejo de errores API con mensajes amigables

### Fase 2 — Académico y Materiales (PENDIENTE)

- [ ] Conexión con Supabase (auth + database)
- [ ] CRUD de periodos lectivos y asignaturas
- [ ] Gestión de secciones y horarios
- [ ] Carga de calificaciones por parte de docentes
- [ ] Índice académico calculado automáticamente
- [ ] **Biblioteca digital** — Sistema de repositorio de materiales por materia:
  - [ ] Upload de archivos (PDF, documentos, imágenes, videos) por docentes
  - [ ] Organización por materia, unidad temática y tipo de recurso
  - [ ] Control de visibilidad (público, solo inscritos, oculto)
  - [ ] Búsqueda y filtrado de materiales
  - [ ] Vista previa de documentos sin descarga
  - [ ] Descarga controlada con registro de actividad
- [ ] RBAC completo por portal

### Fase 3 — Finanzas y Administración (PENDIENTE)

- [ ] Módulo de aranceles y facturación
- [ ] Pasarela de pagos integrada
- [ ] Estado de cuenta del estudiante
- [ ] Panel de administración con analíticas
- [ ] Sistema de auditoría y logs
- [ ] Reportes exportables (PDF/Excel)

### Fuera de alcance (actual)

- Aplicación móvil nativa (iOS/Android)
- Integración con sistemas de terceros (LMS, SII)
- Módulo de evaluación docente
- Sistema de notificaciones push
- Chat en tiempo real

---

## 7. Stack Tecnológico

### Frontend (en producción)

| Tecnología | Versión | Propósito |
|:---|:---|:---|
| React | 19.x | Librería de UI basada en componentes |
| Vite | 8.x | Bundler y dev server |
| React Router | 7.x | Enrutamiento SPA con lazy loading |

### Backend (en desarrollo)

| Tecnología | Propósito |
|:---|:---|
| Node.js | Runtime de JavaScript para lógica de negocio |
| Express/Fastify | Framework HTTP para APIs REST |
| JWT | Autenticación stateless |

### Base de datos y servicios

| Tecnología | Propósito |
|:---|:---|
| Supabase | PostgreSQL + Auth + Storage + Realtime |
| PostgreSQL | Base de datos relacional (a través de Supabase) |
| Supabase Auth | Autenticación con JWT, OAuth, magic links |
| Supabase Storage | Almacenamiento de archivos (materiales, avatares) |

### Infraestructura

| Servicio | Propósito |
|:---|:---|
| Git / GitHub | Control de versiones |
| Docker (futuro) | Contenedores para desarrollo y despliegue |
| Vercel / Netlify (futuro) | Hosting del frontend estático |

---

## 8. Cronograma de Desarrollo

### Oleada 1 — Cimientos ✅ COMPLETADA

| Dia | Tarea | Estado |
|:---|:---|:---|
| 1 | Setup proyecto, estructura React+Vite, migraciones iniciales | Completada |
| 2 | Autenticación con JWT, vista Login, almacenamiento token | Completada |
| 3 | Dashboard estudiante, perfil, materias inscritas | Completada |

### Oleada 2 — Académico y Materiales ⏳ PENDIENTE

| Dia | Tarea | Estado |
|:---|:---|:---|
| 4 | Conexión Supabase, RBAC, endpoints académicos, grilla horarios | Pendiente |
| 5 | **Biblioteca digital**: upload/download materiales, organizació por materia, control de visibilidad | Pendiente |

### Oleada 3 — Finanzas, Administración y Cierre ⏳ PENDIENTE

| Dia | Tarea | Estado |
|:---|:---|:---|
| 6 | Aranceles, facturación, conciliación de pagos | Pendiente |
| 7 | Admin dashboard, analíticas, refactorización global | Pendiente |

---

## 9. Métricas de Éxito

### Adopción

- Número de usuarios registrados por mes
- Tasa de conversión de aspirante a estudiante inscrito
- Porcentaje de trámites realizados online vs. presencial

### Satisfacción

- Net Promoter Score (NPS) entre estudiantes
- Tiempo promedio de resolución de consultas
- Número de tickets de soporte por mes

### Rendimiento técnico

- Tiempo de respuesta promedio de la API
- Tasa de errores HTTP (4xx, 5xx)
- Disponibilidad del sistema (uptime)
- Tiempo de carga de páginas principales

### Impacto institucional

- Reducción de costos operativos en atención al estudiante
- Tiempo promedio de proceso de inscripción (antes vs. después)
- Cantidad de reportes generados automáticamente vs. manualmente

---

## 10. Riesgos y Mitigaciones

| Riesgo | Impacto | Probabilidad | Mitigación |
|:---|:---|:---|:---|
| Backend no conectado a Supabase | Alto | Alta | Priorizar integración en Oleada 2, usar Supabase Client en frontend como puente temporal |
| Alcance del MVP excesivo | Medio | Media | Mantener foco en Fase 1 y 2 antes de avanzar a Fase 3 |
| Dependencia de un solo desarrollador por área | Alto | Media | Documentación técnica completa, code reviews, conocimiento compartido |
| Cambios en requisitos durante desarrollo | Medio | Alta | Metodología iterativa, sprints cortos, feedback continuo |
| Rendimiento de la aplicación con muchos usuarios | Bajo | Baja | Supabase maneja escalamiento, monitoreo de métricas desde el inicio |
| Seguridad de datos sensibles (calificaciones, pagos) | Alto | Baja | RBAC estricto, JWT con expiración, Supabase Row Level Security (RLS) |

---

## Apéndice

### Glosario

| Término | Definición |
|:---|:---|
| **SPA** | Single Page Application — aplicación web que carga una sola vez y navega sin recargar |
| **JWT** | JSON Web Token — estándar de autenticación stateless |
| **RBAC** | Role-Based Access Control — control de acceso basado en roles |
| **RLS** | Row Level Security — políticas de seguridad a nivel de fila en PostgreSQL |
| **MVP** | Minimum Viable Product — producto mínimo viable |
| **KPI** | Key Performance Indicator — indicador clave de desempeño |
| **CRUD** | Create, Read, Update, Delete — operaciones básicas de datos |

---

*Documento generado como parte de la planificación del proyecto ITSU.*
