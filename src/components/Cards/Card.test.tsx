import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  const CONTENT = 'Content';

  it('renders children correctly', () => {
    render(
      <Card>
        <p>{CONTENT}</p>
      </Card>,
    );
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });

  it('applies the correct styles via className', () => {
    render(<Card>{CONTENT}</Card>);
    const cardElement = document.querySelector('.container');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveClass('container');
  });
});
