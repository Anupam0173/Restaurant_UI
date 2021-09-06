import { Component, OnInit } from '@angular/core';
import { RestaurantServiceService } from '../restaurant-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Json } from 'sequelize/types/lib/utils';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
 
//  this.router.navigate(['/add_product',{'id':JSON.stringify(restaurant_id)}]);
 
}
}
