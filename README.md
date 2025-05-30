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
├── migrations/             # Database migration files
│   ├── 20250520201904_init/  # Initial migration folder
│   │   └── migration.sql     # SQL migration script
│   └── migration_lock.toml   # Migration lock file
└── schema.prisma           # Prisma schema definition

src/
├── @types/                 # TypeScript type declarations
│   ├── express.d.ts        # Express type extensions
│   └── index.ts            # Type exports
│
├── config/                 # Configuration files
│   ├── jwt.ts              # JWT configuration
│   └── passwordHash.ts     # Password hashing utilities
│
├── modules/                # Application modules
│   ├── auth/               # Authentication module
│   │   ├── dtos/           # Data Transfer Objects
│   │   │   └── inputs      # Request payload definitions
│   │   │       ├── jwt-payload.dto.ts  # Decoded JWT content structure
│   │   │       └── login-auth.dto.ts   # Login request validation
│   │   ├── guards/         # Authorization guards
│   │   ├── strategies/     # Authentication strategies
│   │   ├── auth.controller.ts  # Auth endpoints
│   │   ├── auth.module.ts     # Auth module definition
│   │   └── auth.service.ts    # Auth business logic
│   │
│   ├── user/               # User management module
│   │   ├── dtos/           # Data Transfer Objects
│   │   │   ├── inputs      # User request schemas
│   │   │   │   ├── create-user.input.dto.ts  # New user requirements
│   │   │   │   ├── find-user.input.dto.ts    # User lookup criteria
│   │   │   │   ├── update-password.input.dto.ts  # Password change rules
│   │   │   │   └── update-user.input.dto.ts  # Profile update constraints
│   │   │   └── outputs     # User response schemas
│   │   │       └── response-user.output.dto.ts  # Safe user data exposure
│   │   ├── user.controller.ts  # User endpoints
│   │   ├── user.module.ts     # User module definition
│   │   └── user.service.ts    # User business logic
│   │
│   ├── shared/             # Shared resources
│   │   ├── decorators/     # Custom decorators
│   │   │   ├── docs/       # Documentation decorators
│   │   │   │   ├── examples/  # Example payloads
│   │   │   │   │   ├── auth.example.ts    # Auth examples
│   │   │   │   │   ├── error.example.ts   # Error examples
│   │   │   │   │   └── user.example.ts    # User examples
│   │   │   │   └── *.decorator.ts         # Swagger docs
│   │   │   └── index.ts    # Decorator exports
│   │   │
│   │   ├── prisma/         # Database layer
│   │   │   ├── prisma.module.ts  # Prisma module
│   │   │   └── prisma.service.ts # DB operations
│   │   │
│   │   ├── utils/          # Utility functions
│   │   │   └── interfaces/ # Type interfaces
│   │   │       └── error-example.interface.ts  # Error types
│   │   └── index.ts        # Shared module exports
│   │
│   ├── app.module.ts       # Root application module
│   └── main.ts             # Application entry point

test/                       # Test suites
├── auth/                   # Auth module tests
│   ├── auth.controller.spec.ts  # Controller tests
│   └── auth.service.spec.ts     # Service tests
│
├── prisma/                 # Database tests
│   └── prisma.service.spec.ts  # Prisma service tests
│
└── user/                   # User module tests
    ├── user.controller.spec.ts  # Controller tests
    └── user.service.spec.ts     # Service tests
```
# Endpoints

## 🔑 Authentication Endpoints
| Method | Endpoint            | Description                     | Parameters       | Status Codes  |
|--------|---------------------|---------------------------------|------------------|---------------|
| POST   | `/auth/login`       | Authenticate existing user      | -                | 200, 401      |
| POST   | `/auth/register`    | Register new user               | -                | 201, 400, 409 |

## 👤 User Endpoints
| Method | Endpoint                  | Description                     | Parameters       | Status Codes   |
|--------|---------------------------|---------------------------------|------------------|----------------|
| POST   | `/user`                   | Create new user account         | -                | 201, 400, 409  |
| GET    | `/user/{email}`           | Get user by email               | `email` (string) | 200, 404       |
| PATCH  | `/user/{id}`              | Update user details             | `id` (UUID)      | 200, 400, 404  |
| DELETE | `/user/{id}`              | Delete user account             | `id` (UUID)      | 200, 404       |
| PATCH  | `/user/password/{id}`     | Update user password            | `id` (UUID)      | 200, 400, 404  |

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