import './css/index.css';


import React from 'react';
import { createRoot, } from 'react-dom/client';


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
        /* build HTML element class strings */
        let keypadRowClasses = [
            'keypad-row',
            'row',
            'border-top',
            'gx-0', 
            'mw-100'
        ].join(' ');

        let keyAlignClasses = [
            'd-flex',
            'align-items-center', 
            'justify-content-center'
        ].join(' ');

        let keyClasses = ['key', 'col', keyAlignClasses, 'border-end'].join(' ');
        let keyEndClasses = ['key-end', 'col', keyAlignClasses].join(' ');
        let keyZeroClasses = ['key', 'col-6', keyAlignClasses, 'border-end'].join(' ');
        
        /* JSX */
        return (
            <div className='container-fluid h-100 p-0'>
                <div id='display' className='d-flex align-items-end justify-content-end'>
                    <h1 id='display-text' className='display-2 m-3'>{this.state.displayVal}</h1>
                </div>

                <div id='keypad'>
                    <div className={keypadRowClasses}>
                        <div className={keyClasses} onClick={this.onClick}>
                            <h3>AC</h3>
                        </div>

                        <div className={keyClasses} onClick={this.onClick}>
                            <h3>+/-</h3>
                        </div>
                        
                        <div className={keyClasses} onClick={this.onClick}>
                            <h3>%</h3>
                        </div>
                        
                        <div className={keyEndClasses} onClick={this.onClick}>
                            <h3>/</h3>
                        </div>
                    </div>

                    <div className={keypadRowClasses}>
                        <div className={keyClasses} onClick={this.onClick}>
                            <h3>7</h3>
                        </div>

                        <div className={keyClasses} onClick={this.onClick}>
                            <h3>8</h3>
                        </div>
                        
                        <div className={keyClasses} onClick={this.onClick}>
                            <h3>9</h3>
                        </div>
                        
                        <div className={keyEndClasses} onClick={this.onClick}>
                            <h3>*</h3>
                        </div>
                    </div>

                    <div className={keypadRowClasses}>
                        <div className={keyClasses} onClick={this.onClick}>
                            <h3>4</h3>
                        </div>
                        
                        <div className={keyClasses} onClick={this.onClick}>
                            <h3>5</h3>
                        </div>
                        
                        <div className={keyClasses} onClick={this.onClick}>
                            <h3>6</h3>
                        </div>
                        
                        <div className={keyEndClasses} onClick={this.onClick}>
                            <h3>-</h3>
                        </div>
                    </div>

                    <div className={keypadRowClasses}>
                        <div className={keyClasses} onClick={this.onClick}>
                            <h3>1</h3>
                        </div>
                        
                        <div className={keyClasses} onClick={this.onClick}>
                            <h3>2</h3>
                        </div>
                        
                        <div className={keyClasses} onClick={this.onClick}>
                            <h3>3</h3>
                        </div>
                        
                        <div className={keyEndClasses} onClick={this.onClick}>
                            <h3>+</h3>
                        </div>
                    </div>

                    <div className={keypadRowClasses}>
                        <div className={keyZeroClasses} onClick={this.onClick}>
                            <h3>0</h3>
                        </div>
                        
                        <div className={keyClasses} onClick={this.onClick}>
                            <h3>.</h3>
                        </div>
                        
                        <div className={keyEndClasses} onClick={this.onClick}>
                            <h3>=</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


if (typeof window !== 'undefined') {
    const appContainer = document.getElementById('app');
    const reactRoot = createRoot(appContainer);
    reactRoot.render(<App />, );
}
