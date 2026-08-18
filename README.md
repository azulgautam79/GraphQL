# GraphQL Student API

A learning-focused **GraphQL API built with NestJS, Prisma, and PostgreSQL**.

This project was created to understand the fundamentals of GraphQL and how it differs from traditional REST APIs. It demonstrates how GraphQL queries and mutations flow through a NestJS resolver and service layer before reaching a PostgreSQL database through Prisma.

## 🚀 Live Demo

**GraphQL API:**
https://graph-ql-sepia-two.vercel.app

**GraphQL Endpoint:**
`/graphql`

For local development:

```text
http://localhost:3000/graphql
```

You can open the endpoint in **GraphiQL** and execute the queries and mutations described below.

---

## 📌 Project Overview

The project implements a simple **Student API** using GraphQL.

Instead of exposing multiple REST endpoints such as:

```text
GET    /students
GET    /students/:id
POST   /students
```

GraphQL exposes a single endpoint:

```text
/graphql
```

The client specifies exactly which fields it needs.

For example:

```graphql
query {
  students {
    edges {
      node {
        id
        name
        email
      }
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}

```

The API returns only the requested fields.

This project was primarily built to learn:

* GraphQL fundamentals
* Queries
* Mutations
* GraphQL schema and types
* Resolvers
* GraphQL arguments
* Input types
* Field selection
* NestJS GraphQL integration
* Prisma ORM
* PostgreSQL
* GraphQL + database architecture

---

## 🛠️ Tech Stack

| Technology                  | Purpose                    |
| --------------------------- | -------------------------- |
| **NestJS**                  | Backend framework          |
| **GraphQL**                 | API query language         |
| **Apollo / NestJS GraphQL** | GraphQL server integration |
| **Prisma**                  | ORM and database access    |
| **PostgreSQL**              | Relational database        |
| **Neon PostgreSQL**         | Cloud PostgreSQL database  |
| **TypeScript**              | Programming language       |
| **Vercel**                  | Deployment                 |

---

## 🏗️ Architecture

The application follows this basic request flow:

```text
                GraphQL Client
                      │
                      ▼
              /graphql endpoint
                      │
             ┌────────▼────────┐
             │ StudentResolver │
             └────────┬────────┘
                      │
                      ▼
             ┌────────────────┐
             │ StudentService │
             └────────┬───────┘
                      │
                      ▼
               Prisma Client
                      │
                      ▼
              PostgreSQL / Neon
```

### Query flow

```text
GraphQL Query
      ↓
StudentResolver
      ↓
StudentService.findAll()
      ↓
Prisma
      ↓
PostgreSQL
      ↓
GraphQL Response
```

### Mutation flow

```text
GraphQL Mutation
      ↓
StudentResolver
      ↓
StudentService
      ↓
Prisma
      ↓
PostgreSQL
      ↓
Created Student
```

---

# 📂 Project Structure

The project follows a typical NestJS structure:

```text
GraphQl/
│
├── prisma/
│   └── ...
│
├── src/
│   ├── ...
│   └── ...
│
├── test/
│
├── prisma.config.ts
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

The main GraphQL functionality is organized around the **Student Resolver** and **Student Service**.

---

# ⚙️ Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/azulgautam79/GraphQl.git
```

Navigate into the project:

```bash
cd GraphQl
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="your-postgresql-connection-string"
```

If you are using Neon, use the connection string provided by your Neon project.

---

## 4. Generate Prisma Client

```bash
npx prisma generate
```

---

## 5. Run database migrations

```bash
npx prisma migrate dev
```

---

## 6. Start the development server

```bash
npm run start:dev
```

The GraphQL server will be available at:

```text
http://localhost:3000/graphql
```

Open this URL in your browser to use GraphiQL.

---

# 🔌 GraphQL API

Unlike REST, this project uses a **single GraphQL endpoint**:

```text
POST /graphql
```

The operation you want to perform is determined by the GraphQL document sent to that endpoint.

The current API provides:

| Operation       | Type     | Purpose              |
| --------------- | -------- | -------------------- |
| `students`      | Query    | Get all students     |
| `student(id)`   | Query    | Get a student by ID  |
| `createStudent` | Mutation | Create a new student |

---

# 🔍 Queries

## 1. Get All Students

The `students` query returns all students.

### Query

```graphql
query {
  students {
    id
    name
    email
  }
}
```

### Example Response

```json
{
  "data": {
    "students": [
      {
        "id": 1,
        "name": "John",
        "email": "john@example.com"
      },
      {
        "id": 2,
        "name": "Alice",
        "email": "alice@example.com"
      }
    ]
  }
}
```

### How it works

```text
students
   ↓
StudentResolver
   ↓
StudentService.findAll()
   ↓
Prisma
   ↓
PostgreSQL
```

---

## 2. Get a Student by ID

The `student` query accepts an `id` argument.

### Query

```graphql
query {
  student(id: 1) {
    id
    name
    email
  }
}
```

### Example Response

```json
{
  "data": {
    "student": {
      "id": 1,
      "name": "John",
      "email": "john@example.com"
    }
  }
}
```

### Query another student

Simply change the ID:

```graphql
query {
  student(id: 2) {
    id
    name
    email
  }
}
```

### Student not found

If the requested student does not exist, the API returns:

```json
{
  "data": {
    "student": null
  }
}
```

---

# ✏️ Mutations

Mutations are used when the client wants to modify data.

The current API provides one mutation:

```text
createStudent
```

---

## 3. Create a Student

Use the `createStudent` mutation to insert a new student into the database.

### Mutation

```graphql
mutation {
  createStudent(
    input: {
      name: "John"
      email: "john@example.com"
    }
  ) {
    id
    name
    email
  }
}
```

### Example Response

```json
{
  "data": {
    "createStudent": {
      "id": 1,
      "name": "John",
      "email": "john@example.com"
    }
  }
}
```

The new student is persisted in the PostgreSQL database through Prisma.

---

## 4. Create Another Student

You can create another student by changing the input:

```graphql
mutation {
  createStudent(
    input: {
      name: "Alice"
      email: "alice@example.com"
    }
  ) {
    id
    name
    email
  }
}
```

After creating the student, you can verify it using:

```graphql
query {
  students {
    id
    name
    email
  }
}
```

---

# 🎯 GraphQL Field Selection

One of the important concepts demonstrated by this project is **field selection**.

The client doesn't have to request every field.

For example:

```graphql
query {
  students {
    name
  }
}
```

The response contains only:

```json
{
  "data": {
    "students": [
      {
        "name": "John"
      },
      {
        "name": "Alice"
      }
    ]
  }
}
```

You can request different fields:

```graphql
query {
  students {
    id
    email
  }
}
```

Or all available fields:

```graphql
query {
  students {
    id
    name
    email
  }
}
```

This is one of the fundamental differences between GraphQL and many traditional REST APIs: **the client specifies the shape of the response it needs.**

---

# 🧩 GraphQL Schema

The current `Student` GraphQL type is:

```graphql
type Student {
  id: Int!
  name: String!
  email: String!
}
```

The `!` means that the field is **non-nullable**.

For example:

```graphql
id: Int!
```

means that a `Student` must always have an `id`.

Similarly:

```graphql
name: String!
email: String!
```

means that both `name` and `email` are required fields.

---

# 📋 Available Operations

## Queries

### `students`

Returns all students.

```graphql
query {
  students {
    id
    name
    email
  }
}
```

### `student`

Returns one student by ID.

```graphql
query {
  student(id: 1) {
    id
    name
    email
  }
}
```

---

## Mutations

### `createStudent`

Creates a new student.

```graphql
mutation {
  createStudent(
    input: {
      name: "John"
      email: "john@example.com"
    }
  ) {
    id
    name
    email
  }
}
```

---

# 🧪 Testing with GraphiQL

Start the application:

```bash
npm run start:dev
```

Then open:

```text
http://localhost:3000/graphql
```

GraphiQL provides an interactive environment where you can:

* Explore the GraphQL schema
* View available queries
* View available mutations
* Execute operations
* Inspect responses
* Test different field selections
* Experiment with GraphQL arguments

For example:

```graphql
query GetStudents {
  students {
    id
    name
    email
  }
}
```

You can also give operations names, which is useful when an application contains multiple operations.

---

# 🔄 GraphQL vs REST

A simple comparison:

### REST

You might have:

```text
GET /students
GET /students/1
POST /students
```

### GraphQL

You have one endpoint:

```text
POST /graphql
```

And the operation determines what happens:

```graphql
query {
  students {
    id
    name
  }
}
```

or:

```graphql
query {
  student(id: 1) {
    name
    email
  }
}
```

or:

```graphql
mutation {
  createStudent(
    input: {
      name: "John"
      email: "john@example.com"
    }
  ) {
    id
    name
  }
}
```

---

# 🧠 What I Learned

This project was created as a practical way to learn GraphQL and understand how it fits into a modern backend application.

### GraphQL concepts

* GraphQL schema
* Types
* Queries
* Mutations
* Resolvers
* Arguments
* Input types
* Field selection
* Non-nullable fields
* GraphQL endpoint
* GraphiQL

### Backend concepts

* NestJS modules
* Resolver → Service architecture
* Dependency injection
* Prisma ORM
* PostgreSQL
* Database migrations
* Environment configuration

### Architecture concepts

* API layer
* Resolver layer
* Service layer
* ORM layer
* Database layer
* Client-controlled response shape

---

# 🔮 Future Improvements

The project can be extended with additional GraphQL concepts.

Possible next features include:

* [ ] Student profiles
* [ ] Student → Profile relationship
* [ ] Nested GraphQL queries
* [ ] Update student mutation
* [ ] Delete student mutation
* [ ] Input validation
* [ ] Pagination
* [ ] Filtering
* [ ] Sorting
* [ ] Authentication
* [ ] Authorization
* [ ] GraphQL subscriptions
* [ ] DataLoader
* [ ] Error handling
* [ ] Unit tests
* [ ] E2E tests

For example, after introducing a `Profile` relationship, the API could support:

```graphql
query {
  students {
    id
    name
    profile {
      id
      bio
    }
  }
}
```

This would allow the project to demonstrate nested GraphQL queries and Prisma relationships.

---

# 📚 Useful GraphQL Concepts

GraphQL operations are generally divided into:

```text
Query
  ↓
Read data

Mutation
  ↓
Create / Update / Delete data

Subscription
  ↓
Real-time data
```

This project currently focuses on:

```text
Query
Mutation
```

The GraphQL specification describes queries as a way for clients to declaratively describe the data they want, while mutations are used for operations that modify data.

---

# 👨‍💻 Author

**Lemon Gautam**

Full Stack Developer & Data Analyst

* Portfolio: https://lemongautam.com.np/
* GitHub: https://github.com/azulgautam79

---

# 📄 License

This project is intended primarily as a learning project and is available for educational purposes.
