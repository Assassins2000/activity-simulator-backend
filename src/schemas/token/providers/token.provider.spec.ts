import { Test, TestingModule } from '@nestjs/testing';
import { TokenProvider } from './token.provider';

describe('TokenProvider', () => {
  let provider: TokenProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenProvider],
    }).compile();

    provider = module.get<TokenProvider>(TokenProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
