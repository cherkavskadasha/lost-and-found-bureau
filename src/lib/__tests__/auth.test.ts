import { authOptions } from '../auth';

jest.mock('@auth/prisma-adapter', () => ({
  PrismaAdapter: jest.fn(),
}));

jest.mock('../prisma', () => ({
  __esModule: true,
  default: {},
}));

describe('Конфігурація NextAuth (auth.ts)', () => {
  it('містить правильну стратегію сесії та провайдери', () => {
    expect(authOptions).toBeDefined();
    expect(authOptions.session?.strategy).toBe('jwt');
    expect(authOptions.pages?.signIn).toBe('/login');
    expect(authOptions.providers.length).toBeGreaterThan(0);
  });
});