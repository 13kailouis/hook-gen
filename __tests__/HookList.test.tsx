import { render, screen, fireEvent } from '@testing-library/react';
import HookList from '@/components/HookList';

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('HookList', () => {
  const hooks = ['a', 'b', 'c'];

  it('renders all hooks', () => {
    render(<HookList hooks={hooks} />);
    hooks.forEach(h => {
      expect(screen.getByText(h)).toBeInTheDocument();
    });
  });

  it('allows liking and disliking', () => {
    render(<HookList hooks={hooks} />);
    const like = screen.getAllByRole('button', { name: 'Like' })[0];
    fireEvent.click(like);
    expect(like.className).toMatch(/active/);
  });

  it('copies to clipboard', () => {
    render(<HookList hooks={hooks} />);
    const copy = screen.getAllByLabelText('Copy hook')[0];
    fireEvent.click(copy);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('a');
  });
});
