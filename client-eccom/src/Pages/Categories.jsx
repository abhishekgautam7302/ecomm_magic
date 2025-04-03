import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={'All categories'}>
            <div className='container'>
                <div className='row'>
                    {categories.map((c) => (
                        <div className='col-md-6' key={c._id}>
                            <button className='text-dark '>
                                <Link to={`/category/${c.slug}`} className='text-dark btn btn-secondry'>
                                    {c.name}
                                </Link>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categories
