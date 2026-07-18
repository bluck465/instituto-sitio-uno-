# ITSU — Future State Project Tree
### Arbol del proyecto: HOY vs MAÑANA

---

## Estado Actual (Lo que existe)

```
src/
│
├── lib/
│   └── supabaseClient.js                   ✅ Config: crea cliente Supabase
│
├── services/
│   │
│   │   ── CONTRATOS ──
│   ├── contracts/
│   │   ├── authContract.js                 ✅ login(), register(), saveProfile(), getProfile(), logout()
│   │   └── academicContract.js             ✅ getDashboard(), getSubjects()
│   │
│   │   ── IMPLEMENTACIONES ──
│   ├── providers/
│   │   └── supabase/
│   │       ├── supabaseAuth.js             ✅ Auth con Supabase
│   │       └── supabaseAcademic.js         ✅ Dashboard y asignaturas
│   │
│   │   ── EL INTERRUPTOR ──
│   ├── dbProvider.js                       ✅ exporta supabase provider
│   │
│   │   ── UTILIDADES ──
│   ├── httpClient.js                       ✅ fetch wrapper (sin configurar)
│   ├── errorHandler.js                     ✅ 18 mensajes en español
│   └── index.js                            ✅ barrel export
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx               ✅ Login con redirect por rol
│   │   │   ├── RegisterForm.jsx            ⏳ Stepper pendiente
│   │   │   ├── AuthOverlay.jsx             ✅ Modal login/register
│   │   │   └── FormError.jsx               ✅ Componente de error
│   │   └── services/
│   │       └── authService.js              ✅ login, register, saveProfile, getProfile
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx                 ✅ Navegacion lateral por rol
│   │   │   └── EnrolledClasses.jsx         ✅ Materias inscritas
│   │   └── services/
│   │       └── dashboardService.js         ✅ getDashboardData()
│   │
│   └── profile/                            ⏳ SE ELIMINA (se integra en RegisterForm)
│       └── components/
│           ├── EstudianteProfileForm.jsx
│           ├── DocenteProfileForm.jsx
│           ├── AdministradorProfileForm.jsx
│           └── ProfileLayout.jsx
│
├── components/
│   ├── BrandHeader.jsx                     ✅ Header sticky con logo
│   ├── HeroSection.jsx                     ✅ Seccion principal
│   ├── HeroCopy.jsx                        ✅ Texto del hero
│   ├── HeroPanel.jsx                       ✅ Panel informativo
│   ├── SectionHeading.jsx                  ✅ Titulo de seccion
│   ├── ValueGrid.jsx                       ✅ Grid de valores
│   ├── SiteFooter.jsx                      ✅ Pie de pagina
│   └── index.js                            ✅ barrel export
│
├── contexts/
│   └── AuthContext.jsx                     ✅ Estado global de auth
│
├── hooks/
│   └── useHeaderScroll.js                  ✅ Comportamiento del header
│
├── layouts/
│   └── DashboardLayout.jsx                 ✅ Layout 2 columnas
│
├── pages/
│   ├── LandingPage.jsx                     ✅ Pagina principal
│   ├── AuthOverlay.jsx                     ✅ Modal de auth
│   ├── DashboardPage.jsx                   ✅ Dashboard del estudiante
│   ├── DocentePage.jsx                     ⏳ Placeholder
│   ├── AdminPage.jsx                       ⏳ Placeholder
│   ├── EstudianteProfilePage.jsx           ⏳ SE ELIMINA
│   ├── DocenteProfilePage.jsx              ⏳ SE ELIMINA
│   └── AdministradorProfilePage.jsx        ⏳ SE ELIMINA
│
├── router/
│   ├── index.jsx                           ✅ createBrowserRouter
│   ├── routes.jsx                          ✅ Rutas definidas
│   └── ProtectedRoute.jsx                  ✅ Guard de autenticacion (BYPASS_AUTH=true)
│
├── App.jsx                                 ✅ Root component
├── App.css                                 ✅ Estilos globales
├── index.css                               ✅ Tipografia base
└── main.jsx                                ✅ Entry point
```

---

## Estado Futuro (Lo que se construira)

```
src/
│
├── lib/
│   └── supabaseClient.js                   ✅ Listo
│
├── services/
│   │
│   │   ── CONTRATOS ──
│   ├── contracts/
│   │   ├── authContract.js                 ✅ Listo
│   │   ├── academicContract.js             ✅ Listo
│   │   ├── libraryContract.js              🔨 getMaterials(), upload(), search()
│   │   ├── financeContract.js              🔨 getPayments(), getBalance()
│   │   ├── subjectsContract.js             🔨 getAll(), getById(), getFavorites()
│   │   └── scheduleContract.js             🔨 getSchedule(), getHorarios()
│   │
│   │   ── IMPLEMENTACIONES ──
│   ├── providers/
│   │   │
│   │   ├── supabase/                       # HOY: Supabase directo
│   │   │   ├── supabaseAuth.js             ✅ Listo
│   │   │   ├── supabaseAcademic.js         ✅ Listo
│   │   │   ├── supabaseLibrary.js          🔨 CRUD de materiales + Storage
│   │   │   ├── supabaseFinance.js          🔨 Pagos y aranceles
│   │   │   ├── supabaseSubjects.js         🔨 Asignaturas + favoritos
│   │   │   └── supabaseSchedule.js         🔨 Horarios y secciones
│   │   │
│   │   └── http-api/                       # MAÑANA: backend Express
│   │       ├── apiAuth.js                  🔨 fetch('/api/auth/login')
│   │       ├── apiAcademic.js              🔨 fetch('/api/dashboard')
│   │       ├── apiLibrary.js               🔨 (futuro)
│   │       └── apiFinance.js               🔨 (futuro)
│   │
│   │   ── EL INTERRUPTOR ──
│   ├── dbProvider.js                       ✅ Listo
│   │
│   │   ── UTILIDADES ──
│   ├── httpClient.js                       ✅ Listo (configurar VITE_API_BASE_URL)
│   ├── errorHandler.js                     ✅ Listo
│   └── index.js                            ✅ Listo
│
├── features/
│   │
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx               ✅ Listo
│   │   │   ├── RegisterForm.jsx            🔨 Stepper + validacion dominio
│   │   │   ├── RegisterStepper.jsx         🔨 Stepper visual (nuevo)
│   │   │   ├── ProfileStepFields.jsx       🔨 Campos dinamicos por rol (nuevo)
│   │   │   ├── AuthOverlay.jsx             ✅ Listo
│   │   │   └── FormError.jsx               ✅ Listo
│   │   └── services/
│   │       └── authService.js              ✅ Listo
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx                 ✅ Listo (agregar mas links)
│   │   │   ├── EnrolledClasses.jsx         ✅ Listo
│   │   │   ├── SummaryCards.jsx            🔨 Tarjetas de resumen (nuevo)
│   │   │   └── QuickActions.jsx            🔨 Accesos rapidos (nuevo)
│   │   └── services/
│   │       └── dashboardService.js         ✅ Listo
│   │
│   ├── subjects/                           # NUEVO: Catalogo de materias
│   │   ├── components/
│   │   │   ├── SubjectCard.jsx             🔨 Tarjeta de materia
│   │   │   ├── SubjectGrid.jsx             🔨 Grid responsive
│   │   │   ├── SubjectDetail.jsx           🔨 Modal de detalle
│   │   │   ├── SubjectFilters.jsx          🔨 Filtros por categoria
│   │   │   └── FavoriteButton.jsx          🔨 Corazon de favorito
│   │   ├── hooks/
│   │   │   └── useFavorites.jsx            🔨 Hook de favoritos (localStorage)
│   │   └── services/
│   │       └── subjectService.js           🔨 getSubjects(), toggleFavorite()
│   │
│   ├── library/                            # NUEVO: Biblioteca digital
│   │   ├── components/
│   │   │   ├── MaterialList.jsx            🔨 Lista de materiales por materia
│   │   │   ├── MaterialCard.jsx            🔨 Tarjeta de material
│   │   │   ├── MaterialUpload.jsx          🔨 Upload de archivos (docente)
│   │   │   ├── MaterialPreview.jsx         🔨 Vista previa de documentos
│   │   │   └── MaterialSearch.jsx          🔨 Busqueda y filtros
│   │   └── services/
│   │       └── libraryService.js           🔨 CRUD + Storage
│   │
│   ├── schedule/                           # NUEVO: Horarios
│   │   ├── components/
│   │   │   ├── ScheduleGrid.jsx            🔨 Vista semanal (lun-vie)
│   │   │   ├── ScheduleCard.jsx            🔨 Bloque de horario
│   │   │   ├── ScheduleFilters.jsx         🔨 Filtro por dia/materia
│   │   │   └── ScheduleForm.jsx            🔨 Crear/editar horario (admin)
│   │   └── services/
│   │       └── scheduleService.js          🔨 CRUD de horarios
│   │
│   ├── attendance/                         # NUEVO: Asistencias
│   │   ├── components/
│   │   │   ├── AttendanceList.jsx          🔨 Lista de alumnos (docente)
│   │   │   ├── AttendanceMark.jsx          🔨 Marcar presente/ausente
│   │   │   ├── AttendanceHistory.jsx       🔨 Historial (estudiante)
│   │   │   └── AttendanceReport.jsx        🔨 Reportes (admin)
│   │   └── services/
│   │       └── attendanceService.js        🔨 CRUD de asistencias
│   │
│   ├── grades/                             # NUEVO: Calificaciones
│   │   ├── components/
│   │   │   ├── GradeTable.jsx              🔨 Tabla de notas (estudiante)
│   │   │   ├── GradeForm.jsx               🔨 Cargar notas (docente)
│   │   │   ├── GradeCard.jsx               🔨 Tarjeta de materia con nota
│   │   │   ├── GradeReport.jsx             🔨 Boleta de calificaciones
│   │   │   └── GradeStats.jsx              🔨 Estadisticas (promedio, ranking)
│   │   └── services/
│   │       └── gradeService.js             🔨 CRUD de calificaciones
│   │
│   ├── admin/                              # NUEVO: Panel de administracion
│   │   ├── components/
│   │   │   ├── UserList.jsx                🔨 Lista de usuarios
│   │   │   ├── UserCard.jsx                🔨 Tarjeta de usuario
│   │   │   ├── UserApproval.jsx            🔨 Aprobar/rechazar registros
│   │   │   ├── PeriodManager.jsx           🔨 Gestionar periodos lectivos
│   │   │   └── SectionManager.jsx          🔨 Gestionar secciones
│   │   └── services/
│   │       └── adminService.js             🔨 CRUD de usuarios y periodos
│   │
│   ├── finance/                            # NUEVO: Aranceles
│   │   ├── components/
│   │   │   ├── PaymentHistory.jsx          🔨 Historial de pagos
│   │   │   ├── TuitionStatus.jsx           🔨 Estado de arancel
│   │   │   ├── PaymentForm.jsx             🔨 Formulario de pago
│   │   │   └── InvoiceList.jsx             🔨 Facturas
│   │   └── services/
│   │       └── financeService.js           🔨 CRUD de pagos
│   │
│   └── profile/                            # SE ELIMINA
│       └── components/
│           ├── EstudianteProfileForm.jsx   ❌ ELIMINAR
│           ├── DocenteProfileForm.jsx      ❌ ELIMINAR
│           ├── AdministradorProfileForm.jsx❌ ELIMINAR
│           └── ProfileLayout.jsx           ❌ ELIMINAR
│
├── components/
│   │   ── LANDING PAGE ──
│   ├── BrandHeader.jsx                     ✅ Listo
│   ├── HeroSection.jsx                     ✅ Listo
│   ├── HeroCopy.jsx                        ✅ Listo
│   ├── HeroPanel.jsx                       ✅ Listo
│   ├── SectionHeading.jsx                  ✅ Listo
│   ├── ValueGrid.jsx                       ✅ Listo
│   ├── SiteFooter.jsx                      ✅ Listo
│   │
│   │   ── UI PRIMITIVAS (reutilizables) ──
│   └── ui/
│       ├── Button.jsx                      🔨 Boton con variantes
│       ├── Input.jsx                       🔨 Input con label/error
│       ├── Modal.jsx                       🔨 Modal generico
│       ├── Badge.jsx                       🔨 Etiqueta de estado
│       ├── Spinner.jsx                     🔨 Loading indicator
│       ├── EmptyState.jsx                  🔨 Estado vacio
│       └── index.js                        🔨 barrel export
│
├── contexts/
│   └── AuthContext.jsx                     ✅ Listo
│
├── hooks/
│   ├── useHeaderScroll.js                  ✅ Listo
│   ├── useFavorites.jsx                    🔨 Favoritos en localStorage
│   ├── useDebounce.jsx                     🔨 Debounce para busquedas
│   └── usePagination.jsx                   🔨 Paginacion de listas
│
├── layouts/
│   ├── DashboardLayout.jsx                 ✅ Listo
│   └── AuthLayout.jsx                      🔨 Layout para login/register
│
├── pages/
│   │   ── LANDING ──
│   ├── LandingPage.jsx                     ✅ Listo (agregar seccion de materias)
│   ├── SubjectsPage.jsx                    🔨 Pagina de materias (catalogo)
│   │
│   │   ── AUTH ──
│   ├── AuthOverlay.jsx                     ✅ Listo
│   │
│   │   ── DASHBOARD ESTUDIANTE ──
│   ├── DashboardPage.jsx                   ✅ Listo
│   ├── MyClassesPage.jsx                   🔨 Materias inscritas detalladas
│   ├── LibraryPage.jsx                     🔨 Biblioteca digital
│   ├── SchedulePage.jsx                    🔨 Mi horario
│   ├── AttendancePage.jsx                  🔨 Mis asistencias
│   ├── GradesPage.jsx                      🔨 Mis notas
│   │
│   │   ── DASHBOARD DOCENTE ──
│   ├── DocentePage.jsx                     🔨 Dashboard del docente
│   ├── DocenteClassesPage.jsx              🔨 Secciones asignadas
│   ├── DocenteAttendancePage.jsx           🔨 Registrar asistencia
│   ├── DocenteGradesPage.jsx               🔨 Cargar calificaciones
│   ├── DocenteMaterialPage.jsx             🔨 Subir materiales
│   │
│   │   ── DASHBOARD ADMIN ──
│   ├── AdminPage.jsx                       🔨 Dashboard del admin
│   ├── AdminUsersPage.jsx                  🔨 Gestionar usuarios
│   ├── AdminApprovalPage.jsx               🔨 Aprobar registros
│   ├── AdminPeriodsPage.jsx                🔨 Gestionar periodos
│   ├── AdminSectionsPage.jsx               🔨 Gestionar secciones
│   ├── AdminReportsPage.jsx                🔨 Reportes
│   │
│   │   ── PERFIL ──
│   └── ProfilePage.jsx                     🔨 Ver/editar perfil
│
├── router/
│   ├── index.jsx                           ✅ Listo
│   ├── routes.jsx                          ✅ Listo (agregar rutas nuevas)
│   └── ProtectedRoute.jsx                  ✅ Listo
│
├── App.jsx                                 ✅ Listo
├── App.css                                 ✅ Listo (agregar estilos nuevos)
├── index.css                               ✅ Listo
└── main.jsx                                ✅ Listo
```

---

## Resumen: Que falta vs Que ya tienes

### ✅ Ya tienes (completado)

| Modulo | Archivos | Estado |
|:---|:---:|:---|
| Auth (login, register, logout) | 6 | Completado |
| Landing Page | 7 | Completado |
| Dashboard basico | 4 | Completado |
| Services layer | 7 | Completado |
| Router y proteccion | 3 | Completado |
| Context y hooks | 2 | Completado |
| **Total** | **36** | |

### 🔨 Por construir

| Modulo | Archivos | Prioridad | Oleada |
|:---|:---:|:---|:---|
| Stepper de registro | 3 | Alta | 2 |
| Seguridad por roles | 2 | Alta | 2 |
| Admin — Aprobacion | 2 | Alta | 2 |
| UI Primitivas (Button, Input, Modal) | 6 | Alta | 3 |
| Catalogo de materias | 5 | Alta | 3 |
| Biblioteca digital | 5 | Alta | 3 |
| Horarios | 4 | Media | 4 |
| Asistencias | 4 | Media | 4 |
| Calificaciones | 5 | Media | 4 |
| Panel de admin completo | 5 | Media | 4 |
| Aranceles | 4 | Baja | 5 |
| **Total** | **45** | | |

### ❌ Por eliminar

| Archivo | Razon |
|:---|:---|
| EstudianteProfileForm.jsx | Se integra en RegisterForm |
| DocenteProfileForm.jsx | Se integra en RegisterForm |
| AdministradorProfileForm.jsx | Se integra en RegisterForm |
| ProfileLayout.jsx | Ya no existe pagina separada |
| EstudianteProfilePage.jsx | Se integra en RegisterForm |
| DocenteProfilePage.jsx | Se integra en RegisterForm |
| AdministradorProfilePage.jsx | Se integra en RegisterForm |

---

## Conteo final

| Metrica | Valor |
|:---|:---|
| Archivos actuales | 36 |
| Archivos por crear | 45 |
| Archivos por eliminar | 7 |
| Archivos totales futuros | ~74 |
| Modulos nuevos | 6 (subjects, library, schedule, attendance, grades, admin) |
| Oleadas restantes | 3 (2, 3, 4) |
| Tiempo estimado | 3 meses |
