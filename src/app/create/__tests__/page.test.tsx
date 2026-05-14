import { render, screen } from '@testing-library/react';
import CreatePage from '../page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

jest.mock('../../../components/ImageUpload', () => function MockImageUpload() { 
  return <div data-testid="image-upload-mock" />; 
});
jest.mock('../../../components/MapPicker', () => function MockMapPicker() { 
  return <div data-testid="map-picker-mock" />; 
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: 'new-item-123' }),
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

describe('Сторінка створення оголошення', () => {
  it('коректно рендерить форму та її елементи', () => {
    render(<CreatePage />);
    
    expect(screen.getByText(/Що сталося\?/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Чорний гаманець зі шкіри/i)).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /Опублікувати оголошення/i })).toBeInTheDocument();
  });
});