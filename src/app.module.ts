import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { StudentModule } from './student/student.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TeacherModule } from './teacher/teacher.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      graphiql: true,
      introspection: true,
    }),
    StudentModule,
    ProfileModule,
    TeacherModule,
    CourseModule,
    EnrollmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
