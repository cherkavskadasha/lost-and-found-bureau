import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: () => ({ push: jest.fn() }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('was not wrapped in act')) return;
    originalError.call(console, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

describe('Компонент Header', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('рендерить логотип та базову навігацію', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });
    
    render(<Header />);
    
    expect(screen.getByText('Бюро Знахідок')).toBeInTheDocument();
    
    expect(screen.getByText(/Увійти/i)).toBeInTheDocument();
  });

  it('відображає елементи авторизованого користувача', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'Студент', email: 'student@example.com' } },
      status: 'authenticated',
    });
    
    render(<Header />);
    
    expect(screen.getByRole('link', { name: /Створити/i })).toBeInTheDocument();
  });
});