Cada persona suba su tarea en una rama con su nombre
enrique
  - tarea1
  - middlewares


enrique
  - commit message = "subo tarea 2 conectivadad con airtable"


## Para conectarse a airtable seguir liga que se mandó por teams de MS

Actividades/Tareas

  Express y no solo Nodejs
# Segunda Tarea
  [Personas en el curso](https://airtable.com/appgiwqXmBRiTiCXK/api/docs#curl/table:personas%20en%20el%20curso)
  Poder conectarse a airtable con sus credenciales GET de la tabla de usuarios
  - Modificando el count y filtrando cuando no tenía correo
  Esperamos

```json
{
  count: 10,
  data: [Persona que tenga correo]
}
```

# Tercera
  Realizar merge de 3 tablas:
  [Personas en el curso](https://airtable.com/appgiwqXmBRiTiCXK/api/docs#curl/table:personas%20en%20el%20curso), 
  [Lenguajes de programación](https://airtable.com/appgiwqXmBRiTiCXK/api/docs#curl/table:lenguajesprogramacion), 
  [Personas Lenguajes](https://airtable.com/appgiwqXmBRiTiCXK/api/docs#curl/table:personaslenguajes)

```json
{
  count: 10,
  data: [
     ... person,
     lenguajes: ['python', 'javascript', 'etc']
  ]
}
```

# Cuarta
Agregar persona y eliminar a una persona conectandonos a Airtable

# Cookie y LocalStorage - Martes
R: Una cookie es un archivo de pequeño tamaño enviado por un sitio web y almacenado en el navegador del usuario, de manera que el sitio web puede consultar la actividad previa del navegador. Así, es posible identificar al usuario que visita un sitio web y llevar un registro de su actividad en el mismo.
Existen diversas tipos de cookies como: Sesion, Persistencia, Seguras y Zoombies.

R: LocalStorage: Se trata de un espacio de almacenamiento local. Puede almacenar entre 5 y 10 MB dependiendo del navegador web. La información almacenada con localStorage no es enviada al servidor en cada petición. No existe una caducidad para localStorage.

# Modelar con rutas(a como lo tiene el banco)
Personas en curso
Lenguajes de programación
Personas Lenguajes

Router (CRUD)
Controller (Lógica de leer)




