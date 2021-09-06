import { Component, OnInit } from '@angular/core';
import { any } from 'sequelize/types/lib/operators';

import {RestaurantServiceService} from '../restaurant-service.service';
@Component({
  selector: 'app-restaurant-registration',
  templateUrl: './restaurant-registration.component.html',
  styleUrls: ['./restaurant-registration.component.css']
})
export class RestaurantRegistrationComponent implements OnInit {
  restaurants=[];
  registration_status=false;
  registration_message:any;
  restaurant_state="";
  states=["Madhya Pradesh","pune","Banglore","uttar Pradesh","Andra pradesh","Delhi","Goa"];
  image: any;

  constructor(private restaurantService:RestaurantServiceService) { }

  ngOnInit(): void {
  }
  selectImage(event:any)
  {
    if(event.target.files.length>0)
    {
      const file=event.target.file;
      this.image=file;
    }
  }
  addRestaurant(form:any)
  {
    console.log("add restaurant method is executed.........");
    const newRestaurant=
    {
      name:form.restaurant_name,
      opening_hours:"form "+form.restaurant_opening_hours+"to "+form.restaurant_closing_hours,
      address:form.restaurant_address+", "+form.restaurant_city+", "+this.restaurant_state+", "+form.restaurant_zipcode,
      // image:form.restaurant_image
    }
    try
    {
    
      this.restaurantService.addRestaurant(newRestaurant)
    .subscribe(
      resp=>{
       if(resp)
       {
         this.registration_status=true;
         let dataJson = JSON.parse(JSON.stringify(resp))


         this.registration_message=dataJson.msg;
         console.log("data saved successfully",resp);
       }else
       {
         console.log("data not saved",resp);
       }

      }
    );  
  }
    catch(e)
    {
      console.log("there is an error");
    }
  }


}







