# 📦 Sistema de Gestión de Paquetería

> Proyecto de Acceso a Datos - 2º DAM  
> API REST desarrollada con Spring Boot y MySQL

---

## 📋 Índice

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura de la Base de Datos](#-estructura-de-la-base-de-datos)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Relaciones entre Entidades](#-relaciones-entre-entidades)

---

## 🎯 Descripción del Proyecto

Sistema backend para la gestión de una empresa de transporte y paquetería. Permite gestionar municipios, vehículos, conductores, paquetes y los registros de qué conductor usa qué vehículo en cada momento.

### Funcionalidades principales:
- ✅ Gestión de municipios de destino
- ✅ Registro de vehículos (motos y coches)
- ✅ Gestión de conductores
- ✅ Control de paquetes y asignación a conductores
- ✅ Historial de uso de vehículos por conductores

---

## 🛠 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Java** | 17+ | Lenguaje de programación |
| **Spring Boot** | 3.5.6 | Framework backend |
| **Spring Data JPA** | 3.5.6 | Persistencia de datos |
| **MySQL** | 8.0 | Base de datos relacional |
| **Lombok** | 1.18.40 | Reducción de código boilerplate |
| **Maven** | - | Gestor de dependencias |
| **IntelliJ IDEA** | - | IDE de desarrollo |

---

## 🗄 Estructura de la Base de Datos

### Diagrama Entidad-Relación
```
┌─────────────┐
│  MUNICIPIO  │
└──────┬──────┘
       │
       │ (0,n)
       │
    ┌──▼──────────┐
    │   PAQUETE   │
    └──────┬──────┘
           │
           │ (1,n)
           │
    ┌──────▼─────────┐         ┌─────────────┐
    │   CONDUCTOR    │◄───────►│  VEHÍCULO   │
    └────────────────┘  (N:M)  └─────────────┘
                       CONDUCE
```

### Tablas

#### **MUNICIPIO**
```sql
CREATE TABLE MUNICIPIO (
    Codigo VARCHAR(10) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);
```

#### **VEHICULO**
```sql
CREATE TABLE VEHICULO (
    Matricula VARCHAR(15) PRIMARY KEY,
    Modelo VARCHAR(50),
    Tipo VARCHAR(30),
    Potencia INT CHECK (Potencia > 0)
);
```

#### **CONDUCTOR**
```sql
CREATE TABLE CONDUCTOR (
    DNI VARCHAR(20) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Telefono VARCHAR(20),
    Direccion VARCHAR(255),
    Salario DECIMAL(10, 2) CHECK (Salario >= 0),
    Municipio VARCHAR(10),
    FOREIGN KEY (Municipio) REFERENCES MUNICIPIO(Codigo)
);
```

#### **PAQUETE**
```sql
CREATE TABLE PAQUETE (
    Codigo VARCHAR(20) PRIMARY KEY,
    Descripcion VARCHAR(255),
    Destinatario VARCHAR(100),
    Direccion VARCHAR(255),
    Municipio_Destino VARCHAR(10) NOT NULL,
    Conductor_DNI VARCHAR(20),
    FOREIGN KEY (Municipio_Destino) REFERENCES MUNICIPIO(Codigo),
    FOREIGN KEY (Conductor_DNI) REFERENCES CONDUCTOR(DNI)
);
```

#### **CONDUCE** (Tabla de relación N:M)
```sql
CREATE TABLE CONDUCE (
    DNI_Conductor VARCHAR(20),
    Matricula_Vehiculo VARCHAR(15),
    Fecha DATE NOT NULL,
    PRIMARY KEY (DNI_Conductor, Matricula_Vehiculo, Fecha),
    FOREIGN KEY (DNI_Conductor) REFERENCES CONDUCTOR(DNI),
    FOREIGN KEY (Matricula_Vehiculo) REFERENCES VEHICULO(Matricula)
);
```

---

## 🏗 Arquitectura del Proyecto

### Estructura de carpetas
```
paqueteria-gestion/
│
├── src/main/java/org/example/paqueteriagestion/
│   ├── PaqueteriaGestionApplication.java    # Clase principal
│   │
│   ├── model/                                # Entidades JPA
│   │   ├── Municipio.java
│   │   ├── Vehiculo.java
│   │   ├── Conductor.java
│   │   ├── Paquete.java
│   │   ├── Conduce.java
│   │   └── ConduceId.java
│   │
│   ├── repository/                           # Acceso a datos
│   │   ├── MunicipioRepository.java
│   │   ├── VehiculoRepository.java
│   │   ├── ConductorRepository.java
│   │   ├── PaqueteRepository.java
│   │   └── ConduceRepository.java
│   │
│   └── controller/                           # APIs REST
│       ├── MunicipioController.java
│       ├── VehiculoController.java
│       ├── ConductorController.java
│       ├── PaqueteController.java
│       └── ConduceController.java
│
├── src/main/resources/
│   └── application.properties               # Configuración
│
└── pom.xml                                  # Dependencias Maven
```

### Capas de la aplicación
```
┌─────────────────────────────────────┐
│         CONTROLLER                   │  ← APIs REST (Endpoints HTTP)
│  - Recibe peticiones HTTP           │
│  - Devuelve respuestas JSON          │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         REPOSITORY                   │  ← Acceso a Base de Datos
│  - Interfaces JPA                   │
│  - Métodos CRUD automáticos          │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         MODEL (Entidades)            │  ← Representación de tablas
│  - Clases Java con anotaciones      │
│  - Mapeo objeto-relacional (ORM)     │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         BASE DE DATOS MySQL          │  ← Almacenamiento persistente
│  - Tablas relacionales               │
└─────────────────────────────────────┘
```

---

## ⚙️ Instalación y Configuración

### Requisitos previos

- ☕ Java 17 o superior
- 🗄 MySQL 8.0
- 📦 Maven
- 💻 IntelliJ IDEA (recomendado)

### Pasos de instalación

1. **Clonar el repositorio**
```bash
   git clone <url-del-repositorio>
   cd paqueteria-gestion
```

2. **Configurar la base de datos**
   
   Edita `src/main/resources/application.properties`:
```properties
   spring.datasource.url=jdbc:mysql://HOST:3306/BASE_DE_DATOS
   spring.datasource.username=TU_USUARIO
   spring.datasource.password=TU_PASSWORD
```

3. **Crear las tablas en MySQL**
   
   Ejecuta los scripts SQL de creación de tablas (ver sección "Estructura de la Base de Datos")

4. **Compilar el proyecto**
```bash
   mvn clean install
```

5. **Ejecutar la aplicación**
```bash
   mvn spring-boot:run
```
   
   O desde IntelliJ: Run > PaqueteriaGestionApplication

6. **Verificar que funciona**
   
   Abre el navegador en: `http://localhost:8080/municipios`

---

## 🌐 Endpoints de la API

### **Municipios** (`/municipios`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/municipios` | Obtener todos los municipios |
| GET | `/municipios/{codigo}` | Obtener un municipio por código |
| POST | `/municipios` | Crear un nuevo municipio |
| PUT | `/municipios/{codigo}` | Actualizar un municipio |
| DELETE | `/municipios/{codigo}` | Eliminar un municipio |

### **Vehículos** (`/vehiculos`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/vehiculos` | Obtener todos los vehículos |
| GET | `/vehiculos/{matricula}` | Obtener un vehículo por matrícula |
| POST | `/vehiculos` | Crear un nuevo vehículo |
| PUT | `/vehiculos/{matricula}` | Actualizar un vehículo |
| DELETE | `/vehiculos/{matricula}` | Eliminar un vehículo |

### **Conductores** (`/conductores`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/conductores` | Obtener todos los conductores |
| GET | `/conductores/{dni}` | Obtener un conductor por DNI |
| POST | `/conductores` | Crear un nuevo conductor |
| PUT | `/conductores/{dni}` | Actualizar un conductor |
| DELETE | `/conductores/{dni}` | Eliminar un conductor |

### **Paquetes** (`/paquetes`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/paquetes` | Obtener todos los paquetes |
| GET | `/paquetes/{codigo}` | Obtener un paquete por código |
| POST | `/paquetes` | Crear un nuevo paquete |
| PUT | `/paquetes/{codigo}` | Actualizar un paquete |
| DELETE | `/paquetes/{codigo}` | Eliminar un paquete |

### **Conducción** (`/conduce`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/conduce` | Obtener todos los registros de conducción |
| POST | `/conduce` | Crear un nuevo registro de conducción |

---

## 💡 Ejemplos de Uso

### Obtener todos los municipios

**Request:**
```http
GET http://localhost:8080/municipios
```

**Response:**
```json
[
  {
    "codigo": "35004",
    "nombre": "Las Palmas de Gran Canaria"
  },
  {
    "codigo": "35200",
    "nombre": "Telde"
  }
]
```

### Crear un nuevo municipio

**Request:**
```http
POST http://localhost:8080/municipios
Content-Type: application/json

{
  "codigo": "41001",
  "nombre": "Sevilla"
}
```

**Response:**
```json
{
  "codigo": "41001",
  "nombre": "Sevilla"
}
```

### Crear un conductor

**Request:**
```http
POST http://localhost:8080/conductores
Content-Type: application/json

{
  "dni": "12345678A",
  "nombre": "Juan Pérez",
  "telefono": "666111222",
  "direccion": "Calle Mayor 1",
  "salario": 1500.00,
  "municipio": {
    "codigo": "35004"
  }
}
```

### Crear un paquete asignado a un conductor

**Request:**
```http
POST http://localhost:8080/paquetes
Content-Type: application/json

{
  "codigo": "PKG001",
  "descripcion": "Libros",
  "destinatario": "Ana López",
  "direccion": "Calle Luna 5",
  "municipioDestino": {
    "codigo": "35004"
  },
  "conductor": {
    "dni": "12345678A"
  }
}
```

---

## 🔗 Relaciones entre Entidades

### **1:N - Un conductor entrega muchos paquetes**
```java
@ManyToOne
@JoinColumn(name = "Conductor_DNI")
private Conductor conductor;
```

- Un conductor puede entregar múltiples paquetes
- Un paquete es entregado por un solo conductor (o ninguno)

### **N:1 - Muchos paquetes van a un municipio**
```java
@ManyToOne
@JoinColumn(name = "Municipio_Destino", nullable = false)
private Municipio municipioDestino;
```

- Varios paquetes pueden ir al mismo municipio
- Cada paquete va a un único municipio

### **N:M - Conductores usan vehículos (con fecha)**
```java
@Entity
@IdClass(ConduceId.class)
public class Conduce {
    @Id
    @ManyToOne
    private Conductor conductor;
    
    @Id
    @ManyToOne
    private Vehiculo vehiculo;
    
    @Id
    private LocalDate fecha;
}
```

- Un conductor puede usar múltiples vehículos
- Un vehículo puede ser usado por múltiples conductores
- Se registra la fecha de cada uso

---

## 🚀 Próximos Pasos (Para el Frontend)

El backend está listo para integrarse con un frontend React. Los compañeros del frontend necesitarán:

1. **Configurar CORS** en Spring Boot para permitir peticiones desde React
2. **Usar las URLs** de los endpoints documentados arriba
3. **Hacer peticiones HTTP** con `fetch` o `axios`
4. **Manejar las respuestas JSON** y mostrarlas en la interfaz

### Ejemplo de petición desde React:
```javascript
// Obtener municipios
fetch('http://localhost:8080/municipios')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 📚 Documentación Técnica

### Configuración de Hibernate

Para que Hibernate respete los nombres exactos de tablas y columnas en mayúsculas/minúsculas:
```properties
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
spring.jpa.hibernate.naming.implicit-strategy=org.hibernate.boot.model.naming.ImplicitNamingStrategyJpaCompliantImpl
```

### Anotaciones JPA importantes

| Anotación | Propósito |
|-----------|-----------|
| `@Entity` | Marca una clase como entidad JPA |
| `@Table(name="...")` | Especifica el nombre de la tabla |
| `@Id` | Marca el campo como clave primaria |
| `@Column(name="...")` | Especifica el nombre de la columna |
| `@ManyToOne` | Relación muchos a uno |
| `@JoinColumn` | Especifica la columna de la foreign key |
| `@IdClass` | Para claves primarias compuestas |

---

## 👥 Equipo

- **Backend (Spring Boot):** [Tu nombre]
- **Frontend (React):** [Nombres de tus compañeros]

---

## 📝 Licencia

Proyecto educativo - 2º DAM - Acceso a Datos

---

## 🎓 Aprendizajes del Proyecto

Durante el desarrollo de este proyecto se han aplicado los siguientes conceptos:

- ✅ Diseño de bases de datos relacionales
- ✅ Modelado Entidad-Relación (E/R)
- ✅ Relaciones 1:N, N:1 y N:M
- ✅ Claves primarias y foráneas
- ✅ Restricciones de integridad (ON DELETE, ON UPDATE)
- ✅ API REST con Spring Boot
- ✅ ORM con JPA/Hibernate
- ✅ Arquitectura en capas (Controller, Repository, Model)
- ✅ Patrón de repositorio
- ✅ Manejo de JSON
- ✅ Métodos HTTP (GET, POST, PUT, DELETE)

---

**¡Proyecto finalizado con éxito!** 🎉
