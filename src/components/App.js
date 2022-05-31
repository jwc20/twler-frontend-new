import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Nav from "./Nav";
import Results from "../pages/Results";
import Athletes from "../pages/Athletes";
import Login from "./Login";
import Signup from "../pages/Signup";
import EventsPage from "../pages/EventsPage";
import ResultPage from "../pages/ResultPage";

function App() {

  return (
    <div>
      <Nav />
      <Routes>
          <Route index element={<Home />} />
          {/* <Route path="results" element={<Results />} /> */}
          <Route path="athletes" element={<Athletes />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="result_page" element={<ResultPage />} />
          
      </Routes>
    </div>
  );
}

export default App;
