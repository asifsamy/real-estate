import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Input(props) {
    const { label, name, ...rest } = props
    return (
        <div className='auth__form__group'>
            <label htmlFor={name} className='contact__form__label'>{label}</label><br />
            <Field id={name} name={name} {...rest} />
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Input
