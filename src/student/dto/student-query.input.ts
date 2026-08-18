import { Field, InputType } from "@nestjs/graphql";
import { StudentFilterInput } from "./student-filter.input";
import { StudentSortInput } from "./student-sort.input";
import { PaginationInput } from "./pagination.input";
import { CursorPaginationInput } from "./cursor-pagination.input";

@InputType()
export class StudentQueryInput {

    @Field(() => StudentFilterInput, { nullable: true })
    filter?: StudentFilterInput;

    @Field(() => StudentSortInput, { nullable: true })
    sort?: StudentSortInput;

    @Field(() => CursorPaginationInput, { nullable: true })
    cursor?: CursorPaginationInput;

}
