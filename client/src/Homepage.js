import React, { useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import {Link, useNavigate} from 'react-router-dom';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';




function Homepage() {
    
    
    const [data, setData] = useState([]);
    const [searchresults,setsearchresults]=useState([]);    
    const navigate=useNavigate();

    const handleChange = (event) => {
            const term=event.target.value;
            if (term.length>1){
                const newinfo=data.filter((ref)=>{
                   return  Object.values(ref)
                    .join(" ")
                    .toLowerCase()
                    .includes(term.toLowerCase());
                });
                //console.log("newinfo is: ",newinfo);
                setsearchresults(newinfo);
                //console.log("data after modification: ",searchresults)
                
            }
            else{
                setsearchresults(data);
            }
      };

   const toview=(item)=>(event)=>{
    navigate('/viewdetails',{state:{name:item.name,title:item.blogtitle,content:item.blogcontent,likes:item.likes,dislikes:item.dislikes}});
   }
    

  //Get Method
  const apiGet = () => {
    fetch("http://localhost:3001/data")
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        setData(json);
        
      });
  };


  const increaselikes=(item)=>(event)=>{
    fetch("http://localhost:3001/increase", {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({"id":item}) 
    }).then((res)=>{
      //console.log(res);
    }).catch((e)=>{
      //console.log(e);
    });
  };

  const decreaselikes=(item)=>(event)=>{
    fetch("http://localhost:3001/decrease", {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({"id":item}) 
    }).then((res)=>{
      //console.log(res);
    }).catch((e)=>{
      //console.log(e);
    });
  };



  useEffect(()=>{
    {apiGet()}
});

  const dataitems=(searchresults.length>0?searchresults:data).map(
    (element)=>{
        return (
            <div>
            <Card>              
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {element.name+ " posted a blog on "+element.blogtitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {element.blogcontent.substring(0,100)}
                  <button onClick={toview(element)}>Read more</button>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={increaselikes(element._id)}>Likes: {element.likes}</Button>
                <Button size="small"  onClick={decreaselikes(element._id)}>Dislikes: {element.dislikes}</Button>
              </CardActions>
            </Card>
            
            </div>
          );
    }
  )
 
  return (
    <div >
    
    <FormControl variant="standard">
        
        <Input id="component-simple" placeholder="search blogs" onChange={handleChange} />
      </FormControl>
    <i className="search icon"></i>
    <div>{dataitems}</div>
   
    </div>
   
    
    
  );
}


export default Homepage;