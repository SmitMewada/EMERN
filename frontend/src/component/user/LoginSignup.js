import React, { Fragment, useState, useRef } from "react";
import { Link } from "react-router-dom";
import MailOutLineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import "./loginSignup.css";

const LoginSignup = () => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const loginSubmit = () => {
        console.log("Form submitted!")
    }

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classlist.add("shitToNeutral");
            switcherTab.current.classlist.remove("shitToRight");

            registerTab.current.classlist.remove("shiftToNeutralForm");
            
            loginTab.current.classlist.remove("shitToLeft");
        } 

        if (tab === "register") {
            switcherTab.current.classlist.remove("shitToNeutral");
            switcherTab.current.classlist.add("shitToRight");

            registerTab.current.classlist.add("shiftToNeutralForm");
            
            loginTab.current.classlist.add("shitToLeft");
        }

    }

  return (
    <Fragment>
      <div className="loginSignupContainer">
        <div className="loginSignupBox">
          <div>
            <div className="login_signup_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>Login</p>
              <p onClick={(e) => switchTabs(e, "register")}>Register</p>
            </div>
            <button ref={switcherTab}></button>

            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <MailOutLineIcon />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div className="loginPassword">
                  <LockOpenIcon/>
                  <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <Link to="/password/forgot">Forgot password</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignup;
