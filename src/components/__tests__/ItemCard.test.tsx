import { render, screen } from '@testing-library/react';
import ItemCard from '../ItemCard';

const mockItemLost = {
  id: '1',
  createdAt: new Date('2026-05-13T10:00:00Z').toISOString(),
  city: 'Житомир',
  location: 'Центр',
  imageUrl: '/test-image.jpg',
  title: 'Втрачено ключі',
  type: 'LOST' as const,
  description: 'Зв\'язка ключів з брелоком автомобіля',
  category: { name: 'Інше' }
};

describe('Компонент ItemCard', () => {
  
  it('коректно відображає загублену річ', () => {
    // 1. Рендеримо компонент
    render(<ItemCard item={mockItemLost} />);

    expect(screen.getByText('Втрачено ключі')).toBeInTheDocument();
    expect(screen.getByText('Загублено')).toBeInTheDocument();
    expect(screen.getByText('Житомир, Центр')).toBeInTheDocument();
    expect(screen.getByText('Інше')).toBeInTheDocument();
  });

  it('коректно відображає знайдену річ', () => {
    // Змінюємо тип на FOUND для другого тесту
    const mockItemFound = { 
      ...mockItemLost, 
      type: 'FOUND' as const, 
      title: 'Знайдено гаманець' 
    };
    
    render(<ItemCard item={mockItemFound} />);

    expect(screen.getByText('Знайдено гаманець')).toBeInTheDocument();
    expect(screen.getByText('Знайдено')).toBeInTheDocument();
  });

});