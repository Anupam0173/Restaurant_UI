import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantServiceService } from '../restaurant-service.service';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.css']
})
export class RegisterRestaurantComponent implements OnInit {
  restaurants=[];
  registration_msg_status=false;
  registration_message:any;
  restaurant_state="";
  states:string[]=[];
  image: any;
  restaurant_id:any;

  constructor(private restaurantService:RestaurantServiceService,private router:Router) {
    //fetching of states from api
    this.restaurantService.get_states().subscribe(
      (covid_data:any)=>{
        let i=0;
        for (i=1;i<covid_data.statewise.length;i++) 
        { 
          this.states.push(covid_data.statewise[i].state);
        }
      })
   }

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

  //method which will be called after the form submittion
  addRestaurant(form:any)
  {
    const newRestaurant=
    {
      name:form.restaurant_name,
      opening_hours:form.restaurant_opening_hours,
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
            this.registration_msg_status=true;
            let dataJson = JSON.parse(JSON.stringify(resp))

            this.registration_message=dataJson.msg;
            this.restaurant_id=dataJson.rest_id;
            this.addProduct();   //for redirecting to add product page.
            console.log("data saved successfully",resp);
          }else
          {
            console.log("data not saved",resp);
          }
      });  
  }
    catch(e)
    {
      console.log("there is an error");
    }
  }

//this method redirects the user to register product page After successfull registeration.
   addProduct()
   {
    if(this.registration_message=="Restaurant Saved Successfully")
    {
      this.router.navigate(['/add_product/'+this.restaurant_id]);
    }
   }
}




