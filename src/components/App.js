import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Nav from "./Nav";

import EventsPage from "../pages/EventsPage";
import ResultPage from "../pages/ResultPage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
// import { connect } from "react-redux";
// import SignUpComponent from "./SignUpComponent";
import { useState, useEffect } from "react";
import CalculatorPage from '../pages/CalculatorPage';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  function setCurrentUser(currentUser) {
    setUser(currentUser);
    setLoggedIn(true);
  }

  function logOut() {
    setUser({});
    setLoggedIn(false);
    localStorage.token = "";
  }




  useEffect(() => {
    const token = localStorage.getItem("token");
    if (
      typeof token !== "undefined" &&
      token.length > 1 &&
      token !== "undefined"
    ) {
      fetch(`http://localhost:3000/auto_login`, {
        method: "GET",
        headers: {
          // Authenticate: localStorage.token,
          Authenticate: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          // setUser(data);
          // console.log(data)
          setCurrentUser(data);
          // console.log(data.user)
          // console.log(data.user.username + " has logged in")
        });
    } else {
      console.log("No token found, try logging in!");
    }


  }, []);


 



  return (
    <div className="min-h-screen">
      <Nav user={user} loggedIn={loggedIn} logOut={logOut} />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route index element={<Home />} /> */}
        {/* <Route path="results" element={<Results />} /> */}
        {/* <Route path="athletes" element={<Athletes />} /> */}

        <Route
          path="/login"
          element={<LoginForm setCurrentUser={setCurrentUser} />}
        />
        <Route path="signup" element={<SignupForm />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/results" element={<ResultPage />} />
        <Route path="calculator" element={<CalculatorPage />} />

      </Routes>
    </div>
  );
}

export default App;
