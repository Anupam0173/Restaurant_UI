import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestaurantServiceService {
  headers=new HttpHeaders();
  constructor(private http:HttpClient) { 
    this.headers.append('content-type','application/json');
  }
  restaurants=[];
  getRestaurants()
  {
    return this.http.get('http://127.0.0.1:3003/restaurant');
  }

  addRestaurant(newRestaurant:any)
  {
    console.log("service is called");
    // return this.http.post('http://127.0.0.1:3003/restaurant',newRestaurant,{headers:this.headers});
    return this.http.post('http://127.0.0.1:3003/restaurant',newRestaurant,{headers:this.headers});
  }


}
