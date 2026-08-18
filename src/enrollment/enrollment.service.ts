import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EnrollStudentInput } from '../student/dto/enroll-student.input';

@Injectable()
export class EnrollmentService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    //! Find All Enrollments
    findAll() {
        return this.prisma.enrollment.findMany();
    }

    //! Find enrollment by id
    // findOne(id: number) {
    //     return this.prisma.enrollment.findUnique({
    //         where: {
    //             id,
    //         }
    //     })
    // }

    //! Create Student Enrollment 
    create(input: EnrollStudentInput) {
        return this.prisma.enrollment.create({
            data: {
                studentId: input.studentId,
                courseId: input.courseId,
                semester: input.semester,
            }
        })
    }
}
