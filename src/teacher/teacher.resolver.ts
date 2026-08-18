import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Teacher } from './entities/teacher.entity';
import { TeacherService } from './teacher.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherInput } from './dto/create-teacher-input';
import { Student } from '../student/entities/student.entity';

@Resolver(() => Teacher)
export class TeacherResolver {

    constructor(
        private readonly teacherService: TeacherService,
        private readonly prisma: PrismaService,
    ) { }

    //! Find All Teachers
    @Query(() => [Teacher])
    teachers() {
        return this.teacherService.findAll();
    }

    //! Find Teacher by id
    @Query(() => [Teacher], { nullable: true })
    teacher(@Args('id', { type: () => Int }) id: number) {
        return this.teacherService.findOne(id);
    }

    //! Query Students from Teachers
    @ResolveField(() => [Student])
    students(@Parent() teacher: Teacher) {
        return this.prisma.student.findMany({
            where: {
                teacherId: teacher.id,
            }
        })
    }

    //! Create Teacher
    @Mutation(() => Teacher)
    createTeacher(
        @Args('input', { type: () => CreateTeacherInput })
        input: CreateTeacherInput,
    ) {
        return this.teacherService.create(input);
    }

}
