import { render, screen } from '@testing-library/react';
import ImageUpload from '../ImageUpload';

jest.mock('next-cloudinary', () => ({
  CldUploadWidget: ({ children }: any) => children({ open: jest.fn() }),
}));

describe('Компонент ImageUpload', () => {
  it('рендерить кнопку завантаження, якщо немає фото', () => {
    render(<ImageUpload value="" onChange={jest.fn()} />);
    expect(screen.getByText(/Натисніть, щоб додати фотографію/i)).toBeInTheDocument();
  });

  it('відображає фотографію, якщо передано посилання', () => {
    render(<ImageUpload value="https://example.com/test-image.jpg" onChange={jest.fn()} />);
    
    const img = screen.getByAltText('Uploaded Image');
    expect(img).toBeInTheDocument();
  });
});