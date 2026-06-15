import { cleanup, render, screen, waitFor, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from "../../app";

/* Constants */
const ARITHMETIC_TESTS = [
    ['1+1=2', ['1','+','1','='], ['1','1','1','2']],
    ['1-1=0', ['1','-','1','='], ['1','1','1','0']],
    ['2*2=4', ['2','*','2','='], ['2','2','2','4']],
    ['4/2=2', ['4','/','2','='], ['4','4','2','2']],
];

/* Functions */
/*
    This function validates that a sequence of key presses, e.g. ['1','+','1','='], results in the expected ouput on
    the calculator's display after each key press, c.f., key press example: ['1', '1', '1', '2']

    keyPressArray: array of strings corresponding to the names of calculator keys
    expectedDisplayArray: array of strings corresponding to expected output in calculator display after each key press
        given by keyPressArray
*/
async function testCalculatorInput(user, keyPressArray, expectedDisplayArray) {
    expect(keyPressArray.length).toBe(expectedDisplayArray.length);

    for (let i = 0; i < keyPressArray.length; i++) {
        await testCalculatorKeyInput(user, keyPressArray[i], expectedDisplayArray[i]);
    }
}

/*
    This function validates that a key press, e.g., '1', results in the expected output on the calculator's display
    after the key press.
*/
async function testCalculatorKeyInput(user, keyName, expectedVal) {
    const button = screen.getByRole('button', { name: keyName, });
    await user.click(button);

    const display = screen.getByRole('heading', { level: 1, });
    expect(display.textContent).toBe(expectedVal);
}

describe('App', () => {
    let user;

    beforeEach(() => {
        render(<App />);
        user = userEvent.setup();
    });

    it('[sanity]', () => {
        const displayElement = screen.getByRole('heading', { level: 1, });
        expect(displayElement).toHaveTextContent('0');
    });

    describe('arithmetic operations', () => {
        it.each(ARITHMETIC_TESTS)('%s', async (label, keyPressesArr, expectedDisplayArr) => {
            await testCalculatorInput(user, keyPressesArr, expectedDisplayArr);
        });
    });
});
