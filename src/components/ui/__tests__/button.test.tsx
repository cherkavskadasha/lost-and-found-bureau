import { render, screen } from '@testing-library/react';
import { Button } from '../button';

describe('UI Компонент Button', () => {
  it('коректно рендериться з переданим текстом', () => {
    render(<Button>Натисни мене</Button>);
    expect(screen.getByText('Натисни мене')).toBeInTheDocument();
  });
});