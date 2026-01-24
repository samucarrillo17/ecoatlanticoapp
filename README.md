# Eco Atlántico 🌊
Eco Atlántico es una plataforma Full Stack diseñada para gestionar el impacto ambiental a través del voluntariado. Se parte de la problematica donde la fundacion no lograba captar jovenes para asistir a sus voluntariados, afirmaban que muchas veces habia el deseo pero no habia participacion. La aplicación conecta a jóvenes de diversas universidades con campañas y eventos ecológicos, utilizando un sistema de gamificación para incentivar la participación real y medible.

## ✨ Características Principales
### 👥 Gestión de Roles
**Administrador:** Control total sobre la creación de campañas, gestión de cupos y verificación de asistencia.

**Voluntario:** Acceso a inscripciones, perfil personalizado y panel de métricas de impacto.

## 🎮 Sistema de Gamificación e Impacto
**Puntos de Impacto**: Cada campaña otorga puntos específicos.

**Verificación de Asistencia:** Los puntos y horas solo se acreditan si el administrador marca al voluntario como "Asistido". Esto garantiza la veracidad del impacto generado.

**Panel de Estadísticas:** Visualización en tiempo real de:

- Total de horas de voluntariado.

- Historial de campañas inscritas.

- Acumulado de puntos de impacto.

## 🛠 Gestión de Campañas (Admin)
- **Creación Detallada:** Título, descripción, horarios, cupos, puntos, fecha y recomendaciones.

- **Estado de Publicación:** Las campañas se crean como "Privadas" por defecto, permitiendo al administrador revisarlas antes de lanzarlas al feed público.

- **Control de Cupos:** Gestión dinámica de la disponibilidad de plazas.



## 🚀 Stack Tecnológico
La aplicación utiliza un stack moderno enfocado en la escalabilidad, el tipado fuerte y una experiencia de usuario fluida:

- **Frontend:** React con Next.js (asumido por el uso de v0 y Shadcn).

- **Backend & Auth:** Supabase (Base de datos PostgreSQL, Autenticación y Storage para fotos de perfil).

- **Estilos:** Tailwind CSS & Shadcn/ui para componentes consistentes.

- **Formularios:** React Hook Form con validación de esquemas mediante Zod.

- **Tablas de Datos:** TanStack Table para filtrado avanzado de voluntarios por nombre.

- **Lenguaje:** TypeScript para un desarrollo robusto y libre de errores de tipado.

- **Diseño:** Potenciado por v0 para interfaces modernas y responsivas.

## 📋 Flujo de Usuario
**Para Voluntarios**
- **Registro/Login:** El usuario se registra vinculando su universidad.

- **Exploración:** Busca campañas activas en el feed.

- **Inscripción:** Se registra en eventos con cupos disponibles.

- **Acción y Cierre:** Tras asistir al evento, el admin valida su presencia y el voluntario ve reflejado su progreso en su panel de métricas.

**Para Administradores**
- **Dashboard:** Vista previa de sus publicaciones creadas.

- **Publicación:** Cambio de estado de campañas de "Privado" a "Público".

- **Control de Asistencia:** Interfaz de tabla para buscar voluntarios (vía TanStack Table) y marcar asistencia para liberar los puntos de impacto.

## 📈 Próximas Mejoras
-  Implementación de reportes descargables en PDF para los voluntarios.

-  Sistema de notificaciones vía email para recordar fechas de campañas.

-  Implementación visual del estado "Archivado" para campañas antiguas.

- Filtrado de campañas tanto para el perfil admin como el de voluntarios

- Accion de cancelar la inscripcion si el voluntario lo necesita

- Metricas actualizadas en el panel de administrador

- Obtencion de certificado al llegar a 10 horas totales de voluntariado y asi progresivamente


**Eco Atlántico - Transformando la conciencia ambiental en acciones reales.**
