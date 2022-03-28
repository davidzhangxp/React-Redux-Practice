import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Product } from '../components/Product.js';
// import axios from 'axios';
import { MessageBox } from '../components/MessageBox.js';
import { LoadingBox } from '../components/LoadingBox.js';
import { listProductActions } from '../actions/productActions.js';



export const HomeScreen = () => {
    // const [products,setProducts] = useState([])
    // const [loading,setLoading] = useState(false)
    // const [error,setError] = useState(false)

    const productList = useSelector(state => state.productList)
    const { products, error, loading } = productList
    const dispatch = useDispatch()
    useEffect(() => {
        // try {
        //     setLoading(true)
        //     const fetchData = async()=>{
        //         const {data} = await axios.get('/api/products')

        //         setProducts(data)
        //     }
        //     fetchData()    
        //     setLoading(false)
        // } catch (error) {
        //     setError(error.message)
        //     setLoading(false)
        // }
        dispatch(listProductActions())
    }, [dispatch])
    return (
        <div>
            {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : (
                <div className="row center">
                    {products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}
