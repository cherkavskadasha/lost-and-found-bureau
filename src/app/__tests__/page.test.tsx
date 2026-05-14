import { render } from '@testing-library/react';
import HomePage from '../page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
) as jest.Mock;

describe('Головна сторінка сайту', () => {
  it('рендериться без критичних помилок', () => {
    render(<HomePage />);
  });
});