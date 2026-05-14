import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';

describe('UI Компонент Avatar', () => {
  it('рендерить фолбек (ініціали), якщо немає картинки', () => {
    render(
      <Avatar>
        <AvatarImage src="" alt="Тест" />
        <AvatarFallback>БЗ</AvatarFallback>
      </Avatar>
    );
    
    expect(screen.getByText('БЗ')).toBeInTheDocument();
  });
});