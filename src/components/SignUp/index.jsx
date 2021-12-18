import React, { useState } from "react";
import "./styles.scss";
import { Link , Redirect  } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'
import { useHistory } from "react-router-dom";
const mangSign = [];
function SignUp() {
  const history = useHistory()
  const [userRegister, setUserRegister] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    isChecked: false
  });
  const register = async() => {
    try {
      if(!userRegister.isChecked)
        return swal("Here's a message!", "Please checked after register");
      if(!userRegister.email || userRegister.password !== userRegister.passwordCheck)
        return swal("Here's a message!", "Wrong email or password");
      const res = await axios.post(
        "http://localhost:3080/register",
        {
          email: userRegister.email,
          password: userRegister.password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if(res){
        //response data after login
        // alert("Register Success")
        swal("Here's a message!", "Register Success");
        history.push('/login')
      }
    } catch (error) {
      swal("Here's a message!", "Register Fail");
    }
  };
  return (
    <div className="Signup">
      <div className="login-form">
        <div className="login-left">
          <div className="content">
            <h3>Logo</h3>
            <p className="welcome">Welcome to Envy</p>
            <p className="text-introduce">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
              nisl tristique, lacinia ipsum tempor, gravida nibh. Mauris odio
              nulla, efficitur tempor velit sed, aliquam dapibus libero.
            </p>
            <div className="icon">
              <i class="fab fa-facebook"></i>
              <i class="fab fa-instagram"></i>
              <i class="fab fa-twitter"></i>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="content">
            <p className="hellothere">Sign up</p>

            <div className="form-submit">
              <div class="form-group">
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Username/Email"
                  class="form-control"
                  onChange={(e) =>
                    setUserRegister({ ...userRegister, email: e.target.value })
                  }
                />
                <span class="form-message"></span>
              </div>

              <div class="form-group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  class="form-control"
                  onChange={(e) =>
                    setUserRegister({
                      ...userRegister,
                      password: e.target.value,
                    })
                  }
                />
                <span class="form-message"></span>
              </div>

              <div class="form-group">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  class="form-control"
                  onChange={(e) =>
                    setUserRegister({
                      ...userRegister,
                      passwordCheck: e.target.value,
                    })
                  }
                />
                <span class="form-message"></span>
              </div>

              <div class="wthree-text">
                <label class="anim">
                  <input type="checkbox" class="checkbox" required="" onChange={(e) => setUserRegister({...userRegister,isChecked: e.target.checked})} />
                  <span>I Agree to the terms and conditions</span>
                </label>
                <div class="clear"></div>
              </div>

              <button  onClick={register} class="form-submit btn">
                Create account
              </button>

              <p className="loginnow">
                You have an Account?{" "}
                <Link className="login-now" to="/Login">
                  Login now!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
