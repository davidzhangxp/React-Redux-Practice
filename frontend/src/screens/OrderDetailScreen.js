import * as axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsOrder, payOrder } from "../actions/orderActions";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

export const OrderDetailScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  //only when loading is false ,order is not empty

  const orderPay = useSelector((state) => state.orderPay);
  const { loadingPay, successPay, errorPay } = orderPay;
  //add paypal script into document body
  //set script with paypal src
  const addPayPalScript = async () => {
    const { data } = await axios.get("/api/config/paypal");
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    if (!order || successPay || (order && order._id !== id)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(id));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [id, dispatch, order, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <div>
          <h1> Order Id: {order._id}</h1>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h1>Shipping</h1>
                    <p>
                      <strong>Name:</strong> {order.shippingAddress.fullName}
                      <br />
                      <strong>Address</strong> {order.shippingAddress.address},
                      {order.shippingAddress.city},{order.shippingAddress.state}
                      ,{order.shippingAddress.postalCode}
                    </p>
                    <MessageBox
                      variant={order.isDelivered ? "success" : "error"}
                    >
                      {order.isDelivered
                        ? `Delivered At ${order.deliveredAt}`
                        : "Not Delivered"}
                    </MessageBox>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h1>Payment</h1>
                    <p>
                      <strong>paymentMethod:</strong> {order.paymentMethod}
                    </p>
                    <MessageBox variant={order.isPaid ? "success" : "error"}>
                      {order.isPaid ? `Paid At ${order.paidAt}` : "Not Paid"}
                    </MessageBox>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h1>Order Items</h1>
                    <ul>
                      {order.orderItems.map((item) => (
                        <li key={item.product}>
                          <div className="row">
                            <div>
                              <img
                                className="small"
                                src={item.image}
                                alt={item.name}
                              />
                            </div>
                            <div className="min-30">{item.name}</div>
                            <div>
                              {" "}
                              {item.qty} X ${item.price} = $
                              {item.qty * item.price}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Items Price:</div>
                      <div>${order.itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping Price:</div>
                      <div>${order.shippingPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax Price:</div>
                      <div>${order.taxPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>total Price:</div>
                      <div>${order.totalPrice.toFixed(2)}</div>
                    </div>
                  </li>

                  {!order.isPaid && (
                    <li>
                      {!sdkReady ? (
                        <LoadingBox></LoadingBox>
                      ) : (
                        <div>
                          {errorPay && (
                            <MessageBox variant="error">{errorPay}</MessageBox>
                          )}
                          {loadingPay && <LoadingBox></LoadingBox>}
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          ></PayPalButton>
                        </div>
                      )}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
