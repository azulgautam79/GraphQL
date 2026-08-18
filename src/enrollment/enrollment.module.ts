import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentResolver } from './enrollment.resolver';

@Module({
  providers: [EnrollmentService, EnrollmentResolver]
})
export class EnrollmentModule {}
