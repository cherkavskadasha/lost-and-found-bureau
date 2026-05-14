import { cn } from '../utils';

describe('Функція cn (classnames)', () => {
  it('коректно об\'єднує класи', () => {
    const result = cn('bg-red-500', 'text-white', { 'p-4': true, 'm-2': false });
    expect(result).toBe('bg-red-500 text-white p-4');
  });

  it('вирішує конфлікти класів Tailwind', () => {
    const result = cn('text-lg p-2', 'text-sm');
    expect(result).toBe('p-2 text-sm');
  });
});