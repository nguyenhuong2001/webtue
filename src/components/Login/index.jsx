import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import swal from 'sweetalert'
import { useHistory } from "react-router-dom";
function Login() {
  //Xử lý sumit form
  /*
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const handleSubmit = () => {
    //Call API 
    console.log({name,email})
  }
  */
 const [user, setUser] = useState({
   email: '',
   password:''
 })
 const history = useHistory()
  const responseGoogle = (response) => {
    console.log(response);
  };

  const responseFacebook = (response) => {
    console.log(response);
  };
  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3080/login",
        {
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if(res){
        if(res?.data?.Role ==1 )
          return swal("Here's a message!", "Permission is not allow");
        swal("Here's a message!", "Login success");
        history.push('/')
      }
    } catch (error) {
      swal("Here's a message!",'Email or password is wrong');
    }
  };
  return (
    <div className="Login">
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
            <p className="hellothere">Hello there</p>

            <div class="login_form" id="form-1">
              <div class="form-group">
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Username/Email"
                  class="form-control"
                  onChange={(e)=> setUser({...user, email: e.target.value})}
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
                  onChange={(e)=> setUser({...user, password: e.target.value})}
                />
                <span class="form-message"></span>
              </div>

              <p className="forgot-password">Forgot password?</p>

              <button class="form-submit btn" onClick={login}>Login</button>
              <p className="sign-up">
                Don't have an Account?{" "}
                <Link className="signup" to="/signup">
                  Sign up
                </Link>
              </p>
              <div className="signin-fb-gg"></div>
            </div>

            <FacebookLogin
              appId="404801124635752"
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
              render={(renderProps) => (
                <button onClick={renderProps.onClick}>
                  This is my custom FB button
                </button>
              )}
            />
            <GoogleLogin
              clientId="472545936062-074brscdde3hk8v2u4jjs2r474302qkg.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
