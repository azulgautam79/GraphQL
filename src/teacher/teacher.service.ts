import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherInput } from './dto/create-teacher-input';

@Injectable()
export class TeacherService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    //! Find All Teachers
    findAll() {
        return this.prisma.teacher.findMany();
    }

    //! Find Teacher by Id
    findOne(id: number) {
        return this.prisma.teacher.findUnique({
            where: {
                id,
            }
        })
    }

    //! Create Teacher
    create(input: CreateTeacherInput) {
        return this.prisma.teacher.create({
            data: {
                name: input.name,
                email: input.email
            }
        })
    }
}
