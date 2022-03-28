import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import { productDetailsActions } from '../actions/productActions'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import Rating from '../components/Rating'


export default function ProductScreen(props) {
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    const { id } = useParams()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(productDetailsActions(id))
    }, [dispatch, id])

    const AddToCartHandle = ()=>{
        dispatch(addToCart(id, qty))
        navigate(`/cart/${id}?qty=${qty}`)
        
    }
    return (
        <div>
            {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : (
                <div>
                    <Link to="/">
                        Back to home</Link>
                    <div className='row top'>
                        <div className='col-2'>
                            <img className="large" src={product.image} alt={product.name} />
                        </div>
                        <div className='col-1'>
                            <ul>
                                <li><h2>{product.name}</h2></li>
                                <li>
                                    <Rating rating={product.rating} numReview={product.numReviews} />
                                </li>
                                <li>
                                    Description:{product.description}
                                </li>
                            </ul>
                        </div>
                        <div className='col-1'>
                            <div className='card card-body'>
                                <ul>
                                    <li>
                                        <div className='row'>
                                            <div>Price</div>
                                            <div>${product.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div>Status:</div>
                                            <div>{product.countInStock > 0 ? <span className='success'>In Stock</span> : <span className='error'>Unavailable</span>}</div>
                                        </div>
                                    </li>
                                    {product.countInStock > 0 && <div>
                                        <li>
                                            <div className='row'>
                                                <div>Qty:</div>
                                                <div>
                                                    <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button onClick={AddToCartHandle} className='primary block'>Add to cart</button>
                                        </li>
                                    </div>}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}
