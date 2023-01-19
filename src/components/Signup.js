import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
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
const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"" ,email: '', password: '',cpassword:""});
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    
  };
  let navigate = useNavigate()

  const handleSubmit =async (e)=>{
    e.preventDefault();
    const {name,email,password,cpassword}=credentials;
    if (password===cpassword) {
    const response = await fetch(
      "http://localhost:5000/api/auth/createUser",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name ,email, password
        }),
      }
      
    ); 
    const json = await response.json();
      console.log(json);
      if(json.success) {
        //Save the Auth Token And Redirect
        localStorage.setItem("Token", json.authToken);
        navigate("/");
        props.showAlert("Successfully created account","success");
      }
      else{
        props.showAlert("Incorrect credentials. Please try again","danger");
      }
    }
    else{
      props.showAlert("Password and Confirm Password doesnt match" ,"warning");
    }
  }
  return (<>
    <div className="container my-3">
      <form  onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your fullname..."
            onChange={onChange}
            id="name"
            name="name"
            aria-describedby="nameHelp"
          />
           </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            autoComplete="email"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
            required
           minLength={8} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
           Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"

            name="cpassword"
            onChange={onChange}
            minLength={8}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

Signup.propTypes = propTypes;
Signup.defaultProps = defaultProps;
// #endregion

export default Signup;
