import React, { createContext, useReducer, useState, useEffect } from "react";
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home"

import {initialState, reducer} from "../src/reducer/UseReduser"
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import Usergallery from "./components/Usergallery";


export const UserContext = createContext();

function App() {

    const [state, dispatch] = useReducer(reducer, initialState); 
    

    return (
       
        <BrowserRouter>
            <UserContext.Provider value={{state, dispatch}}>  
                <Routes>
                    <Route exact path="/" element={<Landing />}/>
                    <Route exact path="/login" element={<Signup />}/>
                    <Route exact path="/usergallery" element={<Usergallery />}/>
                    <Route exact path="/home" element={<Home />}/>

                    {/* <Route exact path="/landing" element={<Landing />}/> */}
                    
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
       
    );
}

export default App;
