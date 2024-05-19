
import React from 'react';

const Input = ({
    type = 'text',
    placeholder,
    label,
    error,
    className,
    value,
    mandatory,
    defaultValue = '',
    disabled = false,
    maxLength = '',
    minLength = '',
    capitalise = false,
    onChange = () => false,
    onKeyDown = () => false,
    info = false,
    showUrlTag = false,
    rest,
    tagInfoStart = 'https://',
    tagInfoEnd = '.in',
}) => (
    <div className="text-left">
        {label && (
            <label className="text-xs font-medium mb-2 inline-block text-foreground capitalize">
                {label} {mandatory ? <span className="text-red">*</span> : ''}
            </label>
        )}
        <div className="relative">
            {showUrlTag && (
                <span className="border bg-gray-200 p-2 z-50 absolute left-0 top-0 flex justify-center items-center rounded-l-md font-medium text-xs h-9">
                    {tagInfoStart}
                </span>
            )}
            <input
                placeholder={placeholder}
                className={`focus:outline-none px-3 font-medium h-9 text-xs rounded-md placeholder:text-gray-400 placeholder:font-normal w-full focus:border focus:border-primary text-black transition border border-light-gray ${className} ${
                    disabled ? 'bg-disabled-gray' : 'bg-white'
                } ${capitalise && 'capitalize'}`}
                maxLength={maxLength}
                minLength={minLength}
                disabled={disabled}
                type={type}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onInput={(event) => {
                    // eslint-disable-next-line no-param-reassign
                    if (event.target.value.trim() === '')
                        event.target.value = '';
                }}
                {...rest}
            />
            {showUrlTag && (
                <span className="border bg-gray-200 p-2 absolute right-0 top-0 flex justify-center items-center rounded-r-md font-medium text-xs h-9">
                    {tagInfoEnd}
                </span>
            )}
        </div>
        {error && <p className="text-xs font-medium mt-1 text-red">{error}</p>}
        {info && <p className="text-xs font-medium mt-1 text-black">{info}</p>}
    </div>
);

export default Input;
