import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateEnrollmentInput {

    @Field(() => Int)
    courseId!: number;

    @Field()
    semester!: string;
}