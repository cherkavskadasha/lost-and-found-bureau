import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Success' }),
  })
) as jest.Mock;

describe('Сторінка реєстрації', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('рендерить форму реєстрації', () => {
    render(<RegisterPage />);
    expect(screen.getByText('Створення акаунта')).toBeInTheDocument();
    
    expect(screen.getByPlaceholderText('Як до вас звертатися?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('name@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Мінімум 6 символів')).toBeInTheDocument();
  });

  it('відправляє дані форми при натисканні на кнопку', async () => {
    render(<RegisterPage />);
    
    fireEvent.change(screen.getByPlaceholderText('Як до вас звертатися?'), { target: { value: 'Іван' } });
    fireEvent.change(screen.getByPlaceholderText('name@example.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Мінімум 6 символів'), { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: /Зареєструватися/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/register', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ name: 'Іван', email: 'test@example.com', password: 'password123' }),
    }));
  });
});