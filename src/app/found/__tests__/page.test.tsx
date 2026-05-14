import { render } from '@testing-library/react';
import FoundPage from '../page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
) as jest.Mock;

describe('Сторінка Знайдених речей', () => {
  it('рендериться без помилок', async () => {
    const ui = await (FoundPage as any)({ searchParams: Promise.resolve({}) });
    render(ui);
  });
});