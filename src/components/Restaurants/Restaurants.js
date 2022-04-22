import React, { useEffect, useState } from "react";
import classes from "./Restaurants.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Restaurants = (props) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get("/restaurant/near-me").then((res) => {
      console.log(res.data)
      setRestaurants(res.data.restaurants);
    });
  }, []);

  const resList = [];
  restaurants.forEach((restaurant) => {
    resList.push(
      //<div key={restaurant._id} className={classes.Restaurant}>
        //<span>{restaurant.name}</span>
        //<img src={restaurant.imageDetails.url} alt={restaurant.name} />
        //<Link to={`/restaurant/${restaurant.user}`}>Enter</Link>
      //</div>
         <Card key={restaurant._id} className={classes.Restaurant} sx={{ maxWidth: 300 }}>
         <CardActionArea>
           <CardMedia
             component="img"
             height="140"
             image={restaurant.imageDetails.url} alt={restaurant.name}
           />
           <CardContent>
             <Typography gutterBottom variant="h5" component="div">
              {restaurant.name}
             </Typography>
             <Typography variant="body2" color="text.secondary">
               Lizards are a widespread group of squamate reptiles, with over 6,000
               species, ranging across all continents except Antarctica
             </Typography>
           </CardContent>
         </CardActionArea>
         <CardActions>
           <Button size="small" color="primary" href={`/restaurant/${restaurant.user}`}>
            Enter
           </Button>
         </CardActions>
       </Card>
       
    );
  });
  return <div className={classes.Restaurants}>{resList}</div>;
};
export default Restaurants;
