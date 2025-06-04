# BackEnd Fusion Challenge: **Create** and **Manage** a Star Wars-Inspired Galaxy

## Objective
Backend API that allows the creation, management and visualization of a Star Wars-inspired galaxy, including planets, star systems, characters and spaceships.

## 🚀 Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Prisma](https://www.prisma.io/) or TypeORM
- [PostgreSQL](https://www.postgresql.org/) or another relational database
- [JWT](https://jwt.io/) for authentication
- [Swagger](https://swagger.io/) for documentation

## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/guilhermeramos31/desafio-backend-fusion-01.git
```

### Install the dependencies
```bash
yarn install
```

### Configure the .env file
```bash
cp .env.example .env
```
#### ⚙️ Configuration Environment File
```text
DATABASE_URL=your_database_url

JWT_SECRET=your_secret

PORT=3000 

SALT_PASSWORD=10
```
### Generate prisma client
```bash
yarn prisma generate
```

### Applied migrations 
```bash
yarn prisma migrate deploy
```

### Run system

<small>*Starts the server in production mode.*</small>
```bash
yarn start
```
or

<small>*Starts the server in development mode with hot-reload.*</small>
```bash
yarn start:dev
```

# Endpoints

## 🔑 Authentication Endpoints
| Method | Endpoint                 | Description                          | Parameters                                         | Status Codes      |
|--------|--------------------------|--------------------------------------|----------------------------------------------------|-------------------|
| POST   | `/auth/login`            | Authenticate existing user           | -                                                  | 200, 401          |
| POST   | `/auth/register`         | Register new user                    | -                                                  | 201, 400, 409     |

## 👤 User Endpoints
| Method | Endpoint                 | Description                          | Parameters                                         | Status Codes      |
|--------|--------------------------|--------------------------------------|----------------------------------------------------|-------------------|
| POST   | `/user`                  | Create new user account              | -                                                  | 201, 400, 409     |
| GET    | `/user/{email}`          | Get user by email                    | `email` (string)                                   | 200, 404          |
| PATCH  | `/user/{id}`             | Update user details                  | `id` (UUID)                                        | 200, 400, 404     |
| DELETE | `/user/{id}`             | Delete user account                  | `id` (UUID)                                        | 200, 404          | 
| PATCH  | `/user/password/{id}`    | Update user password                 | `id` (UUID)                                        | 200, 400, 404     |

## 🌌 Star Systems Endpoints
| Method | Endpoint                 | Description                          | Parameters                                         | Status Codes      |
|--------|--------------------------|--------------------------------------|----------------------------------------------------|-------------------|
| POST   | `/star-systems`          | Create a new star system             | Body (JSON)                                        | 201, 400, 409     |
| GET    | `/star-systems`          | List star systems with pagination    | `page`, `limit`, `orderBy` (optional query params) | 200, 400          |
| GET    | `/star-systems/{id}`     | Find star system                     | `id` (UUID)                                        | 200, 404          |
| PUT    | `/star-systems/{id}`     | Update star system                   | `id` (UUID), Body (JSON)                           | 200, 400, 404     |
| DELETE | `/star-systems/{id}`     | Delete star system                   | `id` (UUID)                                        | 200, 404          |

## 🌍 Planet
| Method | Endpoint                 | Description                          | Parameters                                         | Status Codes      |
|--------|--------------------------|--------------------------------------|----------------------------------------------------|-------------------|
| POST   | `/planets`               | Create a new planet                  | Body (JSON)                                        | 201, 400, 409     |
| GET    | `/planets`               | Get all planets with pagination      | `page`, `limit`, `orderBy` (optional query params) | 200, 400          |
| GET    | `/planets/{id}`          | Find planet                          | `id` (UUID)                                        | 200, 404          |
| PATCH  | `/planets/{id}`          | Update planet                        | `id` (UUID), Body (JSON)                           | 200, 400, 404     |
| DELETE | `/planets/{id}`          | Delete planet                        | `id` (UUID)                                        | 200, 404          |

## 🚶 Characters
| Method | Endpoint                 | Description                          | Parameters                                         | Status Codes      |
|--------|--------------------------|--------------------------------------|----------------------------------------------------|-------------------|
| POST   | `/characters`            | Create a new character               | Body (JSON)                                        | 201, 400, 409     |
| GET    | `/characters`            | Get all characters with pagination   | `page`, `limit`, `orderBy` (optional query)        | 200, 400          |
| GET    | `/characters/{id}`       | Find character                       | `id` (UUID)                                        | 200, 404          |
| PUT    | `/characters/{id}`       | Update character                     | `id` (UUID), Body (JSON)                           | 200, 400, 404     |
| DELETE | `/characters/{id}`       | Delete character                     | `id` (UUID)                                        | 200, 404          |

## 🛸 Spaceship
| Method  | Endpoint                | Description                          | Parameters                                         | Status Codes      |
|---------|-------------------------|--------------------------------------|----------------------------------------------------|-------------------|
| POST    | `/spaceships`           | Create a new spaceship               | Body (JSON)                                        | 201, 400, 409     |
| GET     | `/spaceships`           | Get all spaceships                   | —                                                  | 200, 400          |
| GET     | `/spaceships/{id}`      | Get spaceship by ID                  | `id` (UUID)                                        | 200, 404          |
| PATCH   | `/spaceships/{id}`      | Update spaceship partially           | `id` (UUID), Body (JSON)                           | 200, 400, 404     |
| DELETE  | `/spaceships/{id}`      | Delete spaceship by ID               | `id` (UUID)                                        | 200, 404          |



### Examples Json Requests

*Login*
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

*Register*
```json
{
  "name": "john",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

*Update User*
```json
{
  "name": "jhon"
}
```

*Update Password*
```json
{
  "password": "SecurePass1234!"
}
```

*Create Star System*
```json
{
  "name": "Sistema Solar",
  "description": "Nosso sistema"
}
```

*Update Star System*
```json
{
  "name": "Sistema Solar",
  "description": "Update star system with the provided data"
}
```

*Create Planet*
```json
{
  "name": "Terra",
  "climate": "TEMPERATE",
  "terrain": "GRASSLANDS",
  "population": 0,
  "starSystemId": "daoisjheduiqwey1723141sdasd"
}
```

*Update Climate or Terrain Planet*
```json
{
  "climate": "TEMPERATE",
  "terrain": "URBAN"
}
```

```json
{
  "climate": "TEMPERATE",
}
```

```json
{
  "terrain": "URBAN"
}
```

*Create Characters*
```json
{
  "name": "John",
  "specie": "YODA_SPECIES",
  "affiliation": "MANDALORIANS",
  "homePlanetId": "f395099b-1198-4805-9363-1cbafa5e20d0"
}
```

*Update Characters*
```json
{
  "name": "John"
}
```

*Create Spaceship*
```json
{
  "name": "ASdaw",
  "model": "N33-as",
  "manufacturer": "ship",
  "passengerCapacity": 100
}
```

*Update Spaceship*
```json
{
  "name": "Millennium Falcon",
  "model": "YT-1300"
}
```

### Examples Json Responses

*Login*
```json
{
  "message": "Logado com sucesso",
  "user": {
    "id": "asdnaoishd12378461hnaujdh",
    "email": "john@example.com",
    "name": "john",
    "createdAt": "2025-05-22T17:06:37.019Z",
    "updatedAt": "2025-05-22T17:06:37.019Z"
  },
  "token": "odmaoskdojafoihfeyt413784nlkfabnufg37421y0adosjknd0auiw6y417384034nbkjfba78t"
}
```

*Register user*
```json
{
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": "asdnaoishd12378461hnaujdh",
    "email": "john@example.com",
    "name": "john",
    "createdAt": "2025-05-22T17:06:37.019Z",
    "updatedAt": "2025-05-22T17:06:37.019Z"
  }
}
```

*Find user*
```json
{
  "message": "Usuário encontrado com sucesso",
  "user": {
    "id": "asdnaoishd12378461hnaujdh",
    "email": "john@example.com",
    "name": "john",
    "createdAt": "2025-05-22T17:06:37.019Z",
    "updatedAt": "2025-05-22T17:06:37.019Z"
  }
}
```

*Update user*
```json
{
  "message": "Usuário atualizado",
  "user": {
    "id": "asdnaoishd12378461hnaujdh",
    "email": "john@example.com",
    "name": "john",
    "createdAt": "2025-05-22T17:06:37.019Z",
    "updatedAt": "2025-05-22T17:06:37.019Z"
  }
}
```

*Delete user* 
```json
{
  "message": "Usuário deletado com sucesso"
}
```

*Update password*
```json
{
  "message": "Senha atualizada com sucesso",
  "user": {
    "id": "asdnaoishd12378461hnaujdh",
    "email": "john@example.com",
    "name": "john",
    "createdAt": "2025-05-22T17:06:37.019Z",
    "updatedAt": "2025-05-22T17:06:37.019Z"
  }
}
```

*Create Star System*
```json
{
  "message": "Sistema criado com sucesso",
  "starSystem": {
    "id": "asdnaoishd12378461hnaujdh",
    "name": "Sistema Solar",
    "description": "Nosso Sistema Solar"
  }
}
```

*List star system with pagination*

```json
{
  "data": [
    {
      "id": "asdnaoishd12378461hnaujdh",
      "name": "Sistema Solaaaar",
      "description": "Nosso sistema"
    },
    {
      "id": "asdnaoishd12378461hnaujdh",
      "name": "Sistema Solaaaaaaaar",
      "description": "Nosso sistema"
    },
    {
      "id": "asdnaoishd12378461hnaujdh",
      "name": "Sistema Solar",
      "description": "Nosso sistema"
    }
  ],
  "meta": {
    "totalItems": 13,
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalPages": 2
  }
}
```

*Find star system*
```json
{
  "message": "Sistema solar encontrado com sucesso",
  "starSystem": {
    "id": "asdnaoishd12378461hnaujdh",
    "name": "Sistema Solar",
    "description": "Nosso Sistema Solar"
  }
}
```

*Update star system*
```json
{
  "message": "Sistema solar atualizado com sucesso",
  "starSystem": {
    "id": "asdnaoishd12378461hnaujdh",
    "name": "Sistema Solar",
    "description": "Nosso Sistema Solar"
  }
}
```

*Delete star system*
```json
{
  "message": "Sistema deletado com sucesso"
}
```

*Create Planet*
```json
{
  "message": "Planeta criado com sucesso",
  "data": {
    "id": "f395099b-1198-4805-9363-1cbafa5e20d0",
    "name": "Marte",
    "climate": "TEMPERATE",
    "terrain": "GRASSLANDS",
    "population": "0",
    "StarSystems": {
      "id": "5ebfe608-bc55-4f66-a2ab-7652de1456b7",
      "name": "Sistema Solar",
      "description": "Nosso sistema"
    }
  }
}
```

*List Planet*
```json
{
  "data": [
    {
      "id": "f395099b-1198-4805-9363-1cbafa5e20d0",
      "name": "Marte",
      "climate": "TEMPERATE",
      "terrain": "GRASSLANDS",
      "population": "0",
      "StarSystems": {
        "id": "5ebfe608-bc55-4f66-a2ab-7652de1456b7",
        "name": "Sistema Solar",
        "description": "Nosso sistema"
      }
    },
    {
      "id": "083b9d54-eecd-4b1f-ab8b-3afe1dd26fa6",
      "name": "Plutão",
      "climate": "TEMPERATE",
      "terrain": "GRASSLANDS",
      "population": "0",
      "StarSystems": {
        "id": "5ebfe608-bc55-4f66-a2ab-7652de1456b7",
        "name": "Sistema Solar",
        "description": "Nosso sistema"
      }
    }
  ],
  "meta": {
    "totalItems": 2,
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalPages": 1,
    "orderBy": "asc"
  }
}
```

*Find Planet*
```json
{
  "message": "Planeta encontrado",
  "data": {
    "id": "f395099b-1198-4805-9363-1cbafa5e20d0",
    "name": "Marte",
    "climate": "TEMPERATE",
    "terrain": "GRASSLANDS",
    "population": "0",
    "StarSystems": {
      "id": "5ebfe608-bc55-4f66-a2ab-7652de1456b7",
      "name": "Sistema Solar",
      "description": "Nosso sistema"
    }
  }
}
```

*Update Planet*
```json
{
  "message": "Planeta atualizado com sucesso",
  "data": {
    "id": "f395099b-1198-4805-9363-1cbafa5e20d0",
    "name": "Marte",
    "climate": "TEMPERATE",
    "terrain": "GRASSLANDS",
    "population": "0",
    "StarSystems": {
      "id": "5ebfe608-bc55-4f66-a2ab-7652de1456b7",
      "name": "Sistema Solar",
      "description": "Nosso sistema"
    }
  }
}
```

*Delete Planet*
```json
{
  "message": "Planeta deletado com sucesso"
}
```

*Create Character*
```json
{
  "message": "Personagem criado com sucesso",
  "data": {
    "id": "835dd03e-50ac-47f0-b8c2-edc149ee205d",
    "name": "John",
    "specie": "YODA_SPECIES",
    "affiliation": "MANDALORIANS",
    "homePlanet": {
      "id": "f395099b-1198-4805-9363-1cbafa5e20d0",
      "name": "Marte",
      "climate": "TEMPERATE",
      "terrain": "GRASSLANDS",
      "population": "1",
      "StarSystems": {
        "id": "5ebfe608-bc55-4f66-a2ab-7652de1456b7",
        "name": "Sistema Solar",
        "description": "Nosso sistema"
      }
    }
  }
}
```

*List Character*
```json
{
  "data": [
    {
      "id": "d2f4e6ce-e77a-4a7c-8dcc-4f4cbebc5ab8",
      "name": "Boba Fett",
      "specie": "HUMAN",
      "affiliation": "BOUNTY_HUNTERS",
      "homePlanet": {
        "id": "f395099b-1198-4805-9363-1cbafa5e20d0",
        "name": "Marte",
        "climate": "TEMPERATE",
        "terrain": "GRASSLANDS",
        "population": "3",
        "StarSystems": {
          "id": "5ebfe608-bc55-4f66-a2ab-7652de1456b7",
          "name": "Sistema Solar",
          "description": "Nosso sistema"
        }
      }
    },
    {
      "id": "2c3b93fa-d232-4ff9-8e08-0bdf64bf81af",
      "name": "Din Djarin",
      "specie": "HUMAN",
      "affiliation": "MANDALORIANS",
      "homePlanet": {
        "id": "f395099b-1198-4805-9363-1cbafa5e20d0",
        "name": "Marte",
        "climate": "TEMPERATE",
        "terrain": "GRASSLANDS",
        "population": "3",
        "StarSystems": {
          "id": "5ebfe608-bc55-4f66-a2ab-7652de1456b7",
          "name": "Sistema Solar",
          "description": "Nosso sistema"
        }
      }
    },
    {
      "id": "11b24704-369d-4841-bbd7-a568a6946786",
      "name": "John",
      "specie": "YODA_SPECIES",
      "affiliation": "MANDALORIANS",
      "homePlanet": {
        "id": "f395099b-1198-4805-9363-1cbafa5e20d0",
        "name": "Marte",
        "climate": "TEMPERATE",
        "terrain": "GRASSLANDS",
        "population": "3",
        "StarSystems": {
          "id": "5ebfe608-bc55-4f66-a2ab-7652de1456b7",
          "name": "Sistema Solar",
          "description": "Nosso sistema"
        }
      }
    }
  ],
  "meta": {
    "totalItems": 3,
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalPages": 1,
    "orderBy": "asc"
  }
}
```

*Find Character*
```json
{
  "message": "Personagem encontrado",
  "data": {
    "id": "835dd03e-50ac-47f0-b8c2-edc149ee205d",
    "name": "John",
    "specie": "YODA_SPECIES",
    "affiliation": "MANDALORIANS",
    "homePlanet": {
      "id": "f395099b-1198-4805-9363-1cbafa5e20d0",
      "name": "Marte",
      "climate": "TEMPERATE",
      "terrain": "GRASSLANDS",
      "population": "1",
      "StarSystems": {
        "id": "5ebfe608-bc55-4f66-a2ab-7652de1456b7",
        "name": "Sistema Solar",
        "description": "Nosso sistema"
      }
    }
  }
}
```


*Update Character*
```json
{
  "message": "Personagem atualizado com sucesso",
  "data": {
    "id": "835dd03e-50ac-47f0-b8c2-edc149ee205d",
    "name": "John",
    "specie": "YODA_SPECIES",
    "affiliation": "MANDALORIANS",
    "homePlanet": {
      "id": "f395099b-1198-4805-9363-1cbafa5e20d0",
      "name": "Marte",
      "climate": "TEMPERATE",
      "terrain": "GRASSLANDS",
      "population": "1",
      "StarSystems": {
        "id": "5ebfe608-bc55-4f66-a2ab-7652de1456b7",
        "name": "Sistema Solar",
        "description": "Nosso sistema"
      }
    }
  }
}
```

*Delete Character*
```json
{
  "message": "Personagem deletado com sucesso"
}
```

*Create Spaceship*
```json
{
  "message": "Nave espacial criada com sucesso",
  "data": {
    "id": "832cf15d-2879-4ff7-a7d5-6ebab0b5a9af",
    "name": "ASdaw",
    "model": "N33-as",
    "manufacturer": "ship",
    "passengerCapacity": 100
  }
}
```

*List Spaceship*
```json
{
  "data": [
    {
      "id": "832cf15d-2879-4ff7-a7d5-6ebab0b5a9af",
      "name": "ASdaw",
      "model": "N33-as",
      "manufacturer": "ship",
      "passengerCapacity": 100
    }
  ],
  "meta": {
    "totalItems": 1,
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalPages": 1,
    "orderBy": "asc"
  }
}
```
*Find Spaceship*
```json
{
  "message": "Nave espacial encontrada",
  "data": {
    "id": "832cf15d-2879-4ff7-a7d5-6ebab0b5a9af",
    "name": "ASdaw",
    "model": "N33-as",
    "manufacturer": "ship",
    "passengerCapacity": 100
  }
}
```

*Update Spaceship*
```json
{
  "message": "Nave atualizada com sucesso",
  "data": {
    "id": "832cf15d-2879-4ff7-a7d5-6ebab0b5a9af",
    "name": "ASdaw",
    "model": "N33-as",
    "manufacturer": "ship",
    "passengerCapacity": 100
  }
}
```

*Delete Spaceship*
```json
{
  "message": "Nave deletada com sucesso"
}
```

### Examples Json Errors

*400 - Bad Request*
```json
{
  "statusCode": 400,
  "message": [
    "password should not be empty"
  ],
  "error": "Bad Request"
}
```
*401 - Unauthorized*
```json
{
  "statusCode": 401,
  "message": "Credenciais inválidas",
  "error": "Unauthorized"
}
```
*404 - Not Found*
```json
{
  "statusCode": 404,
  "message": "Usuário não encontrado",
  "error": "Not Found"
}
```
*409 - Conflict*
```json
{
  "statusCode": 409,
  "message": "Já existe um usuário com este e-mail cadastrado",
  "error": "Conflict"
}
```
