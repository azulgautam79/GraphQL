import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileInput } from './dto/create-profile-input';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) { }

    //! Find All Profiles
    async findAll() {
        return this.prisma.profile.findMany();
    }

    //! Find Profile by id
    async findOne(id: number) {
        return this.prisma.profile.findUnique({
            where: {
                id,
            }
        })
    }

    //! Create Profile
    async create(input: CreateProfileInput) {
        return this.prisma.profile.create({
            data: {
                bio: input.bio,
                studentId: input.studentId,
            },
        });
    }
}
