import React from 'react';
import PropTypes from 'prop-types';

/* Constants */
const KINDS_KEYPAD_KEY = ['end','number','zero'];

function KeypadKey({ label, kind, onClick, }) {
    const keyClasses = KINDS_KEYPAD_KEY.includes(kind) ? `calculator-key calculator-key-${kind}` : 'calculator-key';

    return (
      <button className={keyClasses} onClick={onClick}>
        <h3>{ label }</h3>
      </button>
    );
}

KeypadKey.propTypes = {
    label: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default KeypadKey;
