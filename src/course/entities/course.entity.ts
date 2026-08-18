import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Student } from "../../student/entities/student.entity";
import { Enrollment } from "../../enrollment/entities/enrollment.entity";


@ObjectType()
export class Course {

    @Field(() => Int)
    id!: number;

    @Field()
    title!: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => [Enrollment])
    enrollments!: Enrollment[];
}