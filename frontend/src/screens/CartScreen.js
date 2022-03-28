import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addToCart, removeCartItem } from '../actions/cartActions'
import { MessageBox } from '../components/MessageBox'

export const CartScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  // const location = useLocation()
  const dispatch = useDispatch()
  // const qty = location.search.split('=')[1] ? Number(location.search.split('=')[1]) : 1
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  useEffect(() => {
    if (id) {
      
      console.log(id)
    } else {
      console.log("id is not exist")
    }

  }, [id])

  const deleteItemHandle = (id) =>{
    dispatch(removeCartItem(id))
  }

  const checkoutHandle = ()=>{
    navigate('/signin?redirect=shipping')
  }
  return (
    <div>
      {cartItems.length === 0 ? (<MessageBox variant='error'>Cart is empty, <Link to="/">go shopping</Link></MessageBox>) : (
        <div className='row top' >
          <div className='col-2'>
            <h2>Shopping Cart</h2>
            <ul>
              {cartItems.map(item => (
                <li key={item.product}>
                  <div className='row'>
                    <div><img className='small' src={item.image} alt={item.name} /></div>
                    <div className='min-30'><Link to={`/product/${item.product}`}>{item.name}</Link></div>
                    <div>
                      <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))}
                      </select>
                    </div>
                    <div>${item.price}</div>
                    <div><button type='button' onClick={()=>deleteItemHandle(item._id)}>Delete</button></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-1'>
            <div className='card card-body'>
              <ul>
                <li>
                    <h2> Total Items: {cartItems.reduce((a,c)=>a+c.qty,0)} Items  </h2>     
                </li>
                <li>
                <h2> Total Price: $ {cartItems.reduce((a,c)=>a+c.price*c.qty,0)} </h2>
                </li>
                <li>
                <button type='button' onClick={checkoutHandle} className="primary block">Continue To Check Out</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
      )
      }
