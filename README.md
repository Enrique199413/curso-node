# Examen final

Para realizar el examen final se sacará de la branch `examen-final` y colocar el nombre de la persona, quedando de la
siguiente manera:

```json
examen-final
            \
             \
              \ rafael
              |
              | america
              |
              | erick
```

La branch esta vacía así que tendrán que inicializar todo el proyecto.

Existe la misma base de datos que se configuró para los ejercicios solamente que el nombre de la base de datos
es `finalExam` aquí encontrarán tres colecciones:

1. `users`
2. `favorites`
3. `spaces`

La idea es sencilla, se creará un API REST en donde se puedan registrar usuarios en `users`, se listen `spaces` para que el usuario los pueda agregar a `favorites` y se contemplará el CRUD (Create, Read, Update y Delete) completo para favorites.

## Alcance

- CREATE de `users`, `favorites`
- READ de `spaces`, `users`, `favorites`
- UPDATE de `favorites`
- DELETE de `favorites`

# Resumen de API REST

## Lista de Endpoints

### Endpoints abiertos que no necesitan autenticación

* [Login](#login) : `POST /api/login/`
* [Register](#register) : `POST /api/register/`

### Endpoints que requieren autenticación

Para poder autenticar se deberá de usar passport con la estrategia de **JWT**

#### Información de usuario

Para poder crear un usuario se utilizará el post a `register` y para consultarlo será con `login` 

#### Espacios

Son los espacios disponibles para poder agregar a los favoritos desde el usuario

* [Muestra todos los espacios](#Muestra todos los espacios) : `GET /api/spaces/`

#### Favoritos relacionados con un usuario

Son los espacios que tiene un usuario como favoritos
Se habilitarán estos endpoints para lograr el objetivo

* [Agregar un favorito a un usuario](favorites/post.md) : `POST /api/favorites/`
* [Traer los favoritos de un usuario](favorites/pk/get.md) : `GET /api/favorites/:userId/`
* [Modificar los favoritos de un usuario](favorites/pk/put.md) : `PUT /api/favorites/:userId/`
* [Borrar un favorito de un usuaurio](favorites/pk/delete.md) : `DELETE /api/favorites/:userId/`

# Modelos de datos

## Modelo de datos para `users`

```json
[
  // usuario registrado
  {
    "id": "userId",// mongo lo carga en automático
    "username": "username", // único
    "password": "password"
  }
]
```
Notas

> El username es único

## Modelo de datos para `favorites`

```json
[
  // usuario con más de un favorito
  {
    "userId": "userId",
    "favorites": ["idFavorite1", "idFavorite2", "idFavorite3", "idFavorite4"]
  },
  // usuario con un solo favorito
  {
    "userId": "userId2",
    "favorites": ["idFavorite1"]
  },
  // usuario sin favoritos
  {
    "userId": "userId2",
    "favorites": []
  }
]
```

Notas

> - Existe el caso cuando no existe relación de usuario (porque no existe o porque no se ha realizado el registro de algún favorito)
> - Será una relación de un usuario con muchos espacios así que no se puede repetir el user id en `favorites`

## Modelo de datos para `spaces`

```json
[
  {
    "_id": "mongoID",
    "listing_url": "https://www.airbnb.com/rooms/10059872",
    "name": "Soho Cozy, Spacious and Convenient",
    "summary": "Clean, fully furnish, Spacious 1 bedroom flat just off the escalator in Mid Levels. 2 minutes From Soho Bar and Restaurants. Located in a quiet alley 1 minute from Sun Yat Sen",
    "description": "Clean, fully furnish, Spacious 1 bedroom flat just off the escalator in Mid Levels. 2 minutes From Soho Bar and Restaurants. Located in a quiet alley 1 minute from Sun Yat Sen",
    "property_type": "Apartment",
    "room_type": "Entire home/apt",
    "minimum_nights": "4",
    "maximum_nights": "20",
    "cancellation_policy": "flexible",
    "accommodates": "3",
    "bedrooms": "1",
    "beds": "2",
    "number_of_reviews": "3",
    "bathrooms": "1.0",
    "price": "699.00",
    "weekly_price": "5000.00"
  },
  {
    "_id": "mongoID",
    "listing_url": "https://www.airbnb.com/rooms/10059872",
    "name": "Soho Cozy, Spacious and Convenient",
    "summary": "Clean, fully furnish, Spacious 1 bedroom flat just off the escalator in Mid Levels. 2 minutes From Soho Bar and Restaurants. Located in a quiet alley 1 minute from Sun Yat Sen",
    "description": "Clean, fully furnish, Spacious 1 bedroom flat just off the escalator in Mid Levels. 2 minutes From Soho Bar and Restaurants. Located in a quiet alley 1 minute from Sun Yat Sen",
    "property_type": "Apartment",
    "room_type": "Entire home/apt",
    "minimum_nights": "4",
    "maximum_nights": "20",
    "cancellation_policy": "flexible",
    "accommodates": "3",
    "bedrooms": "1",
    "beds": "2",
    "number_of_reviews": "3",
    "bathrooms": "1.0",
    "price": "699.00",
    "weekly_price": "5000.00"
  }
]
```
Notas
> Esta lista solamente tiene 11 espacios para que el usuario pueda agregar a su lista de favoritos

# Definición de API REST

## Login

Used to collect a Token for a registered User.

**URL** : `/api/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
  "username": "[valid email address]",
  "password": "[password in plain text]"
}
```

**Data example**

```json
{
  "username": "iloveauth@example.com",
  "password": "abcd1234"
}
```

### Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

### Error Response

**Condition** : Si el usuario y contraseña no son válidos

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "errors": "Please add correct username and password"
}
```

## Register

Guarda un usuario

**URL** : `/api/register/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
  "username": "[valid email address]",
  "password": "[password in plain text]"
}
```

**Data example**

```json
{
  "username": "iloveauth@example.com",
  "password": "abcd1234"
}
```

### Success Response

**Code** : `202 OK`

**Content example**

```json
{
  "userId": "ObjectIdFromMongo"
}
```

### Error Response

**Condition** : Si el username o el password no se envían

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "message": "Please add username and passwords"
}
```

**Condition** : Si el username ya existe

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "message": "Username exist please login"
}
```

## Muestra todos los espacios

Lista de todos los espacios en la colección de `spaces`

**URL** : `/api/spaces/`

**Method** : `GET`

**Auth required** : YES

**Data constraints**

```json
no se enviará nada
```

**Data example**

```json
No aplica
```

### Success Response

**Code** : `200 OK`

**Content example**

```json
[
  {
    "_id": "mongoID",
    "listing_url": "https://www.airbnb.com/rooms/10059872",
    "name": "Soho Cozy, Spacious and Convenient",
    "summary": "Clean, fully furnish, Spacious 1 bedroom flat just off the escalator in Mid Levels. 2 minutes From Soho Bar and Restaurants. Located in a quiet alley 1 minute from Sun Yat Sen",
    "description": "Clean, fully furnish, Spacious 1 bedroom flat just off the escalator in Mid Levels. 2 minutes From Soho Bar and Restaurants. Located in a quiet alley 1 minute from Sun Yat Sen",
    "property_type": "Apartment",
    "room_type": "Entire home/apt",
    "minimum_nights": "4",
    "maximum_nights": "20",
    "cancellation_policy": "flexible",
    "accommodates": "3",
    "bedrooms": "1",
    "beds": "2",
    "number_of_reviews": "3",
    "bathrooms": "1.0",
    "price": "699.00",
    "weekly_price": "5000.00"
  },
  {
    "_id": "mongoID other",
    "listing_url": "https://www.airbnb.com/rooms/10059872",
    "name": "Soho Cozy Other, Spacious and Convenient",
    "summary": "Clean, fully furnish, Spacious 1 bedroom flat just off the escalator in Mid Levels. 2 minutes From Soho Bar and Restaurants. Located in a quiet alley 1 minute from Sun Yat Sen",
    "description": "Clean, fully furnish, Spacious 1 bedroom flat just off the escalator in Mid Levels. 2 minutes From Soho Bar and Restaurants. Located in a quiet alley 1 minute from Sun Yat Sen",
    "property_type": "Apartment",
    "room_type": "Entire home/apt",
    "minimum_nights": "4",
    "maximum_nights": "20",
    "cancellation_policy": "flexible",
    "accommodates": "3",
    "bedrooms": "1",
    "beds": "2",
    "number_of_reviews": "3",
    "bathrooms": "1.0",
    "price": "699.00",
    "weekly_price": "5000.00"
  },
  ...
]
```

### Error Response

No aplica

## Agregar un favorito a un usuario

Agrega un espacio favorito a un usuario

**URL** : `/api/favorites/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
  "userId": "userId",
  "spaceId": "spaceID",
}
```

**Data example**

```json
{
  "userId": "654684545421asd",
  "spaceId": "9878797897asd"
}
```

### Success Response

**Code** : `202 Created`

**Content example**

```json
{
  "message": "IdUser with favorite created"
}
```

### Error Response

- El favorito ya fue agregado

```json
{
  "message": "The user already set this favorite, please add another"
}
```

## Traer los favoritos de un usuario

Trae la lista de todos los ids de los favoritos del usuario

**URL** : `/api/favorites/:idUser`

**Method** : `GET`

**Auth required** : YES

**Data constraints**

```json
no se enviará nada porque se manda por queryParams
```

**Data example**

```json
No aplica
```

### Success Response

**Code** : `200 OK`

**Content example**

```json
["FavoriteId1", "FavoriteId2", "FavoriteId3"]
```

### Error Response

- Usuario no existe en favoritos

```json
{
  "message": "IdUser hasn't favorites please add one and try again"
}
```

## Modificar los favoritos de un usuario

Modifica la Lista de todos ids de los favoritos del usuario

**URL** : `/api/favorites/:idUser`

**Method** : `PUT`

**Auth required** : YES

**Data constraints**
```json
["favoriteId", "favoriteId2", "favoriteId3"]
```

**Data example**

```json
["987asd8a1", "987879dasa122", "asdq989555s"]
```

**Importante**
> Se debe de verificar que existan los ids de cada espacio
> Si se envía vacía deberá de mandar el error correspondiente

### Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "IdUser favorites list updated"
}
```

### Error Response

Alguno de los favoritos no existe en `spaces`
```json
{
  "message": "Invalid spaces id, please verify and try again",
  "value": ["invalidID", "otherInvalid"]
}
```

El usuario mandado aún no tiene favoritos agregados
```json
{
  "message": "IdUser hasn't get favorites list, please add first and then try updated"
}
```

El cliente esta enviando la lista de ids vacía
```json
{
  "message": "List is empty if you delete list of favorites please use DELETE method"
}
```

## Borrar un favorito de un usuario

Permite borrar un favorito o todos

**URL** : `/api/favorites/:idUser`

**Method** : `DELETE`

**Auth required** : YES

**Data constraints**

```json
nothing
```

**Data example**

```json
No aplica
```

**Importante**
> Cuando se utilice este método se deja el usuario pero la lista queda vacía

### Success Response

**Code** : `200 OK`

**Content example**

```json
[
  {
    "message": "favorite list of userId deleted"
  }
]
```



### Error Response

El usuario mandado aún no tiene favoritos agregados
```json
{
  "message": "IdUser hasn't get favorites list, please add first and then try deleted"
}
```


# Entrega

La entrega será en PR hacía la rama del examen, hacer pruebas unitarias y pruebas e2e (chai.request)

La fecha de entrega será para el día **Lunes 9 de Agosto 2021**