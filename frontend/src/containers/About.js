import React, { useState, useEffect, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import House from '../assets/images/house.jpg'

const About = () => {
    const [topSeller, setTopSeller] = useState([])
    const [realtors, setRealtors] = useState([])

    useEffect(() => {
        axios.defaults.headers = {
            "Content-Type": "application/json"
        }

        const getTopSeller = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/realtors/topseller')
                setTopSeller(res.data)
            }
            catch (err) {
                //
            }
        }

        getTopSeller()

    }, [])

    useEffect(() => {
        axios.defaults.headers = {
            "Content-Type": "application/json"
        }

        const getRealtors = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/realtors/')
                setRealtors(res.data)
            }
            catch (err) {
                //
            }
        }

        getRealtors()

    }, [])

    const getAllRealtors = () => {
        let allRealtors = []
        let results = []

        realtors.map(realtor => {
            return allRealtors.push(
                <Fragment key={realtor.id}>
                    <div className='about__display'>
                        <img className='about__display__realtors' src={realtor.photo} alt='' />
                    </div>
                    <h3 className='about__realtor'>{realtor.name}</h3>
                    <p className='about__contact'>{realtor.phone}</p>
                    <p className='about__contact'>{realtor.email}</p>
                    <p className='about__about'>{realtor.description}</p>
                </Fragment>
            )
        })

        for (let i = 0; i < realtors.length; i += 3) {
            results.push(
                <div key={i} className='row'>
                    <div className='col-1-of-3'>
                        {allRealtors[i]}
                    </div>
                    <div className='col-1-of-3'>
                        {allRealtors[i + 1] ? allRealtors[i + 1] : null}
                    </div>
                    <div className='col-1-of-3'>
                        {allRealtors[i + 2] ? allRealtors[i + 2] : null}
                    </div>
                </div>
            )
        }

        return results
    }

    const getTopSeller = () => {
        let result = []

        topSeller.map(seller => {
            return result.push(
                <Fragment key={seller.id}>
                    <div className='about__display'>
                        <img className='about__display__image' src={seller.photo} alt='' />
                    </div>
                    <h3 className='about__topseller'>Top Seller:</h3>
                    <p className='about__realtor'>{seller.name}</p>
                    <p className='about__contact'>{seller.phone}</p>
                    <p className='about__contact'>{seller.email}</p>
                    <p className='about__about'>{seller.description}</p>
                </Fragment>
            )
        })

        return result
    }

    return (
        <div className='about'>
            <Helmet>
                <title>Real Estate - About</title>
                <meta
                    name='description'
                    content='About us'
                />
            </Helmet>
            <header className='about__header'>
                <h1 className='about__heading'>About Real Estate</h1>
            </header>
            <section className='about__info'>
                <div className='row'>
                    <div className='col-3-of-4'>
                        <h2 className='about__subheading'>We find the perfect home for you.</h2>
                        <p className='about__paragraph'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida tincidunt urna ut consequat.
                            Interdum et malesuada fames ac ante ipsum primis in faucibus.
                            Suspendisse vehicula mollis elit quis mollis. Etiam lacinia lacus a nibh pretium, nec laoreet est dictum.
                            Nam tincidunt volutpat nulla ut semper. Nam congue fringilla magna ac imperdiet. Sed condimentum dolor ligula,
                            id convallis metus volutpat elementum.
                        </p>
                        <div className='about__display'>
                            <img className='about__display__image' src={House} alt='' />
                        </div>
                        <p className='about__paragraph'>
                            Duis sed tempor ex. Quisque iaculis, odio sed consequat iaculis, magna purus imperdiet ipsum,
                            a ultricies nunc nibh consequat felis. Integer vitae ligula luctus, aliquet odio ut, rutrum felis.
                            Donec urna justo, posuere at mattis id, viverra vel libero. Class aptent taciti sociosqu ad litora torquent
                            per conubia nostra, per inceptos himenaeos. Suspendisse tincidunt nibh vel elementum rhoncus. Aliquam erat
                            volutpat. Suspendisse potenti. Nullam in lectus at ipsum aliquam fermentum eu nec tellus.
                            Vestibulum fringilla ac felis quis mollis. Nam et leo vel nisl interdum auctor.
                            Phasellus pretium placerat ipsum at vestibulum. Fusce tortor nulla, finibus nec mi vitae, cursus vehicula tortor.
                            Pellentesque nec lectus porta neque varius consectetur a ac diam. Mauris pharetra ipsum ut lacus eleifend,
                            sed finibus augue maximus. Pellentesque facilisis libero at eros vehicula, id vestibulum dui ultrices.
                            Nulla sit amet ornare diam. In metus velit, gravida vitae laoreet ut, porttitor ac urna.
                        </p>
                    </div>
                    <div className='col-1-of-4'>
                        {getTopSeller()}
                    </div>
                </div>
            </section>
            <section className='about__team'>
                <div className='row'>
                    <h2 className='about__subheading'>Meet our Awsome Team!</h2>
                </div>
                {getAllRealtors()}
            </section>
        </div>
    )
}

export default About;