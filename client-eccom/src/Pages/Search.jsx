import React from 'react'
import { useSearch } from '../Context/search'
import Layout from '../components/Layout/Layout';

const Search = () => {
    const [search] = useSearch();
    return (
        <Layout>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Result</h1>
                    <h6>{search?.results.length < 1 ? "No Products Founds" : `Found ${search?.results.length}`}</h6>
                    <div className="row gx-4 gy-4">
                        {search?.results.map((product) => (
                            <div className="col-md-4 col-sm-6" key={product._id}>
                                <div className="card h-100 shadow-sm border-0">
                                    <img
                                        src={`/api/v1/product/product-photo/${product._id}`}
                                        alt={product.name}
                                        className="card-img-top rounded-top"
                                        style={{
                                            height: '250px',
                                            objectFit: 'cover',
                                            width: '100%',
                                        }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-dark fw-bold">{product.name}</h5>
                                        <p className="card-text text-muted">
                                            {product.description.length > 50
                                                ? `${product.description.substring(0, 50)}...`
                                                : product.description}
                                        </p>
                                        <p className="card-text fw-bold">$ {product.price}</p>
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-primary btn-sm">More Details</button>
                                            <button className="btn btn-success btn-sm">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {search?.results === 0 && (
                            <div className="col-12 text-center">
                                <p className="text-muted">No products found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search
