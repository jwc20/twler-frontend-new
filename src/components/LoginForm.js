import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

function LoginForm({ setCurrentUser }) {
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({});
  const nav = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt);
        setUser(data.user);
        console.log(data.user);
        // props.handleLogin(data.user);
      });
    setUsername("");
    setPassword("");
    console.log("logged in");
    setRedirect(true);
    // <Navigate to="/events" replace={true} />
  };

  if (redirect) {
    return <Navigate to="/events" />;
  }



  return (
    <div>
      {/* 
      <div style={formDivStyle}>
        <h1>Log In</h1>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Username</label>
            <input
              value={username}
              onChange={handleUsernameChange}
              type="text"
              placeholder="username"
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              value={password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="password"
            />
          </div>

          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
      </div> */}

      <div className="flex">
        <div className="bg-slate-100 border rounded-lg flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5">
          <h1 className="font-bold text-2xl my-10">Login</h1>
          <form
            onSubmit={handleSubmit}
            className="mt-2 flex flex-col lg:w-1/2 w-8/12"
          >
            <div
              className="
          flex flex-wrap
          items-stretch
          w-full
          mb-4
          relative
          h-15
          bg-white
          items-center
          rounded
          mb-6
          pr-10
        "
            >
              <div className="flex -mr-px justify-center w-15 p-4">
                <span
                  className="
              flex
              items-center
              leading-normal
              bg-white
              px-3
              border-0
              rounded rounded-r-none
              text-2xl text-gray-600
            "
                >
                  <i className="fas fa-user-circle"></i>
                </span>
              </div>
              <input
                type="text"
                className="
            flex-shrink flex-grow flex-auto
            leading-normal
            w-px
            flex-1
            border-0
            h-10
            border-grey-light
            rounded rounded-l-none
            px-3
            self-center
            relative
            font-roboto
            text-xl
            outline-none
          "
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div
              className="
          flex flex-wrap
          items-stretch
          w-full
          relative
          h-15
          bg-white
          items-center
          rounded
          mb-4
        "
            >
              <div className="flex -mr-px justify-center w-15 p-4">
                <span
                  className="
              flex
              items-center
              leading-normal
              bg-white
              rounded rounded-r-none
              text-xl
              px-3
              whitespace-no-wrap
              text-gray-600
            "
                >
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="
            flex-shrink flex-grow flex-auto
            leading-normal
            w-px
            flex-1
            border-0
            h-10
            px-3
            relative
            self-center
            font-roboto
            text-xl
            outline-none
          "
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
              />
              <div className="flex -mr-px">
                <span
                  className="
              flex
              items-center
              leading-normal
              bg-white
              rounded rounded-l-none
              border-0
              px-3
              whitespace-no-wrap
              text-gray-600
            "
                >
                  <i className="fas fa-eye-slash"></i>
                </span>
              </div>
            </div>

            <button
              className=" bg-blue-400
          py-4
          text-center
          px-17
          md:px-12 md:py-4
          text-white
          rounded
          leading-tight
          text-xl
          md:text-base
          font-sans
          mt-4
          mb-20"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
