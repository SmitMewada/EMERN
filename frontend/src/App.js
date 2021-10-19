import "./App.css";
import Header from "./component/layout/header/Header.js";
import Footer from "./component/layout/footer/Footer.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Home from "./component/Home/home.js"
import ProductDetails from "./component/product/ProductDetails";
import Products from "./component/product/Products";
import Search from "./component/product/Search";

function App() {
React.useEffect(()=> {
  WebFont.load({
    google: {
      families: ["Roboto", "Droid Sans", "Chilanka"]
    }
  })
}, []);

  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home}/>
      <Route exact path="/products" component={Products}/>
      <Route exact path="/Search" component={Search}/>
      <Route exact path="/product/:id" component={ProductDetails}/>
      <Route exact path="/products/:keyword" component={Products}/>
      <Footer/>
    </Router>
  );
}

export default App;
