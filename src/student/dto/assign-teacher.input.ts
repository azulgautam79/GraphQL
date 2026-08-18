import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AssignTeacherInput {
    @Field(() => Int)
    studentId!: number;

    @Field(() => Int)
    teacherId!: number;
}
