import React from 'react';
import playStore from "../../../Images/playstore.png";
import appStore from "../../../Images/appstore.png";
import "./footer.css"


const footer = () => {
    return (
        <footer id="Footer">
            <div className="leftFooter">
                <h4>Download our app</h4>
                <img src={playStore} alt="" />
                <img src={appStore} alt="" />
            </div>
            <div className="midFooter">
                <h1>Premium Merch.</h1>
                <p>High quality is our first priority</p>
                <p>Copyright 2021 &copy; Smit Mewada</p>
            </div>
            <div className="rightFooter">
                <h4>Follow us</h4>
                <a href="https://www.instagram.com">Instagram</a><a href="https://www.instagram.com">Twitter</a><a href="https://www.instagram.com">Facebook</a>
            </div>
        </footer>
    )
}

export default footer
