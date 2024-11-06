<!-- LOGO -->
<a href="https://eth-rewards-presentation.vercel.app/">
  <img src="./src/eth-logo.svg" alt="Logo de EthRewards" width="400">
</a>

## Aplicación en producción

Podés ver la aplicación productiva en https://eth-rewards-presentation.vercel.app/

## Instalación y Ejecución local

Sigue estos pasos para correr la aplicación localmente:

1. Cloná el repositorio:
   `git clone https://github.com/santiagopintus/ethrewards-redux-cra`
2. Navegá al repositorio:
   `cd ethrewards-redux-cra`
3. Instalá las dependencias:
   `npm install`
4. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:
   [Acá se puede obtener la API KEY gratuita de Bitquery](https://account.bitquery.io/user/api_v1/api_keys)

```bash
NEXT_PUBLIC_API_KEY=<tu_api_key>
NEXT_PUBLIC_API_BASE_URL=https://graphql.bitquery.io
```

5. Ejecutá el servidor de desarrollo:
   `npm start`
6. Dirigite a http://localhost:3000 para ver la aplicación en acción.

## Tecnologías Utilizadas

- React: Librería de JavaScript para crear interfaces de usuario.
- Redux: Para manejo de estados
- D3.js: Librería para crear gráficos interactivos.
- Typescript: Lenguaje de programación con tipado estático.
- Bitquery: API de datos de Ethereum.
- Material UI: Librería de componentes estilizados
- Sass: Framework de CSS.
- Vitest: Framework de pruebas unitarias.

## Diseño y Desarrollo por:

### Santiago Pintus
