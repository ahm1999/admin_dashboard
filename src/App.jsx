import { useEffect, useState } from "react";


import PageHeader from "./components/PageHeader.jsx";
import Home from "./components/pages/home";
import Products from "./components/pages/products";
import Orders from "./components/pages/orders";
import { Route, Routes} from "react-router-dom";
import LogInForm from "./components/loginForm";
import ProductById from "./components/pages/ProductsComponents/ProductById";
import OrderById from "./components/pages/ordersComponents/OrderById.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";
function App() {
  const [isLoggedin, setLoggedin] = useState({ loggedin: false });
  

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("LoggedIn"));

    try {
      if (data.loggedin) {
        setLoggedin(data);
      }
    } catch (error) {
      if (data === null) {
        localStorage.setItem("LoggedIn", JSON.stringify(isLoggedin));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("LoggedIn", JSON.stringify(isLoggedin));
  }, [isLoggedin]);

  if (isLoggedin.loggedin) {
    return (
      <div>
        <PageHeader setLoggedin={setLoggedin} />
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderid" element={<OrderById/>}/>
          
          <Route path="products" element={<Products />} />
          <Route path="/:productid" element={<ProductById/>}/>
          
        </Routes>
      </div>
    );
  } else {
    return <LogInForm  setLoggedin={setLoggedin} />;
  }
}

export default App;
