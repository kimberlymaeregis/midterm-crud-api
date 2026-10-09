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

