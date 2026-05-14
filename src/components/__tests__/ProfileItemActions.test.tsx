import { render, screen } from '@testing-library/react';
import ProfileItemActions from '../ProfileItemActions';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() })
}));

jest.mock('next/link', () => {
  return ({ children }: any) => children;
});

global.fetch = jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock;

describe('Компонент ProfileItemActions', () => {
  it('успішно рендериться на сторінці', () => {
    const Component = ProfileItemActions as any;
    
    render(<Component id="test-123" itemId="test-123" />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});