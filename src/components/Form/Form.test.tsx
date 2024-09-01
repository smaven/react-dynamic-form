import { render, screen } from '@test-utils';
import { Form } from './Form';
import { questions } from '@/mocks/form.mocks';

describe('Form component', () => {
  it('has the next button', () => {
    render(<Form questions={questions} />);

    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeInTheDocument();
  });

  it('does not have the previous button on the first question', () => {
    render(<Form questions={questions} />);

    const previousButton = screen.queryByRole('button', { name: 'Back' });
    expect(previousButton).not.toBeInTheDocument();
  });
});
