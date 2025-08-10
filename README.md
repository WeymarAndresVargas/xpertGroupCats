# XpertGroupCats

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 20.1.5.

## Descripción del Proyecto

XpertGroupCats es una aplicación web desarrollada con Angular 20 que permite a los usuarios explorar y gestionar información sobre razas de gatos. La aplicación cuenta con un sistema de autenticación y diferentes características para interactuar con la información de gatos.

## Características Principales

- **Sistema de Autenticación**: Login seguro con validación de credenciales
- **Exploración de Razas de Gatos**: Visualización y búsqueda de diferentes razas
- **Interfaz Moderna**: Diseñada con PrimeNG y Tailwind CSS para una experiencia de usuario óptima

## Tecnologías Utilizadas

- **Frontend**: Angular 20.1.0
- **Estilos**: Tailwind CSS 4.1.11, PrimeNG 20.0.1
- **Estado**: NgRx Signals 20.0.0
- **Testing**: Jasmine 5.8.0, Karma 6.4.0

## Requisitos Previos

- Node.js (versión recomendada: 18.x o superior)
- npm (incluido con Node.js)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/WeymarAndresVargas/xpertGroupCats.git]
   ```

2. Navega hasta el directorio del proyecto:
   ```bash
   cd XpertGroupCats
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

## Servidor de Desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:
    ```bash
    ng serve
    ```

Una vez que el servidor esté en funcionamiento, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques cualquiera de los archivos fuente.

## Estructura del Proyecto

- **/src/app/features**: Contiene los módulos principales de la aplicación
  - **/auth**: Componentes relacionados con la autenticación (login)
  - **/cats**: Componentes para la gestión y visualización de razas de gatos
- **/src/app/services**: Servicios para la comunicación con APIs y lógica de negocio
- **/src/app/core**: Funcionalidades esenciales que se cargan una sola vez

## Generación de Código

Angular CLI incluye potentes herramientas de scaffolding. Para generar un nuevo componente, ejecuta:
Para una lista completa de esquemas disponibles (como `components`, `directives` o `pipes`), ejecuta:

## Compilación

Esto compilará tu proyecto y almacenará los artefactos de compilación en el directorio `dist/`. Por defecto, la compilación de producción optimiza tu aplicación para rendimiento y velocidad.

## Ejecución de Pruebas Unitarias

Para ejecutar pruebas unitarias con [Karma](https://karma-runner.github.io), utiliza el siguiente comando:
   ```bash
     ng test
   ```

## Recursos Adicionales

Al no contar con API para autenticacion se realizo un login local (fake), con las siguientes credenciales
 
 ``
  {
   email : correo@correo.com,
   password: Admin123
  }
   ``
