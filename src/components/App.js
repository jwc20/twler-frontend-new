import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Nav from "./Nav";
import Results from "../pages/Results";
import Athletes from "../pages/Athletes";
import Login from "./Login";
import SignupForm from "./SignupForm";
import EventsPage from "../pages/EventsPage";
import ResultPage from "../pages/ResultPage";
import LoginForm from "./LoginForm";
// import { connect } from "react-redux";
// import SignUpComponent from "./SignUpComponent";

function App() {
  return (
    <div className="min-h-screen">
      <Nav />


        <Routes>
          <Route index element={<Home />} />
          {/* <Route path="results" element={<Results />} /> */}
          <Route path="athletes" element={<Athletes />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/results" element={<ResultPage />} />
        </Routes>
    </div>
  );
}

export default App;
