// import DataLoader from 'dataloader';
// import { PrismaService } from '../../prisma/prisma.service';
// import { Teacher } from '../../../generated/prisma/client';

// export function createTeacherLoader(
//     prisma: PrismaService,
// ) {
//     return new DataLoader<number, Teacher | null>(
//         async (teacherIds) => {

//             const teachers = await prisma.teacher.findMany({
//                 where: {
//                     id: {
//                         in: [...teacherIds],
//                     },
//                 },
//             });

//             const teacherMap = new Map(
//                 teachers.map(teacher => [
//                     teacher.id,
//                     teacher,
//                 ]),
//             );

//             return teacherIds.map(
//                 id => teacherMap.get(id) ?? null,
//             );
//         },
//     );
// }
