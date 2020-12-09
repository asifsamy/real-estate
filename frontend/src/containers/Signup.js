import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { setAlert } from '../actions/alert'
import { signup } from '../actions/auth'
import PropTypes from 'prop-types'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/FormikControl'

const SignUp = ({ setAlert, signup, isAuthenticated }) => {

    const initialValues = {
        name: '',
        email: '',
        password: '',
        password2: ''
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Required!'),
        email: Yup.string().email('Invalid Email Format!').required('Required!'),
        password: Yup.string().required('Required!'),
        password2: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required('Required!')
    })

    const onSubmit = values => {

        console.log('Form data', values)

        const { name, email, password, password2 } = values

        signup({ name, email, password, password2 })
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className='auth'>
            <Helmet>
                <title>Realest Estate - Sign Up</title>
                <meta
                    name='description'
                    content='sign up page'
                />
            </Helmet>
            <h1 className='auth__title'>Sign Up</h1>
            <p className='auth__lead'>Create your Account</p>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    formik => {
                        return <Form className='auth__form'>
                            <FormikControl
                                control='input'
                                type='text'
                                placeholder='Name'
                                name='name'
                                className='auth__form__input'
                            />
                            <FormikControl
                                control='input'
                                type='email'
                                placeholder='Email'
                                name='email'
                                className='auth__form__input'
                            />
                            <FormikControl
                                control='input'
                                type='password'
                                placeholder='Password'
                                name='password'
                                className='auth__form__input'
                            />
                            <FormikControl
                                control='input'
                                type='password'
                                placeholder='Confirm Password'
                                name='password2'
                                className='auth__form__input'
                            />
                            <button
                                type='submit'
                                className='auth__form__button'
                                disabled={!formik.isValid}>
                                Register
                            </button>
                        </Form>
                    }
                }
            </Formik>
            <p className='auth__authtext'>
                Already have an account? <Link className='auth__authtext__link' to='/login'>Login</Link>
            </p>
        </div>
    )

}

SignUp.propTypes = {
    setAlert: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, signup })(SignUp);