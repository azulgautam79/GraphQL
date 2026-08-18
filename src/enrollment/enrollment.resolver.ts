import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Enrollment } from './entities/enrollment.entity';
import { EnrollmentService } from './enrollment.service';
import { PrismaService } from '../prisma/prisma.service';
import { EnrollStudentInput } from '../student/dto/enroll-student.input';
import { Student } from '../student/entities/student.entity';
import { Course } from '../course/entities/course.entity';

@Resolver(() => Enrollment)
export class EnrollmentResolver {

    constructor(
        private readonly enrollmentService: EnrollmentService,
        private readonly prisma: PrismaService,
    ) { }

    //! Find All Enrollments
    @Query(() => [Enrollment])
    enrollments() {
        return this.enrollmentService.findAll();
    }

    //! Query Students from Enrollments
    @ResolveField(() => Student)
    student(@Parent() enrollment: Enrollment) {
        return this.prisma.student.findUnique({
            where: {
                id: enrollment.studentId,
            },
        });
    }

    //! Query Courses from Enrollments
    @ResolveField(() => Course)
    course(@Parent() enrollment: Enrollment) {
        return this.prisma.course.findUnique({
            where: {
                id: enrollment.courseId,
            },
        });
    }

    //! Create Course Enrollments
    @Mutation(() => Enrollment)
    enrollStudent(
        @Args("input")
        input: EnrollStudentInput,
    ) {
        return this.enrollmentService.create(input);
    }
}
