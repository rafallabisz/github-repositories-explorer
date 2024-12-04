import { render, screen } from '@testing-library/react';
import DynamicMessage from 'components/Messages/DynamicMessage/DynamicMessage';

describe('DynamicMessage Component', () => {
  const TEST_MESSAGE = 'Test message';

  it('renders the message when isVisible is true', () => {
    render(<DynamicMessage isVisible={true}>{TEST_MESSAGE}</DynamicMessage>);
    const element = screen.getByText(TEST_MESSAGE);
    expect(element).toBeInTheDocument();
  });

  it('does not render the message when isVisible is false', () => {
    render(<DynamicMessage isVisible={false}>{TEST_MESSAGE}</DynamicMessage>);
    const element = screen.queryByText(TEST_MESSAGE);
    expect(element).not.toBeInTheDocument();
  });

  it('applies the correct styles via className', () => {
    render(<DynamicMessage isVisible={true}>{TEST_MESSAGE}</DynamicMessage>);
    const element = screen.getByText(TEST_MESSAGE);
    expect(element).toHaveClass('content');
  });
});
