import { Field, InputType, Int } from "@nestjs/graphql";
import { CreateProfileInput } from "../../profile/dto/create-profile-input";
import { CreateEnrollmentInput } from "../../enrollment/dto/create-enroll.input";

@InputType()
export class CreateStudentInput {
    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field(() => Int, { nullable: true })
    teacherId?: number;

    @Field(() => CreateProfileInput, { nullable: true })
    profile?: CreateProfileInput;

    @Field(() => [CreateEnrollmentInput], {
        nullable: true
    })
    enrollments?: CreateEnrollmentInput[];
}