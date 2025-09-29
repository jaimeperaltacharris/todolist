## ¿Cuáles fueron los principales desafíos que enfrentaste al implementar las nuevas funcionalidades? ##

- Entre los principales desafios al desarrollar la aplicación:
    * uno de ellos fue volver a utilizar cordova para configurar un proyecto ya que tenia algunos años sin usarlo debido a que trabajé principalmente con capacitor.
    * Manejo de remote config, si bien tengo experiencia usando firebase ya sea con realtime database, firestore, cloud messaging la implementacion de features flag mediante dicha opción no la conocía, aunque no es algo complicado de implementar una vez comprendido fue una nueva experiencia.

## ¿Qué técnicas de optimización de rendimiento aplicaste y por qué? ##

- Aplique Lazy loading para la carga de modulos para de esta forma cargar los componentes cuando se requieran
- Optimización de recursos organizados en assets para una carga selectiva de los mismos, además establecer los estilos por componentes para mejorar el renderizado
- Utilizar las ultimas novedades ofrecias por el framework angular como lo son las directivas para condicionales y recorido de listas.

## ¿Cómo aseguraste la calidad y mantenibilidad del código?  ##

- Desarrolle la app basandome en una arquitectura limpia para separar las responsabilidades de cada componente y basandome en principios solid como el principio de inversión de dependencias, con ello pude definir una estructura de carpetas que permite identificar donde crear cada servicio o componente, además esto tambien me permite poder probar cada parte de forma independiente, tambien implemente test unitarios para validar la logica de cada componente. 