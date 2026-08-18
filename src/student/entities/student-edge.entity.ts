import { Field, ObjectType } from "@nestjs/graphql";
import { Student } from "./student.entity";

@ObjectType()
export class StudentEdge {

    @Field()
    cursor!: string;

    @Field(() => Student)
    node!: Student;
}
