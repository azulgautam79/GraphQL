import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Student } from "../../student/entities/student.entity";
import { Course } from "../../course/entities/course.entity";


@ObjectType()
export class Enrollment {

    @Field(() => Int)
    studentId!: number;

    @Field(() => Int)
    courseId!: number;

    @Field()
    semester!: string;

    @Field({ nullable: true })
    grade?: string;

    @Field()
    enrolledAt!: Date;

    @Field(() => Student)
    student!: Student;

    @Field(() => Course)
    course!: Course;
}