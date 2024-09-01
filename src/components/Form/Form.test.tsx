import { render, screen, userEvent } from '@test-utils';
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

  it('has the previous button on the second question', async () => {
    render(<Form questions={questions} />);

    const yesRadio = screen.getByRole('radio', { name: 'Yes' });
    await userEvent.click(yesRadio);

    const nextButton = screen.getByRole('button', { name: 'Next' });
    await userEvent.click(nextButton);

    const previousButton = screen.getByRole('button', { name: 'Back' });
    expect(previousButton).toBeInTheDocument();
  });

  it('submits the form when go-to question is end', async () => {
    render(<Form questions={questions} />);

    const noRadio = screen.getByRole('radio', { name: 'No' });
    await userEvent.click(noRadio);

    const nextButton = screen.getByRole('button', { name: 'Next' });
    await userEvent.click(nextButton);

    expect(screen.getByTestId('thank-you-message')).toBeInTheDocument();
  });
});
