import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import KeypadKey from "../../app/components/keypad-key";

it('KeypadKey', async () => {
    /* arrange */
    let count = 0;
    render(<KeypadKey label='Test' kind='number' onClick={() => ++count} />);

    /* act */
    await userEvent.click(screen.getByText('Test'));

    /* assert */
    expect(screen.getByRole('heading')).toHaveTextContent('Test');
    expect(count).toBe(1);
});
