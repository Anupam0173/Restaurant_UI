import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantServiceService } from '../restaurant-service.service';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.css']
})
export class RestaurantHomeComponent implements OnInit {

  show_restaurant=false;
  register_restaurants:any;
  constructor(private restaurantService:RestaurantServiceService,private router:Router) { }
  ngOnInit(): void {
  }

  display_restaurant()
  {
    this.show_restaurant=true;
  
  try {
    this.restaurantService.getRestaurants()
    .subscribe(
      restaurants=>{
       if(restaurants)
       {
        this.register_restaurants=restaurants;
       }else
       {
         console.log("data not saved",restaurants);
       }

      }
    );  
  } catch (error) {
    console.log("there is an error");
  }
}

add_products(restaurant_id:any)
{
 console.log("--------------->",restaurant_id);
 
 this.router.navigate(['/add_product/'+restaurant_id]);
 
}

}
