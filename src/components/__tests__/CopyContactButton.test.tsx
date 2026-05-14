import { render, screen, fireEvent } from '@testing-library/react';
import CopyContactButton from '../CopyContactButton';

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('Компонент CopyContactButton', () => {
  it('рендерить кнопки зв\'язку', () => {
    render(<CopyContactButton email="test@email.com" />);
    
    expect(screen.getByText('Написати на пошту')).toBeInTheDocument();
    expect(screen.getByText('Скопіювати email')).toBeInTheDocument();
  });

  it('копіює email при кліку', async () => {
    render(<CopyContactButton email="test@email.com" />);
    
    const copyButton = screen.getByText('Скопіювати email');
    
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test@email.com');
  });
});