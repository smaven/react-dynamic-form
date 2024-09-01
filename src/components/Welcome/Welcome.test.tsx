import { render, screen } from '@test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('has correct Vite guide link', () => {
    render(<Welcome />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/vite/'
    );
  });

  it('shows loading message', () => {
    render(<Welcome />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('greets user by name', async () => {
    render(<Welcome />);
    expect(await screen.findByText('Hello John Maverick 👋')).toBeInTheDocument();
  });
});
