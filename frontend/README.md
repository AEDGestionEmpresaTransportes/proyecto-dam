# 📚 Manual: Cómo Funciona Tu App React (Para Principiantes)

## 🎯 ¿Qué hace esta app?

Es un **sistema de gestión** que permite:
- Ver, crear, editar y eliminar **Conductores**
- En el futuro: gestionar Vehículos, Municipios, Paquetes, etc.
- Todo conectado a una **API REST** (backend en Spring Boot)

---

## 🏗️ Arquitectura Simple: 3 Capas

```
┌─────────────────────────────────────────┐
│  1. COMPONENTES (Lo que ves)           │  ← React JSX
│     - Botones, formularios, tablas     │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│  2. HOOKS (La lógica)                   │  ← JavaScript
│     - Cargar datos                      │
│     - Crear/Editar/Eliminar             │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│  3. SERVICIOS/API (El backend)          │  ← Spring Boot
│     - Base de datos                     │
│     - http://localhost:8080/api/...     │
└─────────────────────────────────────────┘
```

---

## 🔍 ¿Qué es un HOOK?

**Un hook es como una "función mágica"** que te permite:
1. Usar estado (recordar datos)
2. Hacer cosas cuando el componente se carga
3. Reutilizar lógica en varios componentes

### Ejemplo Visual:

```javascript
// ❌ SIN HOOK (Malo - repites código)
function ConductoresTab() {
  const [conductores, setConductores] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8080/api/conductores')
      .then(res => res.json())
      .then(data => setConductores(data));
  }, []);
  // ... más código repetido
}

function VehiculosTab() {
  const [vehiculos, setVehiculos] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8080/api/vehiculos')
      .then(res => res.json())
      .then(data => setVehiculos(data));
  }, []);
  // ... mismo código repetido 😫
}

// ✅ CON HOOK (Bueno - reutilizas código)
function ConductoresTab() {
  const { conductores } = useConductores(); // ¡Listo! 🎉
}

function VehiculosTab() {
  const { vehiculos } = useVehiculos(); // ¡Fácil! 🎉
}
```

---

## 📦 Nuestros Hooks Explicados

### 1️⃣ `useConductores()` - Cargar datos

**¿Qué hace?** Trae los conductores desde el backend.

```javascript
// hooks/useConductores.js
export default function useConductores() {
  const [conductores, setConductores] = useState([]); // 📦 Caja vacía
  const [isLoading, setIsLoading] = useState(true);   // ⏳ ¿Cargando?
  
  useEffect(() => {
    // 🚀 Cuando el componente se monta, hace esto:
    fetch('http://localhost:8080/api/conductores')
      .then(res => res.json())
      .then(data => {
        setConductores(data);  // 📦 Llena la caja con datos
        setIsLoading(false);   // ✅ Ya no está cargando
      });
  }, []); // [] = solo se ejecuta UNA VEZ al inicio
  
  return { conductores, setConductores, isLoading };
}
```

**¿Cómo se usa?**

```javascript
function ConductoresTab() {
  const { conductores, isLoading } = useConductores();
  
  if (isLoading) return <p>Cargando...</p>;
  
  return <TablaConConductores datos={conductores} />;
}
```

---

### 2️⃣ `useMunicipios()` - Igual pero para municipios

**¿Qué hace?** Lo mismo que `useConductores()` pero trae municipios.

```javascript
// hooks/useMunicipios.js
export default function useMunicipios() {
  const [municipios, setMunicipios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch('http://localhost:8080/api/municipios')
      .then(res => res.json())
      .then(data => {
        setMunicipios(data);
        setIsLoading(false);
      });
  }, []);
  
  return { municipios, setMunicipios, isLoading };
}
```

**💡 Patrón:** Todos los hooks de "cargar datos" funcionan igual.

---

### 3️⃣ `useCRUD()` - El hook más importante

**¿Qué hace?** Maneja TODAS las operaciones CRUD:
- **C**reate (Crear)
- **R**ead (Leer) ← Ya lo hace `useConductores()`
- **U**pdate (Actualizar)
- **D**elete (Eliminar)

**¿Por qué es genérico?** Se puede usar para conductores, vehículos, municipios, etc.

```javascript
// hooks/useCRUD.js
export default function useCRUD({ 
  items,           // Lista actual de elementos
  setItems,        // Función para actualizar la lista
  apiUrl,          // URL de la API
  idField          // Campo ID ('dni', 'id', 'matricula'...)
}) {
  
  // 1️⃣ CREAR o ACTUALIZAR
  const submitItem = async (item, modo) => {
    const url = modo === "crear" 
      ? apiUrl                    // POST /api/conductores
      : `${apiUrl}/${item[idField]}`; // PUT /api/conductores/12345678A
    
    const method = modo === "crear" ? "POST" : "PUT";
    
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });
    
    const resultado = await res.json();
    
    if (modo === "crear") {
      setItems([...items, resultado]); // Añade a la lista
    } else {
      setItems(items.map(i => 
        i[idField] === item[idField] ? resultado : i
      )); // Actualiza en la lista
    }
  };
  
  // 2️⃣ ELIMINAR
  const deleteItem = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    setItems(items.filter(i => i[idField] !== id)); // Quita de la lista
  };
  
  return { submitItem, deleteItem, submitting, error };
}
```

---

## 🔄 Flujo Completo: Ejemplo "Crear Conductor"

### Paso a paso visual:

```
1. Usuario hace clic en "➕ Crear"
   ↓
2. ConductoresTab ejecuta handleCreate()
   ↓
3. Se muestra el formulario (FormularioConductor)
   ↓
4. Usuario llena los campos y hace clic en "Guardar"
   ↓
5. FormularioConductor ejecuta handleSubmit()
   ↓
6. ConductoresTab llama a submitItem() del hook useCRUD
   ↓
7. useCRUD hace fetch POST a http://localhost:8080/api/conductores
   ↓
8. Backend guarda en BD y devuelve el conductor creado
   ↓
9. useCRUD añade el nuevo conductor a la lista
   ↓
10. React re-renderiza la tabla con el nuevo conductor
    ↓
11. ¡Usuario ve el conductor en la tabla! ✅
```

### En código:

```javascript
// ConductoresTab.jsx
const handleCreate = () => {
  setMuestraFormulario(true); // Muestra formulario
};

const handleSubmit = (e) => {
  e.preventDefault();
  
  // Llama al hook useCRUD
  submitItem(conductor, "crear", () => {
    setMuestraFormulario(false); // Oculta formulario
  });
};

// Dentro de useCRUD.js
const submitItem = async (conductor, modo) => {
  const res = await fetch('http://localhost:8080/api/conductores', {
    method: 'POST',
    body: JSON.stringify(conductor)
  });
  
  const nuevo = await res.json();
  setConductores([...conductores, nuevo]); // ✅ Actualiza estado
};
```

---

## 🗂️ ¿Qué es un SERVICIO?

**Un servicio es un archivo que agrupa todas las llamadas a la API.**

### Ejemplo: conductoresAPI.js

```javascript
// services/conductoresAPI.js
const API_URL = "http://localhost:8080/api/conductores";

const getAll = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

const create = async (conductor) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(conductor)
  });
  return res.json();
};

const update = async (dni, conductor) => {
  const res = await fetch(`${API_URL}/${dni}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(conductor)
  });
  return res.json();
};

const remove = async (dni) => {
  await fetch(`${API_URL}/${dni}`, { method: "DELETE" });
};

export default { getAll, create, update, remove };
```

**¿Por qué usarlo?** 
- ✅ Organizas todas las llamadas API en un solo lugar
- ✅ Si cambia la URL, solo cambias en un sitio
- ✅ Más fácil de leer y mantener

**¿Cómo se usa?**

```javascript
import conductoresAPI from '../services/conductoresAPI';

// Cargar todos
const conductores = await conductoresAPI.getAll();

// Crear uno nuevo
await conductoresAPI.create({ dni: '12345678A', nombre: 'Juan' });

// Eliminar
await conductoresAPI.remove('12345678A');
```

---

## 📊 Diagrama: ¿Cómo se conecta todo?

```
App.jsx
  └─ TabsContainer.jsx
       └─ ConductoresTab.jsx ──────┐
            │                       │
            ├─ useConductores() ────┼──> fetch → Backend
            ├─ useMunicipios()  ────┤
            ├─ useCRUD() ───────────┤
            │                       │
            ├─ BotonesCRUD.jsx      │
            ├─ FormularioConductor  │
            └─ VistaConductores     │
                                    │
                              Base de Datos
```

---

## 🎓 Conceptos Clave

### Estado (State)
**¿Qué es?** Una "variable con memoria" que cuando cambia, React re-renderiza.

```javascript
const [conductores, setConductores] = useState([]);
//     ↑ valor      ↑ función para cambiar   ↑ valor inicial

// Cambiar el estado:
setConductores([...conductores, nuevoConductor]); // ✅ React actualiza UI
```

### Props
**¿Qué son?** Datos que un componente padre pasa a un hijo.

```javascript
// Padre
<FormularioConductor 
  conductor={conductor}    // ← prop
  municipios={municipios}  // ← prop
  handleSubmit={handleSubmit} // ← prop
/>

// Hijo
function FormularioConductor({ conductor, municipios, handleSubmit }) {
  // Usa las props aquí
}
```

### useEffect
**¿Qué hace?** Ejecuta código cuando el componente se monta o actualiza.

```javascript
useEffect(() => {
  // Esto se ejecuta cuando el componente aparece
  console.log("¡Hola! Me acabo de montar");
  
  fetch('/api/conductores')
    .then(res => res.json())
    .then(data => setConductores(data));
    
}, []); // [] = solo se ejecuta UNA VEZ al inicio

useEffect(() => {
  console.log("Conductores cambió:", conductores);
}, [conductores]); // Se ejecuta cada vez que 'conductores' cambia
```

---

## 🛠️ Guía Rápida: Añadir un Nuevo Tab

### Ejemplo: Crear "VehículosTab"

#### 1️⃣ Crear el hook de carga

```javascript
// hooks/useVehiculos.js
import { useEffect, useState } from "react";

export default function useVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehiculos = async () => {
      const res = await fetch("http://localhost:8080/api/vehiculos");
      const data = await res.json();
      setVehiculos(data);
      setIsLoading(false);
    };
    fetchVehiculos();
  }, []);

  return { vehiculos, setVehiculos, isLoading };
}
```

#### 2️⃣ Crear el componente Tab

```javascript
// tabs/VehiculosTab.jsx
import { useState } from "react";
import useVehiculos from "../../hooks/useVehiculos";
import useCRUD from "../../hooks/useCRUD";
import BotonesCRUD from "../common/BotonesCRUD";
import "../common/TablaBase.css";

export default function VehiculosTab() {
  const { vehiculos, setVehiculos, isLoading } = useVehiculos();
  const [selectedId, setSelectedId] = useState(null);
  
  const { submitItem, deleteItem, submitting } = useCRUD({
    items: vehiculos,
    setItems: setVehiculos,
    setSelectedId,
    apiUrl: "http://localhost:8080/api/vehiculos",
    idField: "matricula", // o "id"
  });

  if (isLoading) return <p>Cargando vehículos...</p>;

  return (
    <div className="tabla-container">
      <h2 className="tabla-title">Vehículos</h2>
      
      <BotonesCRUD
        onCreate={() => {/* lógica crear */}}
        onEdit={() => {/* lógica editar */}}
        onDelete={() => deleteItem(selectedId, "¿Eliminar vehículo?")}
        selectedDni={selectedId}
        submitting={submitting}
      />
      
      {/* Tabla de vehículos */}
    </div>
  );
}
```

#### 3️⃣ Añadir al TabsContainer

```javascript
// TabsContainer.jsx
import VehiculosTab from "./tabs/VehiculosTab";

// En el return:
{tab === "vehiculos" && <VehiculosTab />}
```

¡Listo! 🎉

---

## 🔥 Trucos y Tips

### ✅ Regla #1: Un hook por responsabilidad
- `useConductores()` → Solo carga conductores
- `useCRUD()` → Solo operaciones CRUD
- NO mezcles todo en un solo hook

### ✅ Regla #2: Props hacia abajo, eventos hacia arriba
```javascript
// ❌ MAL: El hijo modifica el estado del padre directamente
<FormularioConductor conductores={conductores} />

// ✅ BIEN: El hijo notifica al padre con una función
<FormularioConductor 
  conductor={conductor}
  onSubmit={handleSubmit} 
/>
```

### ✅ Regla #3: Nombres claros
```javascript
// ❌ MAL
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);

// ✅ BIEN
const [conductores, setConductores] = useState([]);
const [isLoading, setIsLoading] = useState(false);
```

### ✅ Regla #4: DRY (Don't Repeat Yourself)
Si copias código 2 veces → ¡Crea un hook o componente!

---

## 🐛 Errores Comunes

### Error 1: "Cannot read property of undefined"
```javascript
// ❌ PROBLEMA
const nombre = conductor.municipio.nombre; // Error si municipio es null

// ✅ SOLUCIÓN
const nombre = conductor.municipio?.nombre || "-"; // Optional chaining
```

### Error 2: "Too many re-renders"
```javascript
// ❌ PROBLEMA
useEffect(() => {
  setConductores([...conductores, nuevo]);
}); // ¡Sin dependencias! Se ejecuta infinitamente

// ✅ SOLUCIÓN
useEffect(() => {
  setConductores([...conductores, nuevo]);
}, []); // Con dependencias
```

### Error 3: "Estado no se actualiza"
```javascript
// ❌ PROBLEMA
conductores.push(nuevo); // Muta el array directamente
setConductores(conductores); // React no detecta el cambio

// ✅ SOLUCIÓN
setConductores([...conductores, nuevo]); // Crea nuevo array
```

---

## 📚 Resumen Final

| Concepto | ¿Qué es? | Ejemplo |
|----------|----------|---------|
| **Hook** | Función reutilizable con lógica | `useConductores()` |
| **Estado** | Variable con memoria | `const [x, setX] = useState()` |
| **Props** | Datos de padre a hijo | `<Hijo nombre="Juan" />` |
| **useEffect** | Ejecuta código al montar/actualizar | `useEffect(() => {}, [])` |
| **Servicio** | Agrupa llamadas API | `conductoresAPI.getAll()` |
| **CRUD** | Create, Read, Update, Delete | Operaciones básicas BD |

---

## 🎯 Siguiente Nivel

Una vez domines esto, aprende:
1. **React Router** - Navegación entre páginas
2. **Context API** - Estado global sin props
3. **Custom Hooks** - Hooks más avanzados
4. **TypeScript** - JavaScript con tipos
5. **Testing** - Pruebas automáticas

---

## 💡 ¿Preguntas Frecuentes?

**P: ¿Por qué tantos archivos?**  
R: Separar código = más fácil de mantener y escalar.

**P: ¿Puedo hacer todo en un solo archivo?**  
R: Sí, pero será un caos de 1000+ líneas imposible de leer.

**P: ¿Cuándo crear un hook?**  
R: Cuando repites lógica en 2+ componentes.

**P: ¿CSS en cada componente?**  
R: Sí, cada componente tiene su CSS para modularidad.

---

## 🚀 ¡A Programar!

Ahora que entiendes cómo funciona todo:
1. Experimenta creando/editando conductores
2. Intenta añadir VehículosTab siguiendo el patrón
3. Personaliza los estilos CSS
4. ¡Impresiona a tu profesor de DAM! 🎓

**¿Dudas?** Revisa este manual y experimenta. ¡La práctica hace al maestro! 💪