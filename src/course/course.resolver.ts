import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Course } from './entities/course.entity';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseInput } from './dto/create-course.input';
import { Student } from '../student/entities/student.entity';
import { Enrollment } from '../enrollment/entities/enrollment.entity';

@Resolver(() => Course)
export class CourseResolver {

    constructor(
        private readonly courseService: CourseService,
        private readonly prisma: PrismaService,
    ) { }

    //! Find All Courses
    @Query(() => [Course])
    courses() {
        return this.courseService.findAll();
    }

    //! Find Courses by id
    @Query(() => [Course], { nullable: true })
    course(@Args('id', { type: () => Int }) id: number) {
        return this.courseService.findOne(id);
    }

    //! Query Students from Courses
    // @ResolveField(() => [Student])
    // students(@Parent() course: Course) {
    //     return this.prisma.course
    //         .findUnique({
    //             where: {
    //                 id: course.id,
    //             },
    //         })
    //         .students();
    // }

    //! Query Enrollments from Courses
    @ResolveField(() => [Enrollment])
    enrollments(@Parent() course: Course) {
        return this.prisma.enrollment.findMany({
            where: {
                courseId: course.id,
            },
        });
    }

    //! Create Course
    @Mutation(() => Course)
    createCourse(
        @Args('input', { type: () => CreateCourseInput })
        input: CreateCourseInput,
    ) {
        return this.courseService.create(input);
    }
}
