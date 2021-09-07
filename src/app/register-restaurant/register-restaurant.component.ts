import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantServiceService } from '../restaurant-service.service';
import { Buffer } from 'buffer';
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

  constructor(private restaurantService:RestaurantServiceService,private router:Router) 
  {
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

  file_pic: File | undefined;

  // Create form data
  formData = new FormData(); 
      // On file Select
      onChange(event:any) {
        this.file_pic = <File>event.target.files[0];
                
  // Store form name as "file" with file data
  this.formData.append("file",this.file_pic, this.file_pic.name);
  console.log("form data-------------->",this.formData);
        console.log("printing-----------file----------------",this.file_pic);
    }
  

  //method which will be called after the form submittion
  addRestaurant(form:any)
  {
    try
    {
      // console.log(newRestaurant);
      this.formData.append("name" , form.restaurant_name);
      this.formData.append("opening_hours" , form.restaurant_name);
      this.formData.append("address" , form.restaurant_address+", "+form.restaurant_city+", "+this.restaurant_state+", "+form.restaurant_zipcode);

      this.restaurantService.addRestaurant(this.formData)
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

