import React from 'react';

const InputFormComponent = ({handleChange, label, ...otherProps}) => {
    return (
        <div className='group'>
            <input className='form-input' autoCapitalize={'words'} onChange={handleChange} {...otherProps}/>
            {
                label ? (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                    {label}
                </label>) : null
            }
        </div>
    );
};

export default InputFormComponent;