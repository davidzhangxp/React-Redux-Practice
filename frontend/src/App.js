import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import { signout } from "./actions/userActions.js";
import { CartScreen } from "./screens/CartScreen.js";
import { HomeScreen } from "./screens/HomeScreen.js";
import { OrderDetailScreen } from "./screens/OrderDetailScreen.js";
import { OrderHistoryScreen } from "./screens/OrderHistoryScreen.js";
import { PaymentScreen } from "./screens/PaymentScreen.js";
import { PlaceorderScreen } from "./screens/PlaceorderScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import { RegisterScreen } from "./screens/RegisterScreen.js";
import { ShippingScreen } from "./screens/ShippingScreen.js";
import { SigninScreen } from "./screens/SigninScreen.js";
import { UserProfileScreen } from "./screens/UserProfileScreen.js";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const user = useSelector((state) => state.userSignin);
  const { userInfo } = user;
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/" className="brand">
              Amazona
            </Link>
          </div>
          <div>
            <Link to="/cart/home">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <div className="dropdown">
              {userInfo ? (
                <Link to="#">
                  {userInfo.name}
                  <i className="fa fa-caret-down"></i>
                </Link>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
              {userInfo && (
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/product/:id" element={<ProductScreen />}></Route>
            <Route path="/cart/:id" element={<CartScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/shipping" element={<ShippingScreen />}></Route>
            <Route path="/payment" element={<PaymentScreen />}></Route>
            <Route
              path="/placeorder"
              element={
                !userInfo ? <Navigate to="/signin" /> : <PlaceorderScreen />
              }
            ></Route>
            <Route
              path="/orders/:id"
              element={
                !userInfo ? <Navigate to="/signin" /> : <OrderDetailScreen />
              }
            ></Route>
            <Route
              path="/orderhistory"
              element={
                !userInfo ? <Navigate to="/signin" /> : <OrderHistoryScreen />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                !userInfo ? <Navigate to="/signin" /> : <UserProfileScreen />
              }
            ></Route>
          </Routes>
        </main>

        <footer className="row center">copyright reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
