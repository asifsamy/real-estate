import React from 'react'

function TextError(props) {
    return (
        <div className='error'>
            <span>&#9888; </span>
            {props.children}
        </div>
    )
}

export default TextError
