import { Field, InputType } from "@nestjs/graphql";
import { StudentSortField } from "../enums/student-sort-field.enum";
import { SortOrder } from "../enums/sort-order.enum";

@InputType()
export class StudentSortInput {

    @Field(() => StudentSortField)
    field!: StudentSortField;

    @Field(() => SortOrder)
    order!: SortOrder;

}
