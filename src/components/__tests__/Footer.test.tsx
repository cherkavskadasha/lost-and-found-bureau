import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Компонент Footer', () => {
  it('коректно рендерить назву та опис', () => {
    render(<Footer />);
    
    expect(screen.getByText('Бюро Знахідок')).toBeInTheDocument();
    expect(screen.getByText(/Всеукраїнська база для швидкого пошуку/)).toBeInTheDocument();
  });

  it('містить необхідні секції навігації', () => {
    render(<Footer />);
    
    expect(screen.getByText('Швидкі посилання')).toBeInTheDocument();
    expect(screen.getByText("Зв'язок з нами")).toBeInTheDocument();
    
    expect(screen.getByText('Загублені речі')).toHaveAttribute('href', '/lost');
    expect(screen.getByText('Знайдені речі')).toHaveAttribute('href', '/found');
    expect(screen.getByText('Створити оголошення')).toHaveAttribute('href', '/create');
  });

  it('відображає поточний рік у копірайті', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});