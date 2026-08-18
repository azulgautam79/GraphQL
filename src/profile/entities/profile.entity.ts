import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Student } from "../../student/entities/student.entity";

@ObjectType()
export class Profile {

    @Field(() => Int)
    id!: number;

    @Field()
    bio!: string;

    @Field(() => Int)
    studentId!: number;

    @Field(() => Student)
    student!: Student;
}