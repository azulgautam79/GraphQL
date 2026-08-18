import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class EnrollStudentInput {
    @Field(() => Int)
    studentId!: number;

    @Field(() => Int)
    courseId!: number;

    @Field()
    semester!: string;
}
