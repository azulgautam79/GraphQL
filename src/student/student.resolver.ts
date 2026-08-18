import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student-input';
import { Profile } from '../profile/entities/profile.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Teacher } from '../teacher/entities/teacher.entity';
import { AssignTeacherInput } from './dto/assign-teacher.input';
import { EnrollStudentInput } from './dto/enroll-student.input';
import { Course } from '../course/entities/course.entity';
import { Enrollment } from '../enrollment/entities/enrollment.entity';
import { StudentQueryInput } from './dto/student-query.input';
import { StudentConnection } from './entities/student-connection.entity';

@Resolver(() => Student)
export class StudentResolver {

    constructor(
        private readonly studentService: StudentService,
        private readonly prisma: PrismaService,
    ) { }

    //! Find All Students
    // @Query(() => [Student])
    // students() {
    //     return this.studentService.findAll();
    // }
    //* With filters, pagination, sorting
    @Query(() => StudentConnection)
    students(
        @Args("query", { nullable: true })
        query?: StudentQueryInput,
    ) {
        return this.studentService.findAll(query);
    }



    //! Find Student by id
    @Query(() => Student, { nullable: true })
    student(@Args('id', { type: () => Int }) id: number) {
        return this.studentService.findOne(id);
    }

    //! Create Student
    @Mutation(() => Student)
    createStudent(
        @Args('input', { type: () => CreateStudentInput })
        input: CreateStudentInput,
    ) {
        return this.studentService.create(input);
    }

    //! Query Profiles from Students
    @ResolveField(() => Profile, { nullable: true })
    profile(@Parent() student: Student) {
        return this.prisma.profile.findUnique({
            where: {
                studentId: student.id,
            }
        })
    }

    //! Query Teachers from students
    @ResolveField(() => Teacher, { nullable: true })
    teacher(@Parent() student: Student) {
        if (!student.teacherId) {
            return null;
        }

        return this.prisma.teacher.findUnique({
            where: {
                id: student.teacherId
            }
        })
    }

    //! Assign Teacher to students
    @Mutation(() => Student)
    assignTeacher(
        @Args('input') input: AssignTeacherInput,
    ) {
        return this.studentService.assignTeacher(input);
    }

    //! Query Enrollments from students
    @ResolveField(() => [Enrollment])
    enrollments(@Parent() student: Student) {
        return this.prisma.enrollment.findMany({
            where: {
                studentId: student.id,
            },
        });
    }

    //! Query Courses from students
    // @ResolveField(() => [Course])
    // courses(@Parent() student: Student) {
    //     return this.prisma.student
    //         .findUnique({
    //             where: {
    //                 id: student.id,
    //             },
    //         })
    //         .courses();
    // }

    //! Enroll a student to a course
    // @Mutation(() => Student)
    // enrollStudent(
    //     @Args("input")
    //     input: EnrollStudentInput,
    // ) {
    //     return this.studentService.enroll(input);
    // }

}
