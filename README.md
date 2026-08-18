Yes. I checked the repository again. One important note: the GitHub main branch I can currently see still shows [Teacher] for teacher(id), so your resolver fix hasn't reached the GitHub version I can inspect yet. Your README below assumes your local fix is the new version where teacher(id) and course(id) return a single object. 
G
GitHub
+1

I also verified that students is now a connection with edges, pageInfo, and totalCount, while the other resources expose the relationships we've been discussing. 
G
GitHub
+3

Here is a clean complete README.md you can copy directly into your repository:

GraphQL Student API

A full-stack GraphQL backend built with NestJS, Apollo GraphQL, Prisma, and PostgreSQL.

This project demonstrates how to build a GraphQL API with:

Queries
Mutations
GraphQL object types
Input types
Nested queries
Prisma ORM
PostgreSQL relationships
Filtering
Sorting
Cursor-based pagination
One-to-one relationships
One-to-many relationships
Apollo GraphQL
Vercel deployment
🚀 Live API
GraphQL API

https://graph-ql-sepia-two.vercel.app/graphql

Open the endpoint in your browser to access the GraphiQL interface and explore the generated GraphQL schema.

Repository

https://github.com/azulgautam79/GraphQl

🛠️ Tech Stack
Technology	Purpose
NestJS	Backend framework
GraphQL	API query language
Apollo Server	GraphQL server
Prisma	ORM
PostgreSQL	Database
TypeScript	Programming language
Vercel	Deployment
📁 Project Structure
GraphQl/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── course/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── course.module.ts
│   │   ├── course.resolver.ts
│   │   └── course.service.ts
│   │
│   ├── enrollment/
│   │   ├── entities/
│   │   ├── enrollment.module.ts
│   │   ├── enrollment.resolver.ts
│   │   └── enrollment.service.ts
│   │
│   ├── profile/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── profile.module.ts
│   │   ├── profile.resolver.ts
│   │   └── profile.service.ts
│   │
│   ├── student/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── enums/
│   │   ├── student.module.ts
│   │   ├── student.resolver.ts
│   │   └── student.service.ts
│   │
│   ├── teacher/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── teacher.module.ts
│   │   ├── teacher.resolver.ts
│   │   └── teacher.service.ts
│   │
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── README.md

🗃️ Data Model

The application contains five main entities:

Student
   │
   ├── Profile
   │
   ├── Teacher
   │
   └── Enrollment
          │
          └── Course

Student

A student contains:

id
name
email
teacherId
profile
teacher
enrollments

Profile

A profile belongs to one student:

id
bio
studentId
student

Teacher

A teacher can have multiple students:

id
name
email
students

Course

A course can have multiple enrollments:

id
title
description
enrollments

Enrollment

An enrollment connects a student to a course:

studentId
courseId
semester
grade
enrolledAt
student
course


The Prisma schema uses a composite primary key on studentId and courseId for enrollments. 
G
GitHub

🔗 Relationships

The API supports the following relationships:

Student
 ├── Profile
 ├── Teacher
 └── Enrollments
       └── Course

Teacher
 └── Students

Profile
 └── Student

Course
 └── Enrollments
       └── Student

Enrollment
 ├── Student
 └── Course


This allows GraphQL queries to traverse related data in a single request.

For example:

query {
  student(id: 1) {
    id
    name

    teacher {
      id
      name
    }

    profile {
      id
      bio
    }

    enrollments {
      semester

      course {
        id
        title
      }
    }
  }
}

📡 GraphQL Endpoint
Local
http://localhost:3000/graphql

Production
https://graph-ql-sepia-two.vercel.app/graphql

📚 GraphQL Operations
Queries
Query	Description
students	Get students with filtering, sorting, and pagination
student	Get one student by ID
teachers	Get all teachers
teacher	Get one teacher by ID
courses	Get all courses
course	Get one course by ID
profiles	Get all profiles
profile	Get one profile by ID
enrollments	Get all enrollments
Mutations
Mutation	Description
createStudent	Create a student
assignTeacher	Assign a teacher to a student
createTeacher	Create a teacher
createCourse	Create a course
createProfile	Create a profile
enrollStudent	Enroll a student in a course
👨‍🎓 Student Queries
Get Students

The students query returns a connection rather than a simple array.

query {
  students {
    edges {
      cursor

      node {
        id
        name
        email
        teacherId
      }
    }

    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }

    totalCount
  }
}


The current resolver exposes students as a StudentConnection, which contains edges, pageInfo, and totalCount. 
G
GitHub

Get Students With Pagination
query {
  students(
    query: {
      cursor: {
        first: 5
      }
    }
  ) {
    edges {
      cursor

      node {
        id
        name
        email
      }
    }

    pageInfo {
      hasNextPage
      endCursor
    }

    totalCount
  }
}

Get the Next Page

Take the endCursor from the previous response and use it as after.

For example:

query {
  students(
    query: {
      cursor: {
        first: 5
        after: 5
      }
    }
  ) {
    edges {
      cursor

      node {
        id
        name
        email
      }
    }

    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }

    totalCount
  }
}


Replace 5 with the actual cursor returned by your previous query.

🔎 Filter Students
Filter by Name
query {
  students(
    query: {
      filter: {
        name: "John"
      }
    }
  ) {
    edges {
      node {
        id
        name
        email
      }
    }

    totalCount
  }
}


The name filter performs a case-insensitive search.

Filter by Teacher
query {
  students(
    query: {
      filter: {
        teacherId: 1
      }
    }
  ) {
    edges {
      node {
        id
        name
        email
        teacherId
      }
    }

    totalCount
  }
}


Replace 1 with the teacher ID you want to filter by.

Filter by Course
query {
  students(
    query: {
      filter: {
        courseId: 1
      }
    }
  ) {
    edges {
      node {
        id
        name
        email
      }
    }

    totalCount
  }
}

🔃 Sort Students

Students can be sorted using the available sort fields and directions.

Available fields:

ID
NAME
EMAIL


Available directions:

ASC
DESC

Sort by Name Ascending
query {
  students(
    query: {
      sort: {
        field: NAME
        order: ASC
      }
    }
  ) {
    edges {
      node {
        id
        name
        email
      }
    }
  }
}

Sort by Name Descending
query {
  students(
    query: {
      sort: {
        field: NAME
        order: DESC
      }
    }
  ) {
    edges {
      node {
        id
        name
        email
      }
    }
  }
}

🔥 Filter + Sort + Pagination

The options can be combined.

query {
  students(
    query: {
      filter: {
        name: "John"
      }

      sort: {
        field: NAME
        order: ASC
      }

      cursor: {
        first: 5
      }
    }
  ) {
    edges {
      cursor

      node {
        id
        name
        email
      }
    }

    pageInfo {
      hasNextPage
      endCursor
    }

    totalCount
  }
}

👤 Get Student by ID
query {
  student(id: 1) {
    id
    name
    email
    teacherId
  }
}


If the student doesn't exist, the result will be:

{
  "data": {
    "student": null
  }
}

🔗 Get Student With Relationships
query {
  student(id: 1) {
    id
    name
    email

    profile {
      id
      bio
      studentId
    }

    teacher {
      id
      name
      email
    }

    enrollments {
      studentId
      courseId
      semester
      grade
      enrolledAt
    }
  }
}

➕ Create Student
mutation {
  createStudent(
    input: {
      name: "John Doe"
      email: "john@example.com"
    }
  ) {
    id
    name
    email
  }
}

Create Student With Teacher
mutation {
  createStudent(
    input: {
      name: "Jane Doe"
      email: "jane@example.com"
      teacherId: 1
    }
  ) {
    id
    name
    email
    teacherId

    teacher {
      id
      name
      email
    }
  }
}

Create Student With Profile
mutation {
  createStudent(
    input: {
      name: "Alice Smith"
      email: "alice@example.com"

      profile: {
        bio: "Computer science student"
      }
    }
  ) {
    id
    name
    email

    profile {
      id
      bio
    }
  }
}

Create Student With Enrollment
mutation {
  createStudent(
    input: {
      name: "Bob Smith"
      email: "bob@example.com"

      enrollments: [
        {
          courseId: 1
          semester: "Fall 2026"
        }
      ]
    }
  ) {
    id
    name
    email

    enrollments {
      studentId
      courseId
      semester
    }
  }
}

👨‍🏫 Teacher Queries
Get All Teachers
query {
  teachers {
    id
    name
    email
  }
}

Get Teacher by ID
query {
  teacher(id: 1) {
    id
    name
    email
  }
}


teacher(id) returns a single Teacher, not an array.

Get Teacher With Students
query {
  teacher(id: 1) {
    id
    name
    email

    students {
      id
      name
      email
      teacherId
    }
  }
}


The teacher resolver resolves the related students using the teacher ID. 
G
GitHub

➕ Create Teacher
mutation {
  createTeacher(
    input: {
      name: "Dr. Sarah Wilson"
      email: "sarah@example.com"
    }
  ) {
    id
    name
    email
  }
}

📚 Course Queries
Get All Courses
query {
  courses {
    id
    title
    description
  }
}

Get Course by ID
query {
  course(id: 1) {
    id
    title
    description
  }
}


course(id) returns a single Course, not an array.

Get Course With Enrollments
query {
  course(id: 1) {
    id
    title
    description

    enrollments {
      studentId
      courseId
      semester
      grade
      enrolledAt
    }
  }
}

Get Course With Students

Because the relationship goes through Enrollment, query the students through enrollments:

query {
  course(id: 1) {
    id
    title

    enrollments {
      semester
      grade

      student {
        id
        name
        email
      }
    }
  }
}

➕ Create Course
mutation {
  createCourse(
    input: {
      title: "GraphQL Fundamentals"
      description: "Learn GraphQL with NestJS and Prisma."
    }
  ) {
    id
    title
    description
  }
}

👤 Profile Queries
Get All Profiles
query {
  profiles {
    id
    bio
    studentId
  }
}

Get Profile by ID
query {
  profile(id: 1) {
    id
    bio
    studentId
  }
}

Get Profile With Student
query {
  profile(id: 1) {
    id
    bio
    studentId

    student {
      id
      name
      email
    }
  }
}


The profile resolver exposes the related student through a GraphQL field resolver. 
G
GitHub

➕ Create Profile
mutation {
  createProfile(
    input: {
      bio: "Passionate about software engineering."
      studentId: 1
    }
  ) {
    id
    bio
    studentId

    student {
      id
      name
      email
    }
  }
}

📝 Enrollment Queries
Get All Enrollments
query {
  enrollments {
    studentId
    courseId
    semester
    grade
    enrolledAt
  }
}

Get Enrollments With Student and Course
query {
  enrollments {
    studentId
    courseId
    semester
    grade
    enrolledAt

    student {
      id
      name
      email
    }

    course {
      id
      title
      description
    }
  }
}


The enrollment resolver exposes both student and course relationship fields. 
G
GitHub

➕ Enroll a Student
mutation {
  enrollStudent(
    input: {
      studentId: 1
      courseId: 1
      semester: "Fall 2026"
    }
  ) {
    studentId
    courseId
    semester
    grade
    enrolledAt

    student {
      id
      name
      email
    }

    course {
      id
      title
      description
    }
  }
}

👨‍🏫 Assign Teacher to Student
mutation {
  assignTeacher(
    input: {
      studentId: 1
      teacherId: 1
    }
  ) {
    id
    name
    email
    teacherId

    teacher {
      id
      name
      email
    }
  }
}

🔗 Nested GraphQL Queries

One of the main advantages of GraphQL is that related data can be retrieved in one request.

Student → Profile
query {
  student(id: 1) {
    id
    name

    profile {
      id
      bio
    }
  }
}

Student → Teacher
query {
  student(id: 1) {
    id
    name

    teacher {
      id
      name
      email
    }
  }
}

Student → Enrollments → Course
query {
  student(id: 1) {
    id
    name

    enrollments {
      semester
      grade

      course {
        id
        title
        description
      }
    }
  }
}

Teacher → Students
query {
  teacher(id: 1) {
    id
    name

    students {
      id
      name
      email
    }
  }
}

Course → Enrollments → Students
query {
  course(id: 1) {
    id
    title

    enrollments {
      semester
      grade

      student {
        id
        name
        email
      }
    }
  }
}

Profile → Student → Teacher
query {
  profile(id: 1) {
    id
    bio

    student {
      id
      name
      email

      teacher {
        id
        name
        email
      }
    }
  }
}

Enrollment → Student + Course
query {
  enrollments {
    semester
    grade

    student {
      id
      name
      email
    }

    course {
      id
      title
      description
    }
  }
}

🔥 Complete Example Workflow

A simple way to test the API from scratch is to create the related records in this order.

1. Create a Teacher
mutation {
  createTeacher(
    input: {
      name: "John Teacher"
      email: "teacher@example.com"
    }
  ) {
    id
    name
    email
  }
}


Assume the returned ID is:

1

2. Create a Course
mutation {
  createCourse(
    input: {
      title: "GraphQL Fundamentals"
      description: "Learning GraphQL with NestJS"
    }
  ) {
    id
    title
    description
  }
}


Assume the returned ID is:

1

3. Create a Student
mutation {
  createStudent(
    input: {
      name: "John Student"
      email: "student@example.com"
      teacherId: 1

      profile: {
        bio: "Learning backend development."
      }
    }
  ) {
    id
    name
    email
    teacherId

    profile {
      id
      bio
    }

    teacher {
      id
      name
      email
    }
  }
}


Assume the student ID is:

1

4. Enroll the Student
mutation {
  enrollStudent(
    input: {
      studentId: 1
      courseId: 1
      semester: "Fall 2026"
    }
  ) {
    studentId
    courseId
    semester

    student {
      id
      name
    }

    course {
      id
      title
    }
  }
}

5. Query Everything

Now you can retrieve the student's complete related data:

query {
  student(id: 1) {
    id
    name
    email

    profile {
      id
      bio
    }

    teacher {
      id
      name
      email
    }

    enrollments {
      semester
      grade
      enrolledAt

      course {
        id
        title
        description
      }
    }
  }
}

🧠 Understanding GraphQL

GraphQL allows the client to decide exactly which fields it wants.

Instead of requesting an entire student object:

query {
  student(id: 1) {
    id
    name
    email
  }
}


You can request only the name:

query {
  student(id: 1) {
    name
  }
}


Or request nested relationships:

query {
  student(id: 1) {
    name

    teacher {
      name
    }

    profile {
      bio
    }
  }
}


This means the frontend can request exactly the data it needs.

⚠️ Common GraphQL Mistakes
Students Is a Connection

Do not use:

query {
  students {
    id
    name
  }
}


The current API uses a connection:

query {
  students {
    edges {
      node {
        id
        name
        email
      }
    }

    pageInfo {
      hasNextPage
      endCursor
    }

    totalCount
  }
}

Object Fields Need Selection Sets

This is invalid:

query {
  student(id: 1) {
    teacher
  }
}


Because teacher is an object.

Use:

query {
  student(id: 1) {
    teacher {
      id
      name
      email
    }
  }
}


The same rule applies to:

profile
teacher
students
enrollments
student
course

Use Existing IDs

Many mutations and relationship queries require existing database IDs.

For example:

mutation {
  enrollStudent(
    input: {
      studentId: 1
      courseId: 1
      semester: "Fall 2026"
    }
  ) {
    studentId
    courseId
  }
}


If student 1 or course 1 does not exist in your database, the mutation will fail.

🏗️ Application Architecture

The request flow is:

GraphQL Client
      │
      ▼
Apollo Server
      │
      ▼
NestJS Resolver
      │
      ▼
NestJS Service
      │
      ▼
Prisma Client
      │
      ▼
PostgreSQL


For example:

students
   │
   ▼
StudentResolver
   │
   ▼
StudentService
   │
   ▼
PrismaService
   │
   ▼
PostgreSQL


Nested relationships are resolved through GraphQL field resolvers.

🗄️ Prisma

The project uses Prisma as the ORM.

The current database models are:

Student
Profile
Teacher
Course
Enrollment


The relationships are represented in the Prisma schema and exposed through GraphQL field resolvers. 
G
GitHub

⚙️ Environment Variables

Create a .env file locally:

DATABASE_URL="your-postgresql-connection-string"


Do not commit your .env file to Git.

For Vercel, configure the database connection string through the project's environment variables.

💻 Running Locally

Clone the repository:

git clone https://github.com/azulgautam79/GraphQl.git
cd GraphQl


Install dependencies:

npm install


Generate Prisma Client:

npx prisma generate


Start the development server:

npm run start:dev


Open:

http://localhost:3000/graphql

🏗️ Build

Generate Prisma Client and build the NestJS application:

npm run build


The project also generates Prisma Client during installation using the postinstall script.

🚀 Deployment

The application is deployed using Vercel.

Production endpoint:

https://graph-ql-sepia-two.vercel.app/graphql


The production application uses PostgreSQL through Prisma and exposes the GraphQL API through Apollo Server.

📖 Learning Goals

This project was built to practice:

GraphQL fundamentals
Queries
Mutations
Resolvers
GraphQL object types
GraphQL input types
Nested queries
Resolver field relationships
Prisma ORM
PostgreSQL
One-to-one relationships
One-to-many relationships
Many-to-many relationships through an explicit enrollment model
Filtering
Sorting
Cursor pagination
Apollo Server
NestJS
Server-side GraphQL architecture
Deploying a GraphQL API to Vercel
📌 API Summary
Queries
students
student(id)

teachers
teacher(id)

courses
course(id)

profiles
profile(id)

enrollments

Mutations
createStudent
assignTeacher

createTeacher

createCourse

createProfile

enrollStudent

Main Relationships
Student
 ├── Profile
 ├── Teacher
 └── Enrollment
       └── Course

Teacher
 └── Student[]

Profile
 └── Student

Course
 └── Enrollment[]

Enrollment
 ├── Student
 └── Course

⭐ Project

Built with:

NestJS + GraphQL + Apollo + Prisma + PostgreSQL + TypeScript

The project is intended as a practical demonstration of building and deploying a relational GraphQL API.

One thing I'd do before pushing this README: push your resolver fixes to GitHub first. The live main branch I can currently inspect still shows the old teacher(id): [Teacher] declaration, even though you've fixed it locally. 
G
GitHub

After you push, the README and repository will be consistent.

G
Sources