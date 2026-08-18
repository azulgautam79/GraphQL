import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CursorPaginationInput {
    @Field(() => Int, { nullable: true })
    after?: number;

    @Field(() => Int, { defaultValue: 10 })
    first!: number;
}
