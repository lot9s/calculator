import './css/index.css';

import React from 'react';
import { createRoot, } from 'react-dom/client';

import KeypadKey from './components/keypad-key.jsx';

/* App */
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayVal: '0',
            operandL: undefined,
            operandR: undefined,
            operator: undefined
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        let keyClicked = e.target?.innerText;
        let displayValue = this.state.displayVal;

        /* number key pressed */
        if (!isNaN(keyClicked)) {
            if (typeof this.state.operandL === 'undefined') {
                /* start defining left-hand operand */
                this.setState({ displayVal: keyClicked, operandL: parseFloat(keyClicked)  });
            } else if (typeof this.state.operator === 'undefined') {
                /* continue defining left-hand operand */
                let newVal = displayValue + keyClicked;
                this.setState({ displayVal: newVal, operandL: parseFloat(newVal) });
            } else if (typeof this.state.operandR === 'undefined') {
                /* start defining right-hand operand */
                this.setState({ displayVal: keyClicked, operandR: parseFloat(keyClicked) });
            } else {
                /* continue defining right-hand operand */
                let newVal = displayValue + keyClicked;
                this.setState({ displayVal: newVal, operandR: parseFloat(newVal) });
            }
        }

        /* . key pressed */
        if (keyClicked === '.') {
            if (this.state.displayVal.length === 1 ||
                (this.state.displayVal.length === 2 && this.state.displayVal[0] === '-')) {
                this.setState({displayVal: displayValue + '.'});
            }
        }

        /* +/- key pressed */
        if (keyClicked === '+/-' && displayValue !== '0') {
            if (displayValue[0] === '-') {
                this.setState({ displayVal: displayValue.slice(1) });
            } else {
                this.setState({ displayVal: '-' + displayValue });
            }
        }

        /* + key pressed */
        if (keyClicked === '*' || keyClicked === '/' || keyClicked === '+' || keyClicked === '-') {
            if (typeof this.state.operandL !== 'undefined' && typeof this.state.operandR !== 'undefined') {
                /* treat this like an equals operation that doesn't reset things */
                let result = 0;
                switch (this.state.operator) {
                    case '*':   result = this.state.operandL * this.state.operandR;
                                break;

                    case '/':   result = this.state.operandL / this.state.operandR;
                                break;

                    case '+':   result = this.state.operandL + this.state.operandR;
                                break;

                    case '-':   result = this.state.operandL - this.state.operandR;
                                break;
                }

                let displayResult = result.toString();
                if (result % 1 !== 0 && displayResult.length - displayResult.indexOf('.') > 10) {
                    displayResult = result.toFixed(10);
                }

                this.setState({
                    displayVal: displayResult,
                    operandL: result,
                    operandR: undefined,
                    operator: keyClicked
                });
            } else {
                this.setState({
                    /* NOTE: by using displayValue, we allow operations on
                        the results of '=' */
                    operandL: parseFloat(displayValue),
                    operator: keyClicked
                });
            }
        }

        /* % key pressed */
        if (keyClicked === '%') {
            if (typeof this.state.operandL !== 'undefined' &&
                typeof this.state.operator !== 'undefined' &&
                typeof this.state.operandR !== 'undefined') {
                let newVal = this.state.operandL * this.state.operandR / 100;

                let displayResult = newVal.toString();
                if (newVal % 1 !== 0 && displayResult.length - displayResult.indexOf('.') > 10) {
                    displayResult = newVal.toFixed(10);
                }

                this.setState({
                    displayVal: displayResult,
                    operandR: newVal
                });
            }
        }

        /* = key pressed */
        if (keyClicked === '=') {
            if (typeof this.state.operandL !== 'undefined' && typeof this.state.operandR !== 'undefined') {
                if (this.state.operator === '*' || this.state.operator === '/' ||
                    this.state.operator === '+' || this.state.operator === '-') {
                    let result = 0;
                    switch (this.state.operator) {
                        case '*':   result = this.state.operandL * this.state.operandR;
                                    break;

                        case '/':   result = this.state.operandL / this.state.operandR;
                                    break;

                        case '+':   result = this.state.operandL + this.state.operandR;
                                    break;

                        case '-':   result = this.state.operandL - this.state.operandR;
                                    break;
                    }

                    let displayResult = result.toString();
                    if (result % 1 !== 0 && displayResult.length - displayResult.indexOf('.') > 10) {
                        displayResult = result.toFixed(10);
                    }

                    this.setState({
                        displayVal: displayResult,
                        operandL: undefined,
                        operandR: undefined,
                        operator: undefined
                    });
                }
            }
        }

        /* clear key pressed */
        if (keyClicked === 'AC') {
            this.setState({
                displayVal: '0',
                operandL: undefined,
                operandR: undefined,
                operator: undefined
            });
        }
    }

    render() {
        return (
          <div id='calculator-container'>
            <div id='calculator-display'>
              <h1 id='calculator-display-text'>{ this.state.displayVal }</h1>
            </div>

            <div id='calculator-keypad'>
              <div className='calculator-keypad-row'>
                <KeypadKey label='AC' kind='number' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='+/-' kind='number' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='%' kind='number' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='/' kind='end' onClick={this.onClick}></KeypadKey>
              </div>

              <div className='calculator-keypad-row'>
                <KeypadKey label='7' kind='number' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='8' kind='number' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='9' kind='number' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='*' kind='end' onClick={this.onClick}></KeypadKey>
              </div>

              <div className='calculator-keypad-row'>
                <KeypadKey label='4' kind='number' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='5' kind='number' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='6' kind='number' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='-' kind='end' onClick={this.onClick}></KeypadKey>
              </div>

              <div className='calculator-keypad-row'>
                <KeypadKey label='1' kind='number' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='2' kind='number' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='3' kind='number' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='+' kind='end' onClick={this.onClick}></KeypadKey>
              </div>

              <div className='calculator-keypad-row'>
                <KeypadKey label='0' kind='zero' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='.' kind='number' onClick={this.onClick}></KeypadKey>
                <KeypadKey label='=' kind='end' onClick={this.onClick}></KeypadKey>
              </div>
            </div>
          </div>
        );
    }
}

/* --- "Main" --- */
if (typeof window !== 'undefined') {
    const appContainer = document.getElementById('app');
    const reactRoot = createRoot(appContainer);
    reactRoot.render(<App />, );
}

export default App;
