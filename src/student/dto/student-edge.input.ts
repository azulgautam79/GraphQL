import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from '../entities/student.entity';

@ObjectType()
export class StudentEdge {

    @Field()
    cursor!: string;

    @Field(() => Student)
    node!: Student;
}
