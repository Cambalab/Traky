

## Levantar una API con datos mockeados usando json-server

Json-server es un programa que permite levantar una API web de manera sencilla. Este modulo te permite configurar desde los datos que se van a retornar como un servidor completo.
En nuestro caso, vamos a utilizar la opción de tener datos por defecto.

### Pasos

#### Instalar json-server
Vamos a agregar json-server como dependencia de desarrollo ya que no necesitamos que se "buildee" junto a la aplicación ionic
- `npm install --save-dev json-server`

#### Estructura del servidor dentro del proyecto
Vamos a crear una carpeta `server` en el `root` del proyecto donde vamos a guardar los archivos de configuración para json-server
- `mkdir server`

#### Cómo configurar json-server?
Dentro de json-server, se pueden configurar varios puntos, desde que rutas y data devolver, hasta configurarlo como servidor completo.
Podemos utilizar las siguientes opciones

##### Configuración de datos estáticos
Usando esta opción los datos que se utilizarán en la API del servidor serán los mismos(Revisar cómo modificar mediante la API: `Content-Type: application/json`).  
Para esto vamos a crear un archivo `data.json` con la información estática a mockear.
- `touch server/data.json` 
```json
{
  "users": [
    {
      "id": 1,
      "username": "camba@coop",
      "password": "123456"
    }
  ]
}
```
Al levantar json-server con esta configuración, se crearán los siguientes endpoints(Recurso CRUD básico):
- GET    `/users`
- GET    `/users/1`
- POST   `/users`
- PUT    `/users/1`
- PATCH  `/users/1`
- DELETE `/users/1`

Levantar el servidor
- `json-server --watch server/data.json`

##### Generar la información de manera programática
En este caso, la data generada se realizará al iniciar el start-up del server.  
Esto permite que la data a utilizar pueda ser generada de manera programática usando JS, es muy útil si queremos crear datos aleatorios usando alguna librería como Faker, Casual, etc.  
Para esto vamos a crear un archivo `server/index.js`
- `touch server/index.js`
```js
module.exports = () => {
  const data = { users: [] }
  // Create 1000 users
  for (let i = 0; i < 1000; i++) {
    data.users.push({ id: i, username: `user-${i}`, password: `user-${i}`})
  }
  return data
}
```
La función definida en el export será ejecutada al iniciar el servidor tomando la configuración del json retornado.  
Entonces, levantamos el servidor con el siguiente comando
- `json-server server/index.js`

##### Configuración completa de json-server
Por último, el caso más customizable es configurar todo el ciclo de arranque del servidor json-server, se hace de manera similar a un servidor Express.  
Para esto vamos a crear un archivo `server/server.js`.
- `touch server/server.js`
```js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
```
En este caso podemos modificar:
- la creación de rutas,
```js
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})
```
- todas las requests o control de accesos mediante middlewares
```js
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})
server.use((req, res, next) => {
 if (isAuthorized(req)) {
   next()
 } else {
   res.sendStatus(401)
 }
})
```
A diferencia de los otros casos, vamos a utilizar `node` para levantar el servidor
- `node server/server.js`

#### Consideraciones finales
Se pueden configurar las rutas que se van a utilizar mediante un archivo json.  
Por ejemplo, creamos el archivo `routes.json`
- `touch server/routes.json`
```json
{
  "/api/*": "/$1",
  "/users/:id/hours": "/hours?userId=:id",
  "/groups/:userId": "/groups"
}
```
Y levantamos el servidor con esa configuracion
- `json-server server/data.json --routes routes.json`

### Cómo utilizar el servidor de prueba
Una vez configurado, este servidor se tendrá que ejecutar de manera simultánea al desarrollo de la aplicación mobile. Esto 
significa que tendremos dos procesos nodes ejecutandose en paralelo, uno para levantar la aplicación mobile/web y otro para el servidor.  
Por ejemplo:
- `ionic serve& npm run server:start&`

o en dos terminales diferentes
- `ionic serve`
- `npm run server:start`

### Referencias:
- [Json Server](https://github.com/typicode/json-server)
- [How to build a mock rest API with Json Server and Faker?](https://medium.com/backticks-tildes/building-a-mock-rest-api-with-json-server-812ed3e6036a)
