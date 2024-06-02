import { useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { EyeFill } from 'react-bootstrap-icons';
import { EyeSlashFill } from 'react-bootstrap-icons';
import {jwtDecode} from "jwt-decode";
import Sidebar from '../Sidebar/SideBar';
export default function Login(){
    const navigate=useNavigate();
    const [name,setName]=useState();
    const [age,setAge]=useState();
    const [weight,setWeight]=useState();
    const [userName,setuserName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [confirmPassword,setConfirmPassword]=useState();
    const [isToggled, setIsToggled] = useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    

    const handleSignUp = (e) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
  
      axios
        .post("https://ded-lift.onrender.com/register", {
          name,
          userName,
          password,
          age,
          weight,
        })
        .then((res) => {
          console.log(res.data);  // Optional: log the response to see what's coming back
          setMessage("Registration successful");
          setError('');
        })
        .catch((err) => {
          console.log(err);
          setError("Registration failed. Please try again.");
        });
    };
    const handleLogin=(e)=>{
        e.preventDefault()
        axios
          .post("https://ded-lift.onrender.com/login", { email, password })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            if (res.data.Status === "Success") {
              navigate("/");
              
            }
            else{
              console.log(res);
            }
          })
          .catch((err) => console.log(err));
    }
   const handleGoogleLoginSuccess = (credentialResponse) => {
     console.log(credentialResponse);

     // Extract user information from the JWT token
     const decodedToken = jwtDecode(credentialResponse?.credential);

     if (decodedToken) {
       const { name, email } = decodedToken;

       // You can now use 'name' and 'email' in your application
       // Update or set the 'token' cookie with the received token
       const token = credentialResponse?.tokenId;
       localStorage.setItem("token", token);

       // You can perform additional actions or navigate to a different page here if needed
        localStorage.setItem("profileData", JSON.stringify({ name, email }));
        navigate("/");
     } else {
       console.log("Unable to fetch user information from Google login");
     }
   };
      const handleGoogleLoginError = () => {
        console.log('Login Failed');
      };

        return (
          <div className="lgcontain">
            <div class="wrapper">
              <div class="card-switch">
                <label class="switch">
                  <input
                    type="checkbox"
                    class="toggle2"
                    checked={isToggled}
                    onClick={() => setIsToggled(!isToggled)}
                  />
                  <span class="slider"></span>
                  <span class="card-side"></span>
                </label>
              </div>
              <div className={`flip-card__inner ${isToggled ? "flipped" : ""}`}>
                <div class="flip-card__front">
                  <div class="title">Log in</div>
                  <form
                    class="flip-card__form"
                    action=""
                    onSubmit={() => handleLogin}
                  >
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleLoginError}
                    ></GoogleLogin>
                    <input
                      class="flip-card__input"
                      name="email"
                      placeholder="Email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="password_field">
                      <input
                        class="flip-card__input"
                        name="password"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                      {showPassword ? (
                        <EyeSlashFill
                          className="eye-icon"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <EyeFill
                          className="eye-icon"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                    <button class="flip-card__btn">Let`s go!</button>
                  </form>
                </div>
                <div class="flip-card__back">
                  <div class="title">Sign up</div>
                  <form
                    class="flip-card__form"
                    action=""
                    onSubmit={handleSignUp}
                  >
                    <input
                      class="flip-card__input"
                      placeholder="Name"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    />
                     <input
                      class="flip-card__input"
                      placeholder="User Name"
                      type="text"
                      onChange={(e) => setuserName(e.target.value)}
                    />
                    <input
                      class="flip-card__input"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      class="flip-card__input"
                      name="password"
                      placeholder="Confirm Password"
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <input
                      class="flip-card__input"
                      placeholder="Age"
                      type="number"
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <input
                      class="flip-card__input"
                      placeholder="Weight"
                      type="number"
                      onChange={(e) => setWeight(e.target.value)}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    <button type="submit" class="flip-card__btn">
                      Confirm!
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
}