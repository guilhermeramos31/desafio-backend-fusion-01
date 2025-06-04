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
# 📂 Project structure
```markdown
prisma/
├── migrations/                                            # Auto-generated migration folders and files for versioning your database schema
│   ├── 20250520201904_init/                               # A specific migration folder, usually timestamped
│   │   └── migration.sql                                  # SQL file defining schema changes for this migration
│   └── migration_lock.toml                                # Lock file ensuring migration consistency across environments
├── schema.prisma                                          # Main Prisma schema file where models, database connection, and generator settings are defined
│   
src/
├── @types/                                                # Custom TypeScript type definitions and global module extensions
│   ├── express.d.ts                                       # Type extension for the Express Request interface (e.g., adding a `user` property)
│   └── index.ts                                           # Entry point for exporting custom types
│   
├── config/                                                # Application-level configuration files
│   ├── jwt.ts                                             # JWT-related configuration (e.g., secret key, expiration)
│   └── passwordHash.ts                                    # Functions for hashing and comparing passwords using bcrypt or similar
│   
├── modules/                                               # Modular structure for application features
│   ├── auth/                                              # Authentication module
│   │   ├── dto/                                           # Data Transfer Objects (used for input validation and data typing)
│   │   │   ├── inputs/                                    # DTOs for request bodies
│   │   │   │   ├── jwt-payload.dto.ts                     # Defines the structure of the decoded JWT payload
│   │   │   │   └── login-auth.dto.ts                      # Structure and validation rules for login requests
│   │   │   └── index.ts                                   # Central export file for DTOs
│   │   ├── guards/                                        # Guards used to protect routes based on authentication/authorization
│   │   │   └── jwt-auth.guard.ts                          # Guard that validates JWT and attaches user to the request
│   │   ├── strategies/                                    # Authentication strategies for Passport.js
│   │   │   └── jwt.strategy.ts                            # Strategy for validating JWT tokens and loading the user
│   │   ├── auth.controller.ts                             # Handles HTTP requests for authentication (e.g., login)
│   │   ├── auth.module.ts                                 # Declares and provides all auth-related services, strategies, and controllers
│   │   └── auth.service.ts                                # Business logic for login, token generation, and validation
│   │
│   ├── character/
│   │   ├── dto/
│   │   │   ├── inputs/
│   │   │   │   ├── create-character.input.dto.ts          # Input DTO for character creation
│   │   │   │   ├── pagination-character.input.dto.ts      # Input DTO for pagination parameters
│   │   │   │   └── update-character.input.dto.ts          # Input DTO for character updates
│   │   │   ├── outputs/
│   │   │   │   └── pagination-character.output.dto.ts     # Output DTO for paginated responses
│   │   │   └── index.ts                                   # File for DTO exports
│   │   ├── entity/
│   │   │   └── character.entity.ts/                       # Character entity definition
│   │   ├── character.controller.ts                        # API route handlers
│   │   ├── character.module.ts                            # Module configuration
│   │   └── character.service.ts                           # Business logic/service layer
│   │
│   ├── planet/
│   │   ├── dto/
│   │   │   ├── inputs/
│   │   │   │   ├── create-planet.input.dto.ts             # Input DTO for planet creation
│   │   │   │   ├── pagination-planet.input.dto.ts         # Input DTO for pagination parameters
│   │   │   │   └── update-planet.input.dto.ts             # Input DTO for planet updates
│   │   │   ├── outputs/
│   │   │   │   └── pagination-planet.output.dto.ts        # Output DTO for paginated responses
│   │   │   └── index.ts                                   # File for DTO exports
│   │   ├── entity/
│   │   │   └── planet.entity.ts                           # Planet entity definition
│   │   ├── planet.controller.ts                           # API route handlers
│   │   ├── planet.module.ts                               # Module configuration
│   │   └── planet.service.ts                              # Business logic/service layer
│   │
│   ├── star-system/                                       # Star System module – domain logic for managing star system entities
│   │   ├── dto/                                           # DTOs for star system input validation and response formatting
│   │   │   ├── inputs/                                    # Input DTOs – schemas for creating and updating star systems
│   │   │   │   ├── create-star-system.dto.ts              # Defines required fields for creating a new star system
│   │   │   │   ├── pagination-star-system.dto.ts          # Pagination input structure for listing star systems
│   │   │   │   └── update-star-system.dto.ts              # Defines editable fields for updating an existing star system
│   │   │   ├── outputs/                                   # Output DTOs – structures for formatting responses sent to clients
│   │   │   │   └── response-star-system.output.dto.ts     # Defines the structure of returned star system data
│   │   │   └── index.ts                                   # Central export file for star system DTOs
│   │   ├── star-system.controller.ts                      # Handles HTTP requests (CRUD operations) related to star systems
│   │   ├── star-system.module.ts                          # NestJS module definition for encapsulating star system logic and providers
│   │   └── star-system.service.ts                         # Core business logic for interacting with the database and managing star system operations
│   │
│   ├── user/                                              # User management module
│   │   ├── dto/                                           # DTOs for handling user-related requests and responses
│   │   │   ├── inputs/                                    # Input schemas for various user operations
│   │   │   │   ├── create-user.input.dto.ts               # Defines fields required to create a new user
│   │   │   │   ├── find-user.input.dto.ts                 # Criteria for searching users
│   │   │   │   ├── update-password.input.dto.ts           # Fields and validation rules for changing a password
│   │   │   │   └── update-user.input.dto.ts               # Fields allowed for updating user profile information
│   │   │   ├── outputs/                                   # Output schemas for exposing safe user data
│   │   │   │   └── response-user.output.dto.ts            # Defines structure of user data returned to the client
│   │   │   └── index.ts                                   # Central export file for user DTOs
│   │   ├── user.controller.ts                             # Exposes endpoints for user CRUD operations
│   │   ├── user.module.ts                                 # Binds user services, controllers, and providers
│   │   └── user.service.ts                                # Implements business logic for user registration, updates, and retrieval
│   │
│   ├── shared/                                            # Shared utilities and infrastructure used across modules
│   │   ├── decorators/                                    # Custom decorators to enhance functionality (e.g., Swagger docs, user injection)
│   │   │   ├── docs/                                      # Decorators specifically for Swagger documentation
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login-auth.decorator.ts            # Swagger decorator for login route documentation
│   │   │   │   │   ├── register-auth.decorator.ts         # Swagger decorator for register route documentation
│   │   │   │   │   └── update-password.decorator.ts       # Swagger decorator for update password documentation
│   │   │   │   │
│   │   │   │   ├── examples/                              # Predefined request/response examples for Swagger UI
│   │   │   │   │   ├── auth.example.ts                    # Example payloads and responses for auth endpoints
│   │   │   │   │   ├── error.example.ts                   # Standardized error response examples
│   │   │   │   │   ├── star-system.example.ts             # Example payloads and responses for star system endpoints
│   │   │   │   │   └── user.example.ts                    # Example user data responses
│   │   │   │   │
│   │   │   │   ├── planet/
│   │   │   │   │   ├── create-planet.decorator.ts         # Swagger decorator for creating a planet
│   │   │   │   │   ├── delete-planet.decorator.ts         # Swagger decorator for deleting a planet
│   │   │   │   │   ├── find-all-planet.decorator.ts       # Swagger decorator for listing all planet
│   │   │   │   │   ├── find-planet.decorator.ts           # Swagger decorator for finding a specific planet
│   │   │   │   │   └── update-planet.decorator.ts         # Swagger decorator for updating a planet
│   │   │   │   │
│   │   │   │   ├── star-system/
│   │   │   │   │   ├── create-star-system.decorator.ts    # Swagger decorator for creating a star system
│   │   │   │   │   ├── delete-star-system.decorator.ts    # Swagger decorator for deleting a star system
│   │   │   │   │   ├── find-all-star-system.decorator.ts  # Swagger decorator for listing all star systems
│   │   │   │   │   ├── find-star-system.decorator.ts      # Swagger decorator for finding a specific star system
│   │   │   │   │   └── update-star-system.decorator.ts    # Swagger decorator for updating a star system
│   │   │   │   │
│   │   │   │   └── user/
│   │   │   │       ├── create-user.decorator.ts           # Swagger decorator for creating a user
│   │   │   │       ├── delete-user.decorator.ts           # Swagger decorator for deleting a user
│   │   │   │       ├── find-user.decorator.ts             # Swagger decorator for finding a user
│   │   │   │       └── update-user.decorator.ts           # Swagger decorator for updating a user
│   │   │   └── index.ts                                   # Exports all custom decorators from a single access point
│   │   │
│   │   ├── dtos/
│   │   │   ├── index.ts                                   # Entry point for re-exporting shared resources
│   │   │   ├── outputs.dto.ts                             # Responses generic
│   │   │   └── pagination.dto.ts                          # Responses list generic
│   │   │
│   │   ├── interceptors/                                  # NestJS interceptors for transforming or augmenting requests/responses
│   │   │   ├── pagination.interceptor.ts                  # Automatically handles pagination (e.g., attaching metadata to paginated responses)
│   │   │   └── index.ts                                   # Re-exports all interceptors for simplified imports
│   │   │
│   │   ├── prisma/                                        # Prisma module abstraction
│   │   │   ├── prisma.module.ts                           # Provides PrismaService as a global module dependency
│   │   │   └── prisma.service.ts                          # Initializes and exposes the Prisma Client instance
│   │   │
│   │   ├── utils/                                         # General-purpose helper functions and interfaces
│   │   │   ├── interfaces/                                # Interface definitions used across multiple layers
│   │   │   │   └── error-example.interface.ts             # Interface for standardizing example error objects
│   │   │   ├── index.ts                                   # Entry point for re-exporting shared resources
│   │   │   └── transform-planet.ts                        # Converter type planet prisma for planet entity
│   │   │
│   ├── app.module.ts                                      # Root application module where all feature modules are imported
│   └── main.ts                                            # Main entry point of the application; sets up and starts the NestJS app
│   
test/                                                      # Unit and integration tests
├── auth/                                                  # Tests related to the auth module
│   ├── auth.controller.spec.ts                            # Unit tests for the auth controller
│   └── auth.service.spec.ts                               # Unit tests for the auth service
│
├── prisma/                                                # Tests related to Prisma layer
│   └── prisma.service.spec.ts                             # Unit or integration tests for PrismaService
│
├── star-system/                                           # Tests for a specific module named "star-system"
│   ├── star-system.controller.spec.ts                     # Tests for the controller logic
│   └── star-system.service.spec.ts                        # Tests for the service/business logic
│
├── user/                                                  # Tests related to the user module
│   ├── user.controller.spec.ts                            # Tests for user controller endpoints
│   └── user.service.spec.ts                               # Tests for user service functions
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
