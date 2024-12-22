import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NewsApi from "./components/newsApi/NewsApi";
import NewYorkTimes from "./components/newYorkTime/NewYorkTimes";
import TheGuardian from "./components/theGuardian/TheGuardian";
import LandingPage from "./components/landingPage/LandingPage";

import NavMenu from "./components/navMenu/NavMenu";

function App() {
  return (
    <div className="App">
      <Router>
        <NavMenu />
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/newsapi" element={<NewsApi />} />
          <Route path="/nyt" element={<NewYorkTimes />} />
          <Route path="/the-guardian" element={<TheGuardian />} />
        </Routes>
      </Router>

     
    </div>
  );
}

export default App;
