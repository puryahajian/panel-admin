import { render, screen, fireEvent } from '@testing-library/react';
import ButtonGeneral from './button-general';

describe('ButtonGeneral Component', () => {
  // تست رندر شدن کامپوننت
  test('renders button with children correctly', () => {
    render(<ButtonGeneral>Click Me</ButtonGeneral>);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  // تست دریافت پراپ className
  test('applies custom className correctly', () => {
    render(<ButtonGeneral className="custom-class">Click Me</ButtonGeneral>);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toHaveClass('custom-class');
    expect(buttonElement).toHaveClass('px-7 py-3 border border-black rounded-lg text-sm font-sans text-grayText');
  });

  // تست عملکرد رویداد onClick
  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<ButtonGeneral onClick={handleClick}>Click Me</ButtonGeneral>);
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // تست دسترسی‌پذیری (accessibility)
  test('button is accessible and has correct role', () => {
    render(<ButtonGeneral>Click Me</ButtonGeneral>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });
});