import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  it('renders children correctly', () => {
    const content = 'Content';
    render(<Card>{content}</Card>);
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
