import axios from 'axios';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';



function App() {
  const [formData, setFormData] = useState({
    name: '',
    rno:'',
    title:'',
    content:'',
    likes:0,
    dislikes:0,
  });
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    //console.log("Data being logged",formData.rno)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newText={formData}
    
    fetch("http://localhost:3001/api", {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify(newText) 
    }).then((res)=>{
      console.log(res);
    }).catch((e)=>{
      console.log(e);
    });
  navigate("/homepage")
}
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="rno">Roll Number:</label>
        <input
          type="text"
          id="rno"
          name="rno"
          value={formData.rno}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="title">Blog title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="content">Blog content:</label>
        <textarea type="content"
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}></textarea>
        
        <br></br>
        <button type="submit">Submit</button>
      </form>
    );
    
      
};
   

export default App;


  
  

  
    