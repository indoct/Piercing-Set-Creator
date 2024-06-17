import { render, screen, fireEvent } from '@testing-library/react';
import InstructionsModal from '../InstructionsModal';

test('calls the on close callback when button is clicked', async () => {
  const onClose = vi.fn()

  render(<InstructionsModal onClose={onClose} show={true} />);
  fireEvent.click(screen.getByTestId('btn-close'));

  await screen.getByTestId('btn-close');

  expect(onClose).toHaveBeenCalled();
})