import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentInput } from './dto/create-student-input';
import { AssignTeacherInput } from './dto/assign-teacher.input';
import { EnrollStudentInput } from './dto/enroll-student.input';
import { StudentFilterInput } from './dto/student-filter.input';
import { StudentQueryInput } from './dto/student-query.input';
import { decodeCursor } from '../common/pagination/cursor';

@Injectable()
export class StudentService {
    constructor(private readonly prisma: PrismaService) { }

    //! Find All Students
    // async findAll() {
    //     return this.prisma.student.findMany();
    // }

    // * With filters
    async findAll(query?: StudentQueryInput) {

        const first = query?.cursor?.first ?? 10;
        const after = query?.cursor?.after;

        const where = {
            name: query?.filter?.name
                ? {
                    contains: query.filter.name,
                    mode: 'insensitive' as const,
                }
                : undefined,

            teacherId: query?.filter?.teacherId,

            enrollments: query?.filter?.courseId
                ? {
                    some: {
                        courseId: query.filter.courseId,
                    },
                }
                : undefined,
        };

        const totalCount = await this.prisma.student.count({
            where,
        });

        const students = await this.prisma.student.findMany({

            where,

            orderBy: query?.sort
                ? {
                    [query.sort.field]: query.sort.order,
                }
                : {
                    id: 'asc',
                },

            cursor: after
                ? {
                    id: after,
                }
                : undefined,

            skip: after ? 1 : undefined,

            // Get one extra so we know if another page exists
            take: first + 1,
        });

        const hasNextPage = students.length > first;

        const nodes = students.slice(0, first);

        const edges = nodes.map(student => ({
            cursor: student.id.toString(),
            node: student,
        }));

        return {
            edges,

            pageInfo: {
                hasNextPage,

                hasPreviousPage: !!after,

                startCursor:
                    edges.length > 0
                        ? edges[0].cursor
                        : null,

                endCursor:
                    edges.length > 0
                        ? edges[edges.length - 1].cursor
                        : null,
            },

            totalCount,
        };
    }


    //! Find Student by id
    async findOne(id: number) {
        return this.prisma.student.findUnique({
            where: {
                id,
            }
        })
    }

    //! Create Student
    // async create(input: CreateStudentInput) {
    //     return this.prisma.student.create({
    //         data: {
    //             name: input.name,
    //             email: input.email
    //         }
    //     })
    // }

    //* Nested Query
    async create(input: CreateStudentInput) {
        return this.prisma.student.create({
            data: {
                name: input.name,
                email: input.email,
                teacher: input.teacherId
                    ? {
                        connect: {
                            id: input.teacherId,
                        },
                    }
                    : undefined,

                profile: input.profile
                    ? {
                        create: {
                            bio: input.profile.bio,
                        },
                    }
                    : undefined,
                enrollments: input.enrollments
                    ? {
                        create: input.enrollments.map((e) => ({
                            semester: e.semester,

                            course: {
                                connect: {
                                    id: e.courseId,
                                },
                            },
                        })),
                    }
                    : undefined
            },
            include: {
                profile: true,

                teacher: true,

                enrollments: {
                    include: {
                        course: true,
                    },
                },
            },
        })
    }

    //! Assign teacher to student
    assignTeacher(input: AssignTeacherInput) {
        return this.prisma.student.update({
            where: {
                id: input.studentId,
            },
            data: {
                teacher: {
                    connect: {
                        id: input.teacherId,
                    },
                },
            },
        });
    }

    //! Enroll student to a course
    // enroll(input: EnrollStudentInput) {
    //     return this.prisma.student.update({
    //         where: {
    //             id: input.studentId,
    //         },
    //         data: {
    //             courses: {
    //                 connect: {
    //                     id: input.courseId
    //                 }
    //             }
    //         }
    //     })
    // }
}
