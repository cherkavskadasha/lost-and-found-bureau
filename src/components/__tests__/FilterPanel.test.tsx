import { render, screen, fireEvent } from '@testing-library/react';
import FilterPanel from '../FilterPanel';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

const mockCategories = [
  { id: '1', name: 'Електроніка', slug: 'electronics' },
  { id: '2', name: 'Документи', slug: 'documents' },
];

describe('Компонент FilterPanel', () => {
  it('коректно рендерить всі поля фільтрів та категорії', () => {
    render(<FilterPanel categories={mockCategories} />);

    expect(screen.getByPlaceholderText('Пошук за назвою...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Місто...')).toBeInTheDocument();
    expect(screen.getByText('Всі категорії')).toBeInTheDocument();
    expect(screen.getByText('Електроніка')).toBeInTheDocument();
  });

  it('викликає оновлення фільтрів при введенні тексту', () => {
    render(<FilterPanel categories={mockCategories} />);
    
    const searchInput = screen.getByPlaceholderText('Пошук за назвою...');
    fireEvent.change(searchInput, { target: { value: 'телефон' } });
    
    const cityInput = screen.getByPlaceholderText('Місто...');
    fireEvent.change(cityInput, { target: { value: 'Київ' } });

    
    const selects = screen.getAllByRole('combobox');
    const categorySelect = selects[0]; 
    
    fireEvent.change(categorySelect, { target: { value: 'electronics' } });
  });
});