import React from 'react';
import {useLocation} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Blogdetails(){
    const location=useLocation();
    return (
        <Card sx={{ maxWidth: 345 }}>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {location.state.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location.state.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Likes:{location.state.likes}</Button>
        <Button size="small">Dislikes:{location.state.dislikes}</Button>
      </CardActions>
    </Card>
    )
}




export default Blogdetails;
