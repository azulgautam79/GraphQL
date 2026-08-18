import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class StudentFilterInput {

    @Field({ nullable: true })
    name?: string;

    @Field(() => Int, { nullable: true })
    teacherId?: number;

    @Field(() => Int, { nullable: true })
    courseId?: number;
}