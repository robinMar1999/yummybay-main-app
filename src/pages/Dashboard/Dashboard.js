import React from "react";
import Restaurants from "../../components/Restaurants/Restaurants";
import classes from "./Dashboard.module.css";
const Dashboard = (props) => {
  return (
    <div className={classes.Dashboard}>
      <h2 >BRINGING YUMMY DELIGHTS TO YOUR TABLE <br/>EVERYDAY</h2>
      <h3>About the food culture</h3>
      <p className={classes.pdesc}>Order food & beverages online from restaurants near & around you. We deliver food from your neighborhood local joints, your favorite cafes, luxurious & elite restaurants in your area. Exciting bit? We place no minimum order restrictions! Order in as little (or as much) as you?d like. We?ll Swiggy it to you!
      </p>
      <h3>Popular restaurants in and around you</h3>
      <Restaurants />
      <div className={classes.footerdark}>
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Web design</a></li>
                            <li><a href="#">Development</a></li>
                            <li><a href="#">Hosting</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    
                    <div class="col item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div>
                </div>
                <p class="copyright">Copyright 2022 © Yummybay, Inc. All rights reserved.</p>
            </div>
        </footer>
    </div>
    </div>
  );
};
export default Dashboard;
