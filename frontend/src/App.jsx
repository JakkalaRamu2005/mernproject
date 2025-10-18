import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./components/AuthContext";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";
import About from "./components/About/About"
import Cart from "./components/Cart/Cart"
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";


function App() {
  return (
   
      <AuthProvider>
       
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="products" element={<Products />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </BrowserRouter>
      </AuthProvider>
   

  );
}

export default App;
