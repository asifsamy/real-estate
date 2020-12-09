import React from 'react'

import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../actions/auth'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/FormikControl'

const Login = ({ login, isAuthenticated }) => {

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid Email Format!').required('Required!'),
        password: Yup.string().required('Required!')
    })

    const onSubmit = values => {
        //e.preventDefault()

        login(values.email, values.password)
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className='auth'>
            <Helmet>
                <title>Real Estate - Login</title>
                <meta
                    name='description'
                    content='login page'
                />
            </Helmet>
            <h1 className='auth__title'>Sign In</h1>
            <p className='auth__lead'>Sign into your Account</p>
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
                                //control='chakrainput'
                                type='email'
                                //label='Email'
                                placeholder='Email'
                                name='email'
                                className='auth__form__input'
                            />
                            <FormikControl
                                control='input'
                                //control='chakrainput'
                                type='password'
                                //label='Password'
                                placeholder='Password'
                                name='password'
                                minLength='6'
                                className='auth__form__input'
                            />
                            <button
                                className='auth__form__button'
                                type='submit'
                                disabled={!formik.isValid}>
                                Submit
                            </button>
                        </Form>
                    }
                }

            </Formik>
            <p className='auth__authtext'>
                Don't have an account? <Link className='auth__authtext__link' to='/signup'>Sign Up</Link>
            </p>
        </div>
    )


}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)

