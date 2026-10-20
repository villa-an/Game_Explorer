# Game Explorer

Buscador de videojuegos para PC creado con React, TypeScript y Vite. Consulta el catálogo de RAWG, permite buscar por nombre y muestra información ampliada en un modal. Los precios son ficticios y solo ilustrativos.

## Inicio

1. Crea una API key gratuita desde [RAWG API](https://rawg.io/apidocs).
2. Copia `.env.example` como `.env` y añade la clave:

   ```env
   VITE_RAWG_API_KEY=tu_api_key
   ```

3. Instala dependencias y arranca el servidor:

   ```bash
   npm install
   npm run dev
   ```

La API key de una aplicación Vite queda visible en el código enviado al navegador. Para una aplicación pública, usa un backend como proxy y guarda la clave en el servidor.

## Publicar en Netlify

1. Sube este directorio a un repositorio Git.
2. En Netlify, importa el repositorio y configura `npm run build` como comando de build y `dist` como directorio de publicación.
3. Añade `VITE_RAWG_API_KEY` en las variables de entorno del sitio. Debe estar disponible durante el build; después, vuelve a desplegar.

La configuración de build también está definida en `netlify.toml`.

## Estructura

- `src/components/AddGame.tsx`: formulario de búsqueda.
- `src/components/GameGrid.tsx`: cuadrícula de resultados.
- `src/components/GameItem.tsx`: tarjeta individual con valoración, fecha y precio estimado.
- `src/components/GameModal.tsx`: ficha ampliada con descripción, géneros y plataformas.
- `src/helpers/getGames.ts`: búsqueda y mapeo de resultados RAWG.
- `src/helpers/getGameDetails.ts`: consulta del detalle de un juego.
- `src/helpers/rawgClient.ts`: cliente compartido, API key y errores HTTP.
- `src/interfaces/Game.ts`: tipo compartido del juego.
- `src/GameSearchApp.tsx`: estado de la aplicación y coordinación de las consultas.
- `src/styles.css`: diseño responsive, estados de carga y animaciones.# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
