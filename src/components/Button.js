import React from 'react';
import './Button.css';

const STYLES = ['btn--primary', 'btn--outline', 'btn--outlineWhite','btn--outlineRed','btn--outlineGreen'];
const SIZES = ['btn-medium', 'btn--large'];

export const Button = ({
    children,
    type = 'button', // Default type to 'button'
    onClick,
    buttonStyle,
    buttonSize,
}) => {
    // Check if the provided style and size are valid
    const checkButtonStyles = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <button 
            className={`btn ${checkButtonStyles} ${checkButtonSize}`}
            onClick={onClick}
            type={type} // Ensure the type is correctly applied
        >
            {children}
        </button>
        
    );
};
