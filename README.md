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

# Modelar con rutas(a como lo tiene el banco)
Personas en curso
Lenguajes de programación
Personas Lenguajes

Router (CRUD)
Controller (Lógica de leer)


# TAREA para Martes 13 de Julio

- Pruebas unitarias a utils.js -> utils -> test -> utils.test.js
- Crear el método put en el router de users y actualizar un registro desde un id dado en el params y mandar el update en el body, recordar utilizar las validaciones
```javascript
router.put('/:id', getAllUsersHttp)
```
- Crear el método delete en el router de users y eliminar de bd
- Generar en el get la lectura de QueryParams para poder filtrar la información generando el siguiente contrato:

```
GET: http://localhost:<port>/users/?name=Enrique
GET: http://localhost:<port>/users/?lastName=Enrique
GET: http://localhost:<port>/users/?surName=Enrique
GET: http://localhost:<port>/users/?name=Enrique
```
### 200
```json
{
  count: 2,
  data: [
    {
      name: 'Enrique',
      lastName: 'Lopez',
      surName: 'Callejas',
    },
    {
      name: 'Enrique',
      lastName: 'Lopez',
      surName: 'Callejas',
    }
  ]
}
```
### 404
```json
{
  count: 0,
  data: []
}
```
### Contemplar cuando no tenga nada en la consulta y enviar un No Content (http Code 404)

# Tarea para el 20 de Julio
Pruebas unitarias al delete, update y search

