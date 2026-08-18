import { Field, Int, ObjectType } from "@nestjs/graphql";
import { StudentEdge } from "./student-edge.entity";
import { PageInfo } from "../../common/entities/page-info.entity";

@ObjectType()
export class StudentConnection {

    @Field(() => [StudentEdge])
    edges!: StudentEdge[];

    @Field(() => PageInfo)
    pageInfo!: PageInfo;

    @Field(() => Int)
    totalCount!: number;
}
