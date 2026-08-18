import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTeacherInput {

    @Field()
    name!: string;

    @Field()
    email!: string;
}