import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile-input';
import { Student } from '../student/entities/student.entity';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => Profile)
export class ProfileResolver {

    constructor(
        private readonly profileService: ProfileService,
        private readonly prisma: PrismaService
    ) { }

    //! Find All Profiles
    @Query(() => [Profile])
    profiles() {
        return this.profileService.findAll();
    }

    //! Find Profile by id
    @Query(() => Profile, { nullable: true })
    profile(@Args('id', { type: () => Int }) id: number) {
        return this.profileService.findOne(id);
    }

    //!  Query Students from profile
    @ResolveField(() => Student)
    student(@Parent() profile: Profile) {
        return this.prisma.student.findUnique({
            where: {
                id: profile.studentId,
            }
        })
    }

    //! Create Profile
    @Mutation(() => Profile)
    createProfile(
        @Args('input', { type: () => CreateProfileInput })
        input: CreateProfileInput,
    ) {
        return this.profileService.create(input);
    }
}
