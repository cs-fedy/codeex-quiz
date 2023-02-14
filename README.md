# _**codeex quiz - backend**_

codeex quiz platform backend system using `Node.js`, `Nest.js`, `TypeScript` and `mongo db`.

**P.S: [docker](https://www.docker.com/) is required**

## _**installation**_

1. Clone the repo `git clone https://github.com/cs-fedy/codeex-quiz.git`
2. Change your current directory to the repo dir: `cd codeex-quiz`
3. make a `.env` file having the `key=value` pairs shown below.
4. Run `docker compose up -d` to start the db.
5. If not working with node as a container then install yarn: `np i -g yarn`
6. Install all the dependencies: `yarn install` - accessible in the `api` directory
7. Run the system in a dev env: `yarn run dev` - accessible in the `api` directory

## _**used tools**_

1. [Node.js](https://nodejs.org/en/): Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
2. [Nest.js](https://nestjs.com/): A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
3. [TypeScript](https://www.typescriptlang.org/): TypeScript is JavaScript with syntax for types.
4. [Mongodb](https://www.mongodb.com/): MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need.

## _**.env key=value pairs**_

```
ENV=development
PORT=3001
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=admin
MONGODB_URL='mongodb://admin:admin@codeex-db:27017'
REDIS_PORT=6379
REDIS_HOST=codeex-cache
CLIENT_URL="http://localhost:5173"
BASE_URL="http://localhost:3001"
JWT_SECRET="A STROOOOOOOOOOOOOOOONG JWT secret"
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=5
```
