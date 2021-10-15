import React, { Fragment } from 'react';
import { CgMouse } from "react-icons/all";
import MetaData from '../layout/MetaData';
import "./home.css";
import Product from './Product';

const product = {
    name: "Blue Tshirt",
    images: [{url: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/1174116/2016/2/10/11455100882246-Roadster-Grey-Melange-Printed-T-shirt-181455100881746-1.jpg"}],
    price: "3000",
    _id: "smit" 
}

const Home = () => {
    return <Fragment>
        <MetaData title="Premium Merch." />
        <div className="banner">
            <p>Welcome to <span className="company">Premium Merch.</span></p>
            <h1>Browse Amazing merchandise below</h1>

            <a href="#container">
                <button>
                    Scroll <CgMouse/>
                </button>
            </a>
        </div>

        <h2 className="homeHeading">Featured Products</h2>
        

        <div className="container" id="container">
            <Product product={product}></Product>
            <Product product={product}></Product>
            <Product product={product}></Product>
            <Product product={product}></Product>
            <Product product={product}></Product>
            <Product product={product}></Product>
            <Product product={product}></Product>
            <Product product={product}></Product>

        </div>
    </Fragment>
}

export default Home
