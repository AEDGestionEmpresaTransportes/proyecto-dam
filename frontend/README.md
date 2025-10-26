# 📦 Sistema de Gestión de Transporte - DAM

Sistema web completo para la gestión de transporte y distribución de paquetes, desarrollado con React + Vite en el frontend y API REST en el backend.

## 📋 Descripción

Aplicación CRUD completa que permite gestionar de forma integral:
- **Conductores**: Registro con datos personales, salario y municipio
- **Vehículos**: Control de flota con matrícula, modelo, tipo y potencia
- **Municipios**: Catálogo de ubicaciones por código postal
- **Paquetes**: Gestión de envíos con destinatarios y rutas
- **Asignaciones**: Relación conductor-vehículo por fecha

## ✨ Características

- ✅ **CRUD completo** en todas las entidades
- 🔄 **Operaciones en tiempo real** con la API REST
- 📱 **Diseño responsive** adaptado a móviles y tablets
- ✏️ **Validaciones de formularios** (DNI, teléfono, matrícula, código postal)
- 🎨 **Interfaz moderna** con animaciones y feedback visual
- 🔗 **Relaciones entre entidades** (conductor-municipio, paquete-conductor, etc.)
- ⚡ **Arquitectura modular** con hooks personalizados
- 🎯 **Selección de filas** con highlight visual

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 19.1.1** - Librería UI
- **Vite 7.1.7** - Build tool y dev server
- **React Compiler** - Optimización automática
- **CSS3** - Estilos personalizados con animaciones
- **Fetch API** - Comunicación con backend

### Backend (API REST)
- Base URL: `http://localhost:8080/api/`
- Endpoints RESTful para CRUD

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── TabsContainer.jsx          # Navegación principal
│   │   ├── comunes/
│   │   │   ├── BotonesCRUD.jsx        # Botones reutilizables
│   │   │   ├── botonesCRUD.css
│   │   │   ├── formularioBase.css
│   │   │   └── tablaBase.css
│   │   └── tabs/
│   │       ├── ConductoresTab.jsx     # Gestión de conductores
│   │       ├── VehiculosTab.jsx       # Gestión de vehículos
│   │       ├── MunicipiosTab.jsx      # Gestión de municipios
│   │       ├── PaquetesTab.jsx        # Gestión de paquetes
│   │       ├── ConduceTab.jsx         # Asignaciones
│   │       ├── conductor/
│   │       │   ├── FormularioConductor.jsx
│   │       │   └── VistaConductor.jsx
│   │       ├── vehiculo/
│   │       │   ├── FormularioVehiculo.jsx
│   │       │   └── VistaVehiculo.jsx
│   │       ├── municipio/
│   │       │   ├── FormularioMunicipio.jsx
│   │       │   └── VistaMunicipios.jsx
│   │       ├── paquete/
│   │       │   ├── FormularioPaquete.jsx
│   │       │   └── VistaPaquete.jsx
│   │       └── conduce/
│   │           ├── FormularioConduce.jsx
│   │           └── VistaConduces.jsx
│   ├── hooks/
│   │   ├── useConductores.js          # Hook para conductores
│   │   ├── useVehiculos.js            # Hook para vehículos
│   │   ├── useMunicipios.js           # Hook para municipios
│   │   ├── usePaquete.js              # Hook para paquetes
│   │   ├── useConduces.js             # Hook para asignaciones
│   │   └── useCRUD.js                 # Hook genérico CRUD
│   ├── services/
│   │   ├── conductoresAPI.js          # API conductores
│   │   ├── vehiculosAPI.js            # API vehículos
│   │   ├── municipiosAPI.js           # API municipios
│   │   ├── paqueteAPI.js              # API paquetes
│   │   └── conducesAPI.js             # API asignaciones
│   ├── utils/
│   │   ├── validaciones.js            # Funciones de validación
│   │   └── mensajes.js                # Mensajes de la app
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx                        # Componente principal
│   ├── app.css
│   ├── main.jsx                       # Punto de entrada
│   └── index.css
├── public/
│   └── ico.svg
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Instalación

### Prerrequisitos
- Node.js 16+ 
- npm o yarn
- Backend API REST ejecutándose en `http://localhost:8080`

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/sistema-gestion-dam.git
cd sistema-gestion-dam/frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar el backend** (asegúrate de que el backend esté corriendo en el puerto 8080)

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:5173
```

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Genera build de producción
npm run preview  # Preview del build de producción
npm run lint     # Ejecuta el linter
```

## 🔧 Configuración

### Variables de Entorno

Si necesitas cambiar la URL del backend, modifica las constantes en los archivos API:

```javascript
// En cada archivo *API.js
const API_URL = "http://localhost:8080/api/[recurso]";
```

### Validaciones

Las validaciones se encuentran en `src/utils/validaciones.js`:
- **DNI**: 8 dígitos + letra mayúscula (ej: 12345678A)
- **Teléfono**: 9 dígitos empezando por 6-9 (ej: 612345678)
- **Matrícula**: 4 dígitos + 3 letras (ej: 1234ABC)
- **Código Postal**: 5 dígitos (01000-52999)

## 🎯 Funcionalidades por Módulo

### 👤 Conductores
- Crear, editar y eliminar conductores
- Campos: DNI, nombre, teléfono, dirección, salario, municipio
- Validación de DNI español
- Asignación a municipio

### 🚗 Vehículos
- Gestión completa de flota
- Campos: matrícula, modelo, tipo, potencia
- Validación de matrícula española

### 🏘️ Municipios
- Catálogo de ubicaciones
- Campos: código postal, nombre
- Validación de código postal

### 📦 Paquetes
- Control de envíos
- Campos: código, descripción, destinatario, dirección
- Asignación a municipio y conductor
- Generación automática de código

### 🔗 Asignaciones (Conduce)
- Relación conductor-vehículo-fecha
- Visualización completa de asignaciones
- Control de fechas

## 🎨 Características de UI/UX

- **Tabs navegables** con estado activo visual
- **Tablas interactivas** con hover y selección
- **Formularios modales** con validación en tiempo real
- **Mensajes de feedback** (éxito, error, carga)
- **Botones CRUD** con iconos y estados disabled
- **Animaciones suaves** en transiciones
- **Diseño responsive** para móviles y tablets
- **Header sticky** en navegación de tabs

## 🔌 API Endpoints

### Conductores
```
GET    /api/conductores        - Obtener todos
GET    /api/conductores/{dni}  - Obtener por DNI
POST   /api/conductores        - Crear
PUT    /api/conductores/{dni}  - Actualizar
DELETE /api/conductores/{dni}  - Eliminar
```

### Vehículos
```
GET    /api/vehiculos              - Obtener todos
GET    /api/vehiculos/{matricula}  - Obtener por matrícula
POST   /api/vehiculos              - Crear
PUT    /api/vehiculos/{matricula}  - Actualizar
DELETE /api/vehiculos/{matricula}  - Eliminar
```

### Municipios
```
GET    /api/municipios          - Obtener todos
GET    /api/municipios/{codigo} - Obtener por código
POST   /api/municipios          - Crear
PUT    /api/municipios/{codigo} - Actualizar
DELETE /api/municipios/{codigo} - Eliminar
```

### Paquetes
```
GET    /api/paquetes          - Obtener todos
GET    /api/paquetes/{codigo} - Obtener por código
POST   /api/paquetes          - Crear
PUT    /api/paquetes/{codigo} - Actualizar
DELETE /api/paquetes/{codigo} - Eliminar
```

### Asignaciones
```
GET    /api/conduces     - Obtener todas
POST   /api/conduces     - Crear asignación
```

## 🏗️ Arquitectura y Patrones

### Custom Hooks
- **useCRUD**: Hook genérico reutilizable para operaciones CRUD
- **useConduces, useConductores, etc.**: Hooks específicos por entidad
- Separación de lógica de negocio de la UI

### Componentes Reutilizables
- **BotonesCRUD**: Botones de acción consistentes
- **Formularios base**: Estilos compartidos
- **Tablas base**: Estructura de tabla común

### Servicios API
- Capa de abstracción para llamadas al backend
- Manejo centralizado de errores
- Funciones async/await

## 🐛 Manejo de Errores

- Validación de campos en formularios
- Mensajes descriptivos de error
- Confirmaciones antes de eliminar
- Feedback visual en operaciones

## 📱 Responsive Design

Breakpoints:
- **Desktop**: > 768px
- **Tablet**: 480px - 768px
- **Mobile**: < 480px

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

## ✍️ Autores

Grupo 3, 2º DAM Nocturno
- Antonio Cabrera
- Carlos Rojas García
- David García Pasamar
- Jerry Wong Cal

## 🙏 Agradecimientos

- Proyecto desarrollado como parte del módulo DAM (Desarrollo de Aplicaciones Multiplataforma)
- Vite y React por las herramientas de desarrollo

---

⭐ Si te ha gustado este proyecto, ¡dale una estrella en GitHub!
