# Project Manager

A fullstack demo project to showcase the fullstack development with a real project. The project manager is an app to manage projects, users and tasks.

## Features

The following features are implemented:
- MariaDB database for perstistant storage of all data
- PhpMyAdmin interface for easy database administration
- Python backend built with FastApi
  - Automatically generated openai specs with swagger ui
  - Simple router/service splitting
  - Usage of SqlAlchemy as an ORM to abstract the storage layer (in our case databases)
  - Depends() - native dependency injection system of FastApi
  - User authentication using cookies and session management
- Typescript/Javascript frontend built with Angular
  - Simple views/components splitting
  - Basic routing using the Angular router
  - Using templating for dynamic components (multi-select)
  - Using data-binding (one way and two-way) to pass data around
  - Interceptors (http cookies - allow credentials)
  - Dialogs for better user experience
  - Services to define backend calls with RxJs
  - TailwindCss for utility classes in css
  - DaisyUi as a more advanced styling library built on top of TailwindCss
  - Generic components for multiple use-cases and advanced composition of views (multi-select)
  - Responsive views in combination with the mobile-first approach
- DevOps
  - Usage of Docker to isolate proccesses into containers and manage them easily
  - Template approach: Files with the suffix .template are commited into the vcs. Each environment can then have their own config while also securing possible sensible credentials
  - Usage of Docker Compose to group multiple Docker containers into stacks and ease the lifecycle of them
  - Usage of Docker Volumes to persist needed data like the database volume to persist the database start through a restart
  - Monorepository: All projects are managed in one single vcs repository. This simplifies the development and deployment for small to medium projects and small developer groups 
