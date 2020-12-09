import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { connect } from 'react-redux'
import { setAlert } from '../actions/alert'
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/FormikControl'

const Contact = ({ setAlert }) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const initialValues = {
        name: '',
        email: '',
        subject: '',
        message: ''
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Required!'),
        email: Yup.string().email('Invalid Email Format!').required('Required!'),
        subject: Yup.string().required('Required!'),
        message: Yup.string().required('Required!')
    })

    const [loading, setLoading] = useState(false)

    const onSubmit = e => {
        // e.preventDefault()
        // console.log('Form Data', e)
        // console.log('Saved data', JSON.parse(JSON.stringify(e)))

        axios.defaults.headers = {
            "Content-Type": "application/json"
        }

        let name2 = JSON.parse(JSON.stringify(e.name))
        let email2 = JSON.parse(JSON.stringify(e.email))
        let subject2 = JSON.parse(JSON.stringify(e.subject))
        let message2 = JSON.parse(JSON.stringify(e.message))

        setLoading(true)
        axios.post('http://localhost:8000/api/contacts/', { name2, email2, subject2, message2 })
            .then(res => {
                setAlert('Message Sent!', 'success')
                setLoading(false)
                window.scrollTo(0, 0)
            })
            .catch(err => {
                setAlert('Error with Sending Message', 'error')
                setLoading(false);
                window.scrollTo(0, 0);
            })
    }

    return (
        <div className='contact'>
            <Helmet>
                <title>Real Estate - Contact</title>
                <meta
                    name='description'
                    content='Contact us'
                />
            </Helmet>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    formik => {
                        return <Form className='contact__form'>
                            <FormikControl
                                control='input'
                                type='text'
                                label='Name*'
                                name='name'
                                placeholder='Full Name'
                                className='contact__form__input'
                            />
                            <FormikControl
                                control='input'
                                type='email'
                                label='Email*'
                                name='email'
                                placeholder='example@gmail.com'
                                className='contact__form__input'
                            />
                            <FormikControl
                                control='input'
                                type='text'
                                label='Subject*'
                                name='subject'
                                placeholder='Buying home'
                                className='contact__form__input'
                            />
                            <FormikControl
                                control='textarea'
                                label='Message*'
                                name='message'
                                cols='30'
                                rows='10'
                                placeholder='Message'
                                className='contact__form__textarea'
                            />
                            {
                                loading ?
                                    <div className='contact__form__loader'>
                                        <Loader
                                            type="Oval"
                                            color="#424242"
                                            height={50}
                                            width={50}
                                        />
                                    </div> :
                                    <button
                                        className='contact__form__button'
                                        type='submit'
                                        disabled={!formik.isValid}>
                                        Submit
                                    </button>
                            }
                        </Form>
                    }
                }
            </Formik>
        </div>
    )
}

Contact.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Contact)