GraphQL Student API

This README contains the GraphQL operations currently available for the Student API.

GraphQL Endpoint

When running the NestJS application locally:

http://localhost:3000/graphql


Open this URL in GraphiQL to execute the queries and mutations below.

1. Query All Students
GraphQL
query {
  students {
    id
    name
    email
  }
}

Example Response
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

What happens internally?
GraphQL Query
     ↓
students()
     ↓
StudentResolver
     ↓
StudentService.findAll()
     ↓
Prisma
     ↓
Neon PostgreSQL

2. Query Student By ID

Use the student query and provide the student's ID.

GraphQL
query {
  student(id: 1) {
    id
    name
    email
  }
}

Example Response
{
  "data": {
    "student": {
      "id": 1,
      "name": "John",
      "email": "john@example.com"
    }
  }
}

Query a different student

Change the ID:

query {
  student(id: 2) {
    id
    name
    email
  }
}


If the student doesn't exist, the result will be:

{
  "data": {
    "student": null
  }
}

3. Create a Student

Use the createStudent mutation.

GraphQL
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

Example Response
{
  "data": {
    "createStudent": {
      "id": 1,
      "name": "John",
      "email": "john@example.com"
    }
  }
}


The newly created student will also be stored in the Neon PostgreSQL database.

4. Creating Another Student
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


You can then run:

query {
  students {
    id
    name
    email
  }
}


and both students should be returned.

Available Operations
Operation	Type	Purpose
students	Query	Get all students
student(id: Int!)	Query	Get one student
createStudent	Mutation	Create a student
Important GraphQL Concept

GraphQL lets the client decide which fields it wants.

For example:

query {
  students {
    name
  }
}


Only name is requested.

Or:

query {
  students {
    id
    email
  }
}


Only id and email are requested.

You don't have to return every field from the Student type.

Later, when we add the Profile relationship, you'll be able to do:

query {
  students {
    id
    name
    profile {
      bio
    }
  }
}


This will allow us to practice the 1:1 relationship between Student and Profile.

Current Student GraphQL Type

The API currently exposes:

type Student {
  id: Int!
  name: String!
  email: String!
}


The ! means the field is non-null.

For example:

id: Int!


means GraphQL guarantees that id will not be null.

Current API Flow
                    GraphQL
                       │
             ┌─────────┴─────────┐
             │                   │
           Query              Mutation
             │                   │
             ▼                   ▼
      StudentResolver     StudentResolver
             │                   │
             ▼                   ▼
      StudentService      StudentService
             │                   │
             └─────────┬─────────┘
                       ▼
                  PrismaClient
                       │
                       ▼
               Neon PostgreSQL


The next feature we will add is the Profile relationship, allowing queries such as:

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


This will be our first practical GraphQL nested query + Prisma 1:1 relationship.# GraphQl
