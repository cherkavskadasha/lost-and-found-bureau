import { render, screen, fireEvent } from '@testing-library/react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../dropdown-menu';

describe('UI Компонент DropdownMenu', () => {
  it('відкривається при кліку', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Меню</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Профіль</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText('Меню');
    expect(trigger).toBeInTheDocument();
    
    fireEvent.click(trigger);
    expect(screen.getByRole('menuitem', { name: /Профіль/i })).toBeInTheDocument();
  });
});