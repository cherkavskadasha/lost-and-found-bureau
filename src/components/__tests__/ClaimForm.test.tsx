import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ClaimForm from '../ClaimForm';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Success' }),
  })
) as jest.Mock;

describe('Компонент ClaimForm', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('рендерить форму відправки заявки', () => {
    render(<ClaimForm itemId="test-item-123" question="Якого кольору річ?" />);
    
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
  });

  it('дозволяє ввести текст та відправити форму', async () => {
    render(<ClaimForm itemId="test-item-123" question="Якого кольору річ?" />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Я знайшов вашу річ!' } });
    
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});