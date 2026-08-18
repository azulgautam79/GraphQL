import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseInput } from './dto/create-course.input';

@Injectable()
export class CourseService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    //! find all Courses
    findAll() {
        return this.prisma.course.findMany();
    }

    //! Find Course by id
    findOne(id: number) {
        return this.prisma.course.findUnique({
            where: {
                id,
            }
        })
    }

    //! Create Course
    create(input: CreateCourseInput) {
        return this.prisma.course.create({
            data: input,
        })
    }
}
