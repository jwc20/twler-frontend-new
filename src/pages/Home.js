import { json } from "d3";
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";

function Home() {
  const [name, setName] = useState("");
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   // fetch(`http://localhost:3000/users`, {
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //     Accept: "application/json",
  //   //   }

  //   // })

  //       fetch(`http://localhost:3000/users`)

  //   .then((r) => {
  //     console.log(r.user)
  //   })
  // })

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     fetch(`http://localhost:3000/auto_login`, {
  //       headers: {
  //         // Authorization: `Bearer ${token}`,
  //         "Authenticate": localStorage.token
  //       },
  //     })
  //       .then((r) => r.json())
  //       .then((d) => {
  //         console.log(d)
  //         setUser(d)
  //       });
  //   }
  // }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     fetch(`http://localhost:3000/login`, {
  //       headers: {
  //         "Authenticate": localStorage.token
  //       },
  //     })
  //       .then((r) => r.json())
  //       .then((data) => {
  //         setUser(data.user)
  //         console.log(data.user)
  //         console.log(data.user.username + " has logged in")
  //       });
  //   }
  // }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     fetch(`http://localhost:3000/login`, {
  //       method: "GET",
  //       headers: {
  //         "Authenticate": localStorage.token
  //       },
  //     })
  //       .then((r) => r.json())
  //       .then((data) => {
  //         setUser(data)
  //         // console.log(data.user)
  //         // console.log(data.user.username + " has logged in")
  //       });
  //   }
  // }, []);


  return (
    <div className="home-page">
      <LoginForm />
      {/* <h1 className="text-3xl font-bold underline italic">Home</h1> */}
    </div>
  );
}

export default Home;
