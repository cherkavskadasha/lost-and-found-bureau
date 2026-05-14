import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../page';
import { signIn } from 'next-auth/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('Сторінка логіну', () => {
  beforeEach(() => {
    (signIn as jest.Mock).mockClear();
  });

  it('рендерить заголовок та кнопки входу', () => {
    render(<LoginPage />);
    expect(screen.getByText('З поверненням!')).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /GitHub/i })).toBeInTheDocument();
  });

  it('викликає signIn("google") при кліку на Google', () => {
    render(<LoginPage />);
    const googleButton = screen.getByRole('button', { name: /Google/i });
    
    fireEvent.click(googleButton);
    
    expect(signIn).toHaveBeenCalledWith('google', expect.any(Object));
  });

  it('викликає signIn("github") при кліку на GitHub', () => {
    render(<LoginPage />);
    const githubButton = screen.getByRole('button', { name: /GitHub/i });
    
    fireEvent.click(githubButton);
    
    expect(signIn).toHaveBeenCalledWith('github', expect.any(Object));
  });
});