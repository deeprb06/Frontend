import cx from 'classnames';
import React from 'react';

const Button = ({
    className = '',
    title,
    icon,
    kind = 'primary',
    hoverKind = 'white',
    darkHoverKind = 'dark-primary',
    labelFirst = false,
    loading = false,
    textSize = 'xs',
    onClick,
    outline = false,
    disabled = false,
    ...other
}) => {
    const classes = cx(
        className,
        `inline-flex items-center justify-center gap-1.5 rounded-md py-2.5 px-4 transition text-${textSize}`,
        {
            [`text-${hoverKind} bg-${kind} hover:bg-transparent border border-${kind} hover:border-${kind} hover:text-${kind}`]:
                outline,
        },
        {
            [`text-${hoverKind} bg-${kind} hover:bg-${darkHoverKind} hover:text-${hoverKind}`]:
                !outline,
        },
        `${disabled ? 'cursor-not-allowed !bg-[#666]' : ''}`
    );
    return (

        <button
            disabled={disabled || loading}
            className={classes}
            onClick={onClick}
            {...other}
        >
            {!labelFirst && icon}
            {loading && (
                <svg
                    className={`inline-block animate-spin h-30 w-30 ${className}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    {...other}
                >
                    <path
                        style={{ fill: kind }}
                        d="M5.5,12a1,1,0,1,1,1,1A1,1,0,0,1,5.5,12ZM1.75,10.5A1.25,1.25,0,1,1,3,11.75,1.25,1.25,0,0,1,1.75,10.5Zm7.531.031a.75.75,0,1,1,.75.75A.75.75,0,0,1,9.281,10.531ZM0,7A1.5,1.5,0,1,1,1.5,8.5,1.5,1.5,0,0,1,0,7ZM11,7a.5.5,0,1,1,.5.5A.5.5,0,0,1,11,7ZM1.875,4.637a1.62,1.62,0,0,1,0-2.275,1.582,1.582,0,0,1,2.253,0,1.62,1.62,0,0,1,0,2.275,1.582,1.582,0,0,1-2.253,0ZM4.5,2a2,2,0,1,1,2,2A2,2,0,0,1,4.5,2ZM9.75,3.5a.25.25,0,1,1,.25.25A.25.25,0,0,1,9.75,3.5Z"
                    />
                </svg>
            )}
            {title}
            {labelFirst && icon}
        </button>
    );
};

export default Button;
