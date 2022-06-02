import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [created, setCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log("singup page");

  function createUser(event) {
    event.preventDefault();
    event.target.reset();

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => r.json())
      .then((response) => {
        // console.log("created");

        if (response.status === "created") {

          setCreated(true);
          setErrorMessage("");
        }
      })
      .catch((response) => {
        console.log("not created");
        setErrorMessage(
          "Uh-oh! It didn't work...Make sure your server is running!"
        );
      });
  }

  return (
    <div>
      <h1>Signup</h1>
      {created ? (
        <Navigate to="/login" />
      ) : (
        <div>
          <div className="please-log-in">
            <p>{errorMessage}</p>
          </div>
          <br />
          <form onSubmit={createUser}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <br />
      <br />
    </div>
  );
}
