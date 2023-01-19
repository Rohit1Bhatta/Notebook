import React,{useState}from "react";
import{useNavigate} from "react-router-dom"
// import styled from 'styled-components';
// import PropTypes from 'prop-types';

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 *
 */
const Login = (props) => {

  const [credentials, setCredentials] = useState({email: '', password: ''});
  const OnChnage = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    
  };
  let navigate = useNavigate()

  const handleSubmit =async (e)=>{
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5000/api/auth/loginUser",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      }
      
    ); 
    const json = await response.json();
      console.log(json);
      if(json.success) {
        //Save the Auth Token And Redirect
        localStorage.setItem("token", json.authToken);
        navigate("/");
        props.showAlert("Successfully Logged In","success");
      }
      else{
        props.showAlert("Incorrect credentials. Please try again","danger");
      }
  }
  return (
    <div>
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label"> 
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email" 
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={OnChnage}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            id="password"
            name="password"
            onChange={OnChnage}
          />
        </div>

        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
// #endregion

export default Login;
