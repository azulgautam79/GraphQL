import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentResolver } from './enrollment.resolver';

describe('EnrollmentResolver', () => {
  let resolver: EnrollmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnrollmentResolver],
    }).compile();

    resolver = module.get<EnrollmentResolver>(EnrollmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
