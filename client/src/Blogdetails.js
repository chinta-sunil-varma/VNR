import React from 'react';
import { useLocation } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Typography from 'react-bootstrap/Col'; // This should be Col instead of Typography
import Paper from 'react-bootstrap/Card'; // This should be Card instead of Paper



function Blogdetails() {
  const location = useLocation();
  return (
    <>
     <h1>{location.state.title}</h1>
    <Paper display={'flex'} justifyContent={'center'}>


     


      <div style={{padding:'2%' }} dangerouslySetInnerHTML={{ __html: location.state.content }}></div>



      <Button size="small">Likes:{location.state.likes}</Button>
      <Button size="small">Dislikes:{location.state.dislikes}</Button>

    </Paper></>
  )
}




export default Blogdetails;
