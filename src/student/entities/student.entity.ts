import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Profile } from "../../profile/entities/profile.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Enrollment } from "../../enrollment/entities/enrollment.entity";


@ObjectType()
export class Student {

    @Field(() => Int)
    id!: number;

    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field(() => Profile, { nullable: true })
    profile?: Profile;

    @Field(() => Int, { nullable: true })
    teacherId?: number;

    @Field(() => Teacher, { nullable: true })
    teacher?: Teacher;

    @Field(() => [Enrollment])
    enrollments!: Enrollment[];
}