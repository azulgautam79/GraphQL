import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../common/entities/page-info.entity';
import { StudentEdge } from './student-edge.input';

@ObjectType()
export class StudentConnection {

    @Field(() => [StudentEdge])
    edges!: StudentEdge[];

    @Field(() => PageInfo)
    pageInfo!: PageInfo;

    @Field(() => Int)
    totalCount!: number;
}
