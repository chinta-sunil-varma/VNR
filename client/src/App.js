import axios from 'axios';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import  { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';





function App() {
  
  const editorRef = useRef(null);
  const log = () => {
    console.log('triggered');
    if (editorRef.current) {
      
      console.log(editorRef.current.getContent());
    }
  };
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
    newText.formData.content=editorRef.current.getContent()
    
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
      
      // <form onSubmit={handleSubmit}>
      //   <label htmlFor="name">Name:</label>
        
      //   <input
      //     type="text"
      //     id="name"
      //     name="name"
      //     value={formData.name}
      //     onChange={handleChange}
      //   />
      //   <br></br>
      //   <label htmlFor="rno">Roll Number:</label>
      //   <input
      //     type="text"
      //     id="rno"
      //     name="rno"
      //     value={formData.rno}
      //     onChange={handleChange}
      //   />
      //   <br></br>
      //   <label htmlFor="title">Blog title:</label>
      //   <input
      //     type="text"
      //     id="title"
      //     name="title"
      //     value={formData.title}
      //     onChange={handleChange}
      //   />
      //   <br></br>
      //   <label htmlFor="content">Blog content:</label>
        
      //   <Editor
      //   name='content'
       
      //   apiKey='o3el8qy2rmu9jcsxwp44s5juk1rtqzh6ry9eqrcytvz4v623'
      //   onInit={(evt, editor) => editorRef.current = editor}
      //   initialValue="<p>This is the initial content of the editor.</p>"
      //   init={{
      //     height: 500,
      //     menubar: true,
      //     plugins: [
      //       'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      //       'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      //       'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount','codesample'
      //     ],
      //     toolbar: 'undo redo | blocks | ' +
      //       'bold italic forecolor | alignleft aligncenter ' +
      //       'alignright alignjustify | bullist numlist outdent indent | ' +
      //       'removeformat | help'+'link image link table mergetags'+'help help'+'codesample codesample',
      //     content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      //   }}
      // />
     
       
          




        
      //   <br></br>
      //   <button type="submit" >Submit</button>


      // </form>

      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name='name' onChange={handleChange} placeholder="Enter your Name" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Roll No</Form.Label>
        <Form.Control type="text" name='rno'onChange={handleChange} placeholder="Roll no" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Blog Title</Form.Label>
        <Form.Control type="text" name='title'onChange={handleChange} placeholder="text" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Blog Content</Form.Label>

        <Editor
        name='content'
       
        apiKey='o3el8qy2rmu9jcsxwp44s5juk1rtqzh6ry9eqrcytvz4v623'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount','codesample'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help'+'link image link table mergetags'+'help help'+'codesample codesample',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
     
        
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    );
    
      
};
   

export default App;


  
  

  
    