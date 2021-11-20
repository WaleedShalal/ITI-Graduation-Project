import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Parts/Header/Header";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import Home from "./components/Pages/Home/Home";
import Profile from "./components/Pages/Profile/Profile";
import Products from "./components/Pages/Products/Products";
import Cart from "./components/Pages/Cart/Cart";
import Admin from "./components/Pages/Admin/Admin";
import NotFound from "./components/Pages/NotFound/NotFound";
import ProductDetails from "./components/Pages/ProductDetails/ProductDetails";
import ProductForm from "./components/Pages/ProductForm/ProductForm";
import Messages from "./components/Pages/Messages/MessagesView/Messages";
import PrivateRoute from "./context/guard";
import { useContext, useState, useEffect } from "react";
import { db } from "../src/Firebase/Firebase";
import { AuthContext } from "../src/context/Auth";
import "./App.scss";

function App() {
  const initialValues = {
    id: "",
    user: {
      address: [],
      birthDate: "",
      confirmPassword: "",
      email: "",
      firstName: "",
      followedHashtags: " ",
      gender: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      subscribeUs: false,
      website: "",
    },
  };
  const [getUser, setUsers] = useState(initialValues);
  const { user } = useContext(AuthContext);
  
  const [name, setName] = useState('')
  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.id === user.uid) {
          let data = [{ id: doc.id, user: doc.data() }];  
          let getUser = data.filter(function (x) {
            return x !== undefined;
          });
           setUsers(...getUser);
        }
        return getUser;
      });
    });
    setName(`${getUser.user.firstName} ${getUser.user.lastName}`);
  }, []);
 
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home userName={name}/>} />
          <Route exact path="home" element={<Navigate to="/" />} />
          <Route
            exact
            path="profile"
            element={
              <Profile
                userName={name}
              />
            }
          />
          <Route path="cart" element={<Cart />} />
          <Route path="admin" element={<Admin />} />
          <Route path="/productform/:id" element={<ProductForm />} />
          <Route path="products" element={<Products />} />
          <Route
            path="products/productdetails/:id"
            element={<ProductDetails />}
          />
          <Route path="cart/productdetails/:id" element={<ProductDetails />} />
          <Route path="/messages" element={<Messages />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
