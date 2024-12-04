import { render } from '@testing-library/react';
import Skeleton from './Skeleton';

describe('Skeleton Component', () => {
  it('renders without crashing', () => {
    render(<Skeleton />);
    const element = document.querySelector('.react-loading-skeleton');
    expect(element).toBeInTheDocument();
  });

  it('applies default style props when no props are provided', () => {
    render(<Skeleton />);
    const element = document.querySelector('.react-loading-skeleton');
    expect(element).toHaveStyle({
      height: '1rem',
      width: '100%',
      borderRadius: '4px',
      className: '',
    });
  });

  it('renders the correct number of skeleton elements when count is provided', () => {
    render(<Skeleton count={3} />);
    const elements = document.querySelectorAll('.react-loading-skeleton');
    expect(elements).toHaveLength(3);
  });

  it('applies custom height, width and border radius when provided', () => {
    render(<Skeleton height={'2rem'} width={'70%'} borderRadius={'10px'} />);
    const element = document.querySelector('.react-loading-skeleton');
    expect(element).toHaveStyle({
      height: '2rem',
      width: '70%',
      borderRadius: '10px',
    });
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    render(<Skeleton className={customClass} />);
    const element = document.querySelector('.react-loading-skeleton');
    expect(element).toHaveClass(customClass);
  });
});
