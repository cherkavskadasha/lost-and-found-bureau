import { render } from '@testing-library/react';
import FoundPage from '../page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('../../../lib/prisma', () => ({
  __esModule: true,
  default: {
    category: { findMany: jest.fn().mockResolvedValue([]) },
    item: { findMany: jest.fn().mockResolvedValue([]) }
  }
}), { virtual: true });

global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
) as jest.Mock;

describe('Сторінка Знайдених речей', () => {
  it('рендериться без помилок', async () => {
    const ui = await (FoundPage as any)({ searchParams: Promise.resolve({}) });
    render(ui);
  });
});