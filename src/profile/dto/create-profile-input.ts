import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateProfileInput {

    @Field()
    bio!: string;


    @Field(() => Int)
    studentId!: number;
}