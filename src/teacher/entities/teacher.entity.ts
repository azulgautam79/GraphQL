import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Student } from "../../student/entities/student.entity";


@ObjectType()
export class Teacher {

    @Field(() => Int)
    id!: number;

    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field(() => [Student])
    students!: Student[];
}