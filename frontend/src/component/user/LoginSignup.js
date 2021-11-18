import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MailOutLineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux"
import "./loginSignup.css";
import profile from "./Profile.png"
import { login, signup } from "../../actions/userAction";
import { useAlert } from "react-alert"
import { clearErrors } from "../../actions/productAction";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {error} = useSelector(state => state.user)

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profile);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword))
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    myForm.set("password", password);
    dispatch(signup(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors)
    }
  }, [error, alert, dispatch]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");

      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");

      loginTab.current.classList.add("shiftToLeft");
    }
  };

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
                <LockOpenIcon />
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

            <form
              action=""
              className="signupForm"
              ref={registerTab}
              onSubmit={registerSubmit}
              encType="multipart/form-data"
            >
              <div className="signupName">
                <FaceIcon />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={registerDataChange}
                  required
                />
              </div>

              <div className="signupEmail">
                <MailOutLineIcon />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={registerDataChange}
                  required
                />
              </div>

              <div className="signupPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={registerDataChange}
                  required
                />
              </div>

              <div id="registerImage">
                <img src={avatarPreview} alt="" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
        
                />
              </div>

              <input type="submit" value="Register" className="signupBtn" />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignup;
