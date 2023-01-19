import React from "react";
// import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,

  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import NoteState from "./contex/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message , type) =>{

    setAlert({
      msg:message,
      type:type

    })
    setTimeout(() => {
      
      setAlert(null)
   
    }, 2000);

  }
 
  
  return (<>
  <Router>  
  <NavBar />
  <Alert alert={alert}/>
  <div className="container">
    <Routes>
      <Route exact path="/" element={<NoteState><Home showAlert={showAlert} /></NoteState>} />
      <Route exact path="/login" element={<Login showAlert={showAlert} />} />
      <Route exact path="/about" element={<AboutUs/>} />
      <Route exact path="/signUp" element={<Signup showAlert={showAlert} />} />
    </Routes>
    </div>
  </Router>
  </>
  );
} 

export default App;
