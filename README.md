# Tribbu · Frontend

Frontend de **Tribbu**, una aplicación web para crear, organizar y compartir planes en grupo de forma sencilla y humana.

La aplicación está construida como una **Single Page Application (SPA)**, priorizando la experiencia de usuario, la claridad y la escalabilidad.

---

## Características principales

- **Crear y gestionar Tribbus**: Forma grupos organizados (familia, amigos, comunidad)
- **Calendario de eventos**: Visualiza y organiza eventos de todas tus tribbus
- **Gestión de miembros**: Invita usuarios, asigna roles y permisos
- **Perfiles de cachorros**: Registra información de menores en el grupo
- **Autenticación segura**: Login con email/contraseña y Google
- **Invitaciones**: Invita usuarios por email con roles específicos
- **Interfaz responsiva**: Funciona perfectamente en desktop y móvil

---

## Stack

- **React 19** - UI library
- **React Router** - Navegación
- **Context API** - Gestión de estado
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilos
- **Vite** - Build tool
- **Framer Motion** - Animaciones
- **React Big Calendar** - Calendario de eventos
- **Firebase** - Autenticación con Google
- **Moment.js** - Manejo de fechas

---

## Instalación y ejecución

### Pasos

1. Clona el repositorio:
```bash
git clone <tu-repo>
cd tribbu-frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno creando un archivo `.env`:
```bash
VITE_API_URL=http://localhost:5005
VITE_FIREBASE_API_KEY=<tu-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<tu-auth-domain>
# ... (resto de variables de Firebase)
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `https://tribbu.vercel.app/`

---


## Estructura del proyecto

```
src/
├── pages/           # Páginas principales (HomePage, LoginPage, etc.)
├── components/      # Componentes reutilizables
│   ├── ui/         # Componentes UI básicos (Button, Card, etc.)
│   ├── events/     # Componentes relacionados con eventos
│   └── ...
├── services/       # Servicios API (auth, tribbu, event, etc.)
├── context/        # Context API (AuthContext)
├── data/           # Datos estáticos o demo
├── App.jsx         # Rutas principales
├── main.jsx        # Punto de entrada
└── index.css       # Estilos globales
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz con:

```
VITE_API_URL=http://localhost:5005
VITE_FIREBASE_API_KEY=<key>
VITE_FIREBASE_AUTH_DOMAIN=<domain>
VITE_FIREBASE_PROJECT_ID=<project-id>
VITE_FIREBASE_STORAGE_BUCKET=<bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<sender-id>
VITE_FIREBASE_APP_ID=<app-id>
VITE_FIREBASE_MEASUREMENT_ID=<measurement-id>
```

---

##  Autenticación

La aplicación soporta dos métodos de autenticación:
- **Email/Contraseña**: Registro e inicio de sesión manual
- **Google OAuth**: Integrado con Firebase

---

## Estilos

El proyecto usa **Tailwind CSS** para los estilos con una paleta de colores personalizada:
- Color primario: `#615FFF` (Indigo/Violeta)
- Background: `#F1F5F9` (Slate 50)

---

## Responsividad

La aplicación es completamente responsiva y funciona en:
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (< 768px)

---

## Variables de desarrollo

Para un desarrollo más eficiente, considera:
- Usar React DevTools para debugging
- Usar Vite DevTools para ver los módulos cargados
- Verificar la consola del navegador para logs

---

## Licencia

Este proyecto es privado y creado por Pau Serrano Herraiz.

---

## 👤 Autor

**Pau Serrano Herraiz** - Junior Full Stack Developer

- 🔗 [GitHub](https://github.com/PauSerranoHerraiz/)
- 🔗 [LinkedIn](https://www.linkedin.com/in/pau-serrano-herraiz-a1785384/)