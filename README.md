#  TypeScript CRUD API with Node.js, Express & MySQL

## Project Description
This project is a production-quality REST API built with **TypeScript**, **Express.js**, **MySQL**, and **TypeORM**. It demonstrates full CRUD operations, proper error handling, type safety, and RESTful design principles.  

It serves as the **Midterm Project** for Activity Lab 7, showcasing mastery of REST API design, database integration, and TypeScript development.


## Setup Instructions
1. **Install prerequisites:**
   - MySQL Server 8.0
   - MySQL Workbench (or DBeaver)
   - Node.js v20 or v22 LTS
   - VS Code with TypeScript support
   - Postman or Insomnia

2. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/midterm-crud-api.git
   cd midterm-crud-api

Install dependencies:
bash
npm install

Configure environment variables:
Create a .env file:

Code
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=midterm_api
PORT=3000
Initialize TypeScript:

bash
npx tsc --init

Run the server:

bash
npm run dev
(Uses tsx watch for hot reload.)

* How to Run the Application
Start MySQL service and ensure the midterm_api database exists.

Run:

bash
npm run dev
Open Postman or browser:

Health check → http://localhost:3000/health

API endpoints → http://localhost:3000/api/users

Method	Endpoint	Description
GET	/health	Health check
GET	/api/users	Get all users
GET	/api/users/:id	Get user by ID
POST	/api/users	Create new user
PUT	/api/users/:id	Update user by ID
DELETE	/api/users/:id	Delete user by ID



Reflection Answers:

1. What was the most challenging part of building this API?  
- The hardest part was configuring TypeORM with MySQL and ensuring environment variables were correctly set up. Debugging connection errors and handling duplicate email validation required careful troubleshooting.

2. How does TypeORM make database operations easier compared to raw SQL?  
- TypeORM abstracts SQL into TypeScript classes and decorators. Instead of writing raw queries, you interact with entities and repositories, which improves type safety, reduces boilerplate, and makes relationships easier to manage.

3. Why is it important to exclude the password field from API responses? How did you implement this?  
- Excluding passwords prevents accidental exposure of sensitive data. This was implemented in the User entity using:

typescript
@Column({ select: false })
password: string;
This ensures passwords are never returned in queries.

4. Describe a scenario where you would need to use database transactions instead of individual operations.  
- For example, when creating a user and simultaneously assigning them roles or products. If one operation fails, the transaction ensures all changes are rolled back to maintain data consistency.

5. What is the difference between synchronize: true and migrations? When should you use each?
- synchronize: true automatically updates the schema during development.

Migrations are controlled scripts for schema changes in production.
Use synchronize only in development; use migrations in production to avoid accidental data loss.

6. If you had to add a Product entity with a relationship to User (a user can have many products), how would you modify the code?
- Create a Product entity with a ManyToOne relation to User.
Update User with a OneToMany relation to Product.
Example:

typescript
@OneToMany(() => Product, product => product.user)
products: Product[];
7. What security improvements would you make before deploying this API to production?
- Hash passwords with bcrypt before storing.

- Add JWT authentication for secure access.

- Implement rate limiting to prevent abuse.

- Enforce HTTPS and secure CORS policies.

- Use environment variables for secrets and database credentials.



7.1


# Midterm CRUD API

A REST API built with **TypeScript, Express, MySQL, and TypeORM**. It manages users and their tasks, with full CRUD operations, a one-to-many relationship, input validation, consistent error handling, and database migrations.

---

## Project Description

This project is a database-backed REST API for managing **users** and **tasks**. A user can have many tasks, and each task belongs to one user.

**Features**

- Full CRUD for users
- Create, list, and delete tasks nested under a user
- One-to-many / many-to-one relationship (`User` ↔ `Task`) with cascade delete
- Validation and duplicate-email checking (`409 Conflict`)
- Password excluded from every API response (`select: false` plus stripping on create/update)
- Consistent response format: `{ success, data }` or `{ success, error: { code, message } }`
- Database schema managed with TypeORM migrations
- Configuration through environment variables

**Tech stack**

| Tool | Purpose |
|------|---------|
| Node.js (v20/v22 LTS) | Runtime |
| TypeScript | Type safety |
| Express | HTTP server and routing |
| TypeORM | ORM and migrations |
| MySQL + mysql2 | Database and driver |
| dotenv | Environment variables |
| cors | Cross-origin requests |

**Project structure**

```
midterm-crud-api/
├── src/
│   ├── config/
│   │   └── data-source.ts
│   ├── entities/
│   │   ├── User.ts
│   │   └── Task.ts
│   ├── controllers/
│   │   ├── userController.ts
│   │   └── taskController.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   └── taskRoutes.ts
│   ├── migrations/
│   └── index.ts
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## Setup Instructions

### Prerequisites

- Node.js v20 or v22 (LTS)
- MySQL Server installed and running
- MySQL Workbench or DBeaver
- Postman or Insomnia for testing

### 1. Clone and install

```bash
git clone https://github.com/kimberlymaeregis/midterm-crud-api.git
cd midterm-crud-api
npm install
```

### 2. Create the database

In MySQL Workbench, run:

```sql
CREATE DATABASE midterm_api;
```

Optional: create a dedicated user instead of using `root`:

```sql
CREATE USER 'midterm_user'@'localhost' IDENTIFIED BY 'midterm_password';
GRANT ALL PRIVILEGES ON midterm_api.* TO 'midterm_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=midterm_api
PORT=3000
NODE_ENV=development
```

`.env` is listed in `.gitignore` and must never be committed.

### 4. Set up the tables with migrations

Make sure `synchronize` is **`false`** in `src/config/data-source.ts` when using migrations. If it is `true`, TypeORM creates the tables itself and the migration fails with `Table 'users' already exists`.

```ts
synchronize: false,
```

Then generate and run the initial migration:

```bash
npm run migration:generate -- src/migrations/InitialSchema
npm run migration:run
```

> **Resetting during development:** if you get a "table already exists" error, drop and recreate the database, then run the migration again:
> ```sql
> DROP DATABASE midterm_api;
> CREATE DATABASE midterm_api;
> ```

---

## How to Run the Application

**Development (auto-restart on changes)**

```bash
npm run dev
```

**Production**

```bash
npm run build
npm start
```

You should see:

```
✅ Database connected successfully!
🚀 Server running on http://localhost:3000
```

**Available scripts**

| Script | Description |
|--------|-------------|
| `npm run dev` | Start with `ts-node-dev` and auto-reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled app |
| `npm run migration:generate -- src/migrations/Name` | Generate a migration from entity changes |
| `npm run migration:run` | Apply pending migrations |
| `npm run migration:revert` | Undo the last migration |

---

## API Endpoints Documentation

**Base URL:** `http://localhost:3000`
but i used 3001 cause it get conflict.

### Endpoint summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get a user (with their tasks) |
| POST | `/api/users` | Create a user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user (and their tasks) |
| GET | `/api/users/:userId/tasks` | Get all tasks for a user |
| POST | `/api/users/:userId/tasks` | Create a task for a user |
| DELETE | `/api/tasks/:id` | Delete a task |

### Data models

**User**

| Field | Type | Notes |
|-------|------|-------|
| `id` | number | Auto-generated primary key |
| `name` | string | Required, max 100 characters |
| `email` | string | Required, unique, max 100 characters |
| `password` | string | Required on create, never returned in responses |
| `phoneNumber` | string \| null | Optional, max 20 characters |
| `isActive` | boolean | Defaults to `true` |
| `createdAt` / `updatedAt` | date | Auto-managed |

**Task**

| Field | Type | Notes |
|-------|------|-------|
| `id` | number | Auto-generated primary key |
| `title` | string | Required, max 200 characters |
| `description` | string \| null | Optional |
| `status` | `pending` \| `in-progress` \| `completed` | Defaults to `pending` |
| `priority` | `low` \| `medium` \| `high` | Defaults to `medium` |
| `dueDate` | date \| null | Optional |
| `userId` | number | Foreign key to `users.id` |
| `createdAt` / `updatedAt` | date | Auto-managed |

### Health check

`GET /health` → `200 OK`

```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-10-17T08:00:00.000Z"
}
```

### Get all users

`GET /api/users` → `200 OK`

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "Kimberly Regis",
      "email": "regiskimberlymae@gmail.com",
      "phoneNumber": "09171234567",
      "isActive": true,
      "createdAt": "2026-10-17T08:00:00.000Z",
      "updatedAt": "2026-10-17T08:00:00.000Z"
    }
  ]
}
```

### Get a user by ID

`GET /api/users/:id` → `200 OK` (includes the user's `tasks` array)

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Kimberly Regis",
    "email": "regiskimberlymae@gmail.com",
    "phoneNumber": "09171234567",
    "isActive": true,
    "tasks": []
  }
}
```

### Create a user

`POST /api/users` → `201 Created`

Request body:

```json
{
  "name": "Kimberly Regis",
  "email": "regiskimberlymae@gmail.com",
  "password": "1234",
  "phoneNumber": "09171234567"
}
```

Response:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "Kimberly Regis",
    "email": "regiskimberlymae@gmail.com",
    "phoneNumber": "09171234567",
    "isActive": true,
    "createdAt": "2026-10-17T08:00:00.000Z",
    "updatedAt": "2026-10-17T08:00:00.000Z"
  }
}
```

`name`, `email`, and `password` are required. `phoneNumber` is optional.

### Update a user

`PUT /api/users/:id` → `200 OK`

Request body (send only the fields to change):

```json
{
  "name": "Kimberly Mae Regis",
  "phoneNumber": "09181234567",
  "isActive": false
}
```

Response:

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "Kimberly Mae Regis",
    "email": "regiskimberlymae@gmail.com",
    "phoneNumber": "09181234567",
    "isActive": false
  }
}
```

### Delete a user

`DELETE /api/users/:id` → `200 OK`

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

All of the user's tasks are deleted too (`ON DELETE CASCADE`).

### Get tasks for a user

`GET /api/users/:userId/tasks` → `200 OK`

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "title": "Complete Midterm Project",
      "description": "Build a REST API with TypeORM",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2026-10-15",
      "userId": 1
    }
  ]
}
```

### Create a task for a user

`POST /api/users/:userId/tasks` → `201 Created`

Request body:

```json
{
  "title": "Complete Midterm Project",
  "description": "Build a REST API with TypeORM",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2026-10-15"
}
```

Response:

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "title": "Complete Midterm Project",
    "description": "Build a REST API with TypeORM",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2026-10-15",
    "userId": 1
  }
}
```

### Delete a task

`DELETE /api/tasks/:id` → `200 OK`

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Error format

Every error uses the same shape:

```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User with ID 999 does not exist"
  }
}
```

| Status | Code | When |
|--------|------|------|
| 400 | `INVALID_ID` | ID in the URL is not a number |
| 400 | `MISSING_FIELDS` | Required user fields are missing |
| 400 | `INVALID_STATUS` / `INVALID_PRIORITY` | Task enum value is not allowed |
| 404 | `USER_NOT_FOUND` | No user with that ID |
| 404 | `TASK_NOT_FOUND` | No task with that ID |
| 404 | `ROUTE_NOT_FOUND` | Unknown route |
| 409 | `EMAIL_EXISTS` | Email already belongs to another user |
| 500 | `INTERNAL_ERROR` | Unexpected server error |

---

## Reflection Answers

**1. What was the most challenging part of building this API?**
The migrations. I got a `Table 'users' already exists` error because `synchronize` had already created the tables, so the initial migration collided with them. I also found that a new column (`phoneNumber`) was not saving because the controller only read `name`, `email`, and `password` from the request body. Adding a column to the entity is not enough; the controller has to use it too.

**2. How does TypeORM make database operations easier compared to raw SQL?**
I work with TypeScript classes and methods such as `find`, `findOne`, `save`, and `remove` instead of writing SQL strings. TypeORM builds the queries, maps rows to typed objects, handles relationships, and gives me autocomplete and compile-time checking. It also generates migrations from my entities.

**3. Why is it important to exclude the password field from API responses? How did you implement this?**
Passwords should never leave the server, because a leaked response could expose credentials. I used `select: false` on the `password` column so it is not loaded by default, explicitly listed the safe fields in `select` for reads, and removed `password` from the saved user object before responding on create and update.

**4. Describe a scenario where you would need to use database transactions instead of individual operations.**
Creating a user and their first task together. If the user is saved but the task insert fails, I would be left with half-finished data. A transaction makes both succeed or both roll back. Money transfers between accounts are another example.

**5. What is the difference between `synchronize: true` and migrations? When should you use each?**
`synchronize: true` automatically changes the database to match the entities every time the app starts. It is fast for early development but can drop data, has no history, and cannot be rolled back. Migrations are versioned scripts that are run deliberately, tracked in a `migrations` table, and can be reverted. Use `synchronize` only for throwaway local development and migrations for anything shared or in production. Do not use both on the same database.

**6. If you had to add a `Comment` entity (tasks can have many comments), how would you modify the code?**
Create `Comment.ts` with `id`, `content`, `taskId`, and timestamps, and a `@ManyToOne(() => Task, task => task.comments, { onDelete: 'CASCADE' })`. Add `@OneToMany(() => Comment, comment => comment.task) comments!: Comment[]` to `Task`. Register `Comment` in the DataSource `entities`, create a `commentController` and `commentRoutes` (for example `GET/POST /api/tasks/:taskId/comments`), then generate and run a migration.

**7. What security improvements would you make before deploying this API to production?**
Hash passwords with bcrypt, add authentication (JWT) and authorization, validate and sanitize input with a library such as Zod or class-validator, add rate limiting and Helmet, restrict CORS to known origins, use HTTPS, use a database user with limited permissions, keep `synchronize` off, and add proper logging and monitoring.

**8. Why did you need to add the `!` (definite assignment operator) to your entity properties?**
TypeScript's strict mode requires class properties to be initialized. TypeORM assigns the values when it loads or creates the entity, not in a constructor. The `!` tells the compiler that I know the property will be assigned, which removes the "Property has no initializer" error.

**9. What are the benefits of explicitly defining column types (e.g., `type: 'varchar'`)?**
It avoids relying on reflected metadata, which can fail with some runners and causes `ColumnTypeUndefinedError`. It also makes the exact database type and length clear, keeps behavior consistent between development and production, and produces predictable migrations.

**10. How do relationships in TypeORM differ from foreign keys in raw SQL? What are the advantages?**
A foreign key is only a constraint in the database. TypeORM relationships (`@OneToMany`, `@ManyToOne`) also describe the link in code, so I can load related data with `relations: ['tasks']`, navigate between objects, and let TypeORM generate the foreign key and cascade rules in migrations. That means less manual JOIN writing and one place where the relationship is defined.

---

## Testing

All endpoints were tested with EchoAPI, including success cases, validation errors (`400`), not-found cases (`404`), duplicate email (`409`), and the nested task endpoints.`