# 📦 Sistema de Gestión de Paquetería - Proyecto Full Stack

> Proyecto de Desarrollo de Aplicaciones Multiplataforma (DAM)  
> Sistema completo de gestión de transporte y paquetería con arquitectura cliente-servidor

[![Java](https://img.shields.io/badge/Java-17+-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)

---

## 📋 Índice

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Ejecución del Proyecto](#-ejecución-del-proyecto)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Documentación Detallada](#-documentación-detallada)
- [Equipo de Desarrollo](#-equipo-de-desarrollo)
- [Licencia](#-licencia)

---

## 🎯 Descripción General

Sistema web completo para la gestión integral de una empresa de transporte y distribución de paquetes. Desarrollado con arquitectura **cliente-servidor**, implementando una **API REST** robusta en el backend y una **interfaz moderna y responsive** en el frontend.

### 🎓 Contexto Académico
Este proyecto ha sido desarrollado como trabajo del módulo de **Acceso a Datos** de 2º DAM, aplicando conocimientos de:
- Diseño de bases de datos relacionales
- Desarrollo de APIs REST
- Desarrollo de interfaces web modernas
- Arquitectura cliente-servidor
- Patrones de diseño (Repository, MVC)

---

## ✨ Características Principales

### Funcionalidades del Sistema

- 👤 **Gestión de Conductores**
  - Registro completo con datos personales
  - Asignación a municipios
  - Control de salarios
  - Validación de DNI español

- 🚗 **Gestión de Vehículos**
  - Control de flota (motos y coches)
  - Registro de características técnicas
  - Validación de matrículas españolas

- 🏘️ **Gestión de Municipios**
  - Catálogo de ubicaciones
  - Validación de códigos postales
  - Relación con conductores y paquetes

- 📦 **Gestión de Paquetes**
  - Control de envíos
  - Asignación a conductores
  - Seguimiento por municipio
  - Información de destinatarios

- 🔗 **Asignaciones de Conducción**
  - Registro conductor-vehículo-fecha
  - Historial de uso de vehículos
  - Control temporal

### Características Técnicas

✅ **API REST completa** con operaciones CRUD  
✅ **Base de datos relacional** con integridad referencial  
✅ **Interfaz responsive** adaptada a todos los dispositivos  
✅ **Validaciones en frontend y backend**  
✅ **Mensajes de feedback** en tiempo real  
✅ **Manejo de errores** robusto  
✅ **Arquitectura modular** y escalable  

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    NAVEGADOR (Cliente)                  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │           FRONTEND (React + Vite)                 │ │
│  │  - Interfaz de usuario moderna                    │ │
│  │  - Componentes reutilizables                      │ │
│  │  - Validaciones en cliente                        │ │
│  │  - Gestión de estado con hooks                    │ │
│  └─────────────────┬─────────────────────────────────┘ │
│                    │                                    │
└────────────────────┼────────────────────────────────────┘
                     │
                     │ HTTP/JSON
                     │ (Fetch API)
                     │
┌────────────────────▼────────────────────────────────────┐
│              SERVIDOR (Backend)                         │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │        API REST (Spring Boot)                     │ │
│  │  - Controllers (Endpoints HTTP)                   │ │
│  │  - Repositories (Acceso a datos)                  │ │
│  │  - Entities (Modelos JPA)                         │ │
│  │  - Validaciones en servidor                       │ │
│  └─────────────────┬─────────────────────────────────┘ │
│                    │                                    │
│                    │ JDBC                               │
│                    │                                    │
│  ┌─────────────────▼─────────────────────────────────┐ │
│  │           BASE DE DATOS (MySQL)                   │ │
│  │  - Tablas relacionales                            │ │
│  │  - Claves primarias y foráneas                    │ │
│  │  - Restricciones de integridad                    │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Flujo de Datos

1. **Usuario** interactúa con la interfaz React
2. **Frontend** realiza peticiones HTTP a la API REST
3. **Backend** procesa la petición, valida datos y consulta la BD
4. **MySQL** devuelve los datos al backend
5. **Backend** envía respuesta JSON al frontend
6. **Frontend** actualiza la interfaz con los datos recibidos

---

## 🛠️ Tecnologías Utilizadas

### Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Java** | 17+ | Lenguaje de programación |
| **Spring Boot** | 3.5.6 | Framework backend |
| **Spring Data JPA** | 3.5.6 | Persistencia ORM |
| **MySQL** | 8.0 | Base de datos relacional |
| **Lombok** | 1.18.40 | Reducción de boilerplate |
| **Maven** | - | Gestor de dependencias |

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.1.1 | Librería de UI |
| **Vite** | 7.1.7 | Build tool y dev server |
| **JavaScript (ES6+)** | - | Lenguaje de programación |
| **CSS3** | - | Estilos y animaciones |
| **Fetch API** | - | Comunicación HTTP |

### Herramientas de Desarrollo

- **IntelliJ IDEA** - Desarrollo backend
- **VS Code** - Desarrollo frontend
- **MySQL Workbench** - Gestión de BD
- **Postman** - Testing de API
- **Git & GitHub** - Control de versiones

---

## 📁 Estructura del Proyecto

```
sistema-gestion-paqueteria/
│
├── backend/                          # Servidor Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── org/example/paqueteriagestion/
│   │   │   │       ├── controller/          # Endpoints REST
│   │   │   │       ├── model/               # Entidades JPA
│   │   │   │       └── repository/          # Acceso a datos
│   │   │   └── resources/
│   │   │       └── application.properties   # Configuración
│   │   └── test/
│   ├── pom.xml                              # Dependencias Maven
│   └── README.md                            # Documentación backend
│
├── frontend/                         # Cliente React
│   ├── src/
│   │   ├── components/
│   │   │   ├── TabsContainer.jsx            # Navegación
│   │   │   ├── comunes/                     # Componentes reutilizables
│   │   │   └── tabs/                        # Módulos por entidad
│   │   ├── hooks/                           # Custom hooks
│   │   │   ├── useCRUD.js                   # Hook genérico CRUD
│   │   │   ├── useConductores.js
│   │   │   ├── useVehiculos.js
│   │   │   └── ...
│   │   ├── services/                        # Llamadas a la API
│   │   │   ├── conductoresAPI.js
│   │   │   ├── vehiculosAPI.js
│   │   │   └── ...
│   │   ├── utils/                           # Utilidades
│   │   │   ├── validaciones.js
│   │   │   └── mensajes.js
│   │   ├── styles/                          # Estilos globales
│   │   ├── App.jsx                          # Componente raíz
│   │   └── main.jsx                         # Punto de entrada
│   ├── public/
│   ├── package.json                         # Dependencias npm
│   ├── vite.config.js                       # Configuración Vite
│   └── README.md                            # Documentación frontend
│
├── database/                         # Scripts SQL
│   ├── schema.sql                           # Creación de tablas
│   └── data.sql                             # Datos de prueba
│
└── README.md                         # Este archivo (Documentación general)
```

---

## ⚙️ Instalación y Configuración

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- ☕ **Java JDK 17+** - [Descargar](https://www.oracle.com/java/technologies/downloads/)
- 🗄️ **MySQL 8.0+** - [Descargar](https://dev.mysql.com/downloads/)
- 📦 **Node.js 16+** y npm - [Descargar](https://nodejs.org/)
- 📦 **Maven** (opcional, viene con IntelliJ) - [Descargar](https://maven.apache.org/)
- 💻 **Git** - [Descargar](https://git-scm.com/)

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/sistema-gestion-paqueteria.git
cd sistema-gestion-paqueteria
```

### Paso 2: Configurar la Base de Datos

1. **Crear la base de datos en MySQL:**

```sql
CREATE DATABASE paqueteria_db;
USE paqueteria_db;
```

2. **Ejecutar el script de creación de tablas:**

```bash
mysql -u root -p paqueteria_db < database/schema.sql
```

### Paso 3: Configurar el Backend

1. **Navegar a la carpeta backend:**

```bash
cd backend
```

2. **Editar `application.properties`:**

```properties
# src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/paqueteria_db
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD
```

3. **Compilar y ejecutar:**

```bash
mvn clean install
mvn spring-boot:run
```

O desde IntelliJ IDEA: `Run > PaqueteriaGestionApplication`

4. **Verificar que funciona:**

Abre el navegador en: `http://localhost:8080/api/municipios`

### Paso 4: Configurar el Frontend

1. **Navegar a la carpeta frontend:**

```bash
cd ../frontend
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Ejecutar el servidor de desarrollo:**

```bash
npm run dev
```

4. **Abrir en el navegador:**

```
http://localhost:5173
```

---

## 🚀 Ejecución del Proyecto

### Modo Desarrollo

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```
El backend estará disponible en: `http://localhost:8080`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
El frontend estará disponible en: `http://localhost:5173`

### Modo Producción

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/paqueteria-gestion-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## 📚 Documentación Detallada

Para información más específica de cada componente, consulta:

- 📘 **[Backend README](./backend/README.md)** - Documentación completa del API REST, estructura de la BD, endpoints y ejemplos
- 📗 **[Frontend README](./frontend/README.md)** - Documentación de componentes, hooks, estructura y funcionalidades de la interfaz

### Endpoints Principales

| Recurso | Base URL |
|---------|----------|
| Conductores | `http://localhost:8080/api/conductores` |
| Vehículos | `http://localhost:8080/api/vehiculos` |
| Municipios | `http://localhost:8080/api/municipios` |
| Paquetes | `http://localhost:8080/api/paquetes` |
| Asignaciones | `http://localhost:8080/api/conduces` |

---

## 🔄 Flujo de Trabajo del Proyecto

### Desarrollo de una Funcionalidad

1. **Backend** (Spring Boot)
   - Crear entidad JPA en `model/`
   - Crear repositorio en `repository/`
   - Crear controlador en `controller/`
   - Probar endpoint con Postman

2. **Frontend** (React)
   - Crear servicio API en `services/`
   - Crear hook personalizado en `hooks/`
   - Crear componentes de vista y formulario en `components/tabs/`
   - Integrar en la interfaz

3. **Validación**
   - Validaciones en backend (constraints JPA)
   - Validaciones en frontend (`utils/validaciones.js`)
   - Testing manual completo

---

## 🛡️ Características de Seguridad

- ✅ Validación de datos en frontend y backend
- ✅ Restricciones de integridad en base de datos
- ✅ Validación de formato (DNI, teléfono, matrícula, CP)
- ✅ Confirmaciones antes de eliminar registros
- ✅ Manejo de errores en todas las capas

---

## 👥 Equipo de Desarrollo

### Backend (Spring Boot + MySQL)
- **Antonio Cabrera y Jerry Wong Cal** - Desarrollo de API REST, modelado de BD y arquitectura backend

### Frontend (React + Vite)
- **Carlos Rojas García y David García Pasamar** - Desarrollo de interfaz de usuario, integración con API y experiencia de usuario

---

## 🎓 Aprendizajes del Proyecto

Durante el desarrollo de este proyecto full stack se han aplicado:

### Backend
- ✅ Diseño de bases de datos relacionales
- ✅ Modelado Entidad-Relación (E/R)
- ✅ Relaciones 1:N, N:1 y N:M
- ✅ API REST con Spring Boot
- ✅ ORM con JPA/Hibernate
- ✅ Patrón Repository
- ✅ Arquitectura en capas

### Frontend
- ✅ Desarrollo con React y Hooks
- ✅ Componentes reutilizables
- ✅ Gestión de estado
- ✅ Consumo de APIs REST
- ✅ Diseño responsive
- ✅ Validaciones en cliente
- ✅ Experiencia de usuario (UX)

### Integración
- ✅ Arquitectura cliente-servidor
- ✅ Comunicación HTTP/JSON
- ✅ Manejo de errores en ambas capas
- ✅ Validaciones en frontend y backend

---

## 📄 Licencia

Este proyecto es de uso educativo - 2º DAM - Acceso a Datos

---

## 🤝 Contribuciones

Este es un proyecto académico. Si quieres sugerir mejoras:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Añadir mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

---

## 🌟 Agradecimientos

- A los profesores del módulo de Acceso a Datos
- A la comunidad de Spring Boot y React
- A todos los recursos de documentación utilizados

---

<div align="center">

**⭐ Si te ha gustado este proyecto, ¡dale una estrella en GitHub! ⭐**

**Desarrollado con ❤️ por el equipo DAM**

</div>
