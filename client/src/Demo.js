import React from "react";
import { BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";

import App from "./App";
import Homepage from "./Homepage";
import Blogdetails from "./Blogdetails.js";
import Nav from './Nav'

const Demo = () => {
  return (

    
      <Router>
      <Nav></Nav>
        <Routes>
          <Route path="/app" element={<App/>} />
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/viewdetails" element={<Blogdetails/>}/>
        </Routes>
      </Router>
    
  );
};

export default Demo;