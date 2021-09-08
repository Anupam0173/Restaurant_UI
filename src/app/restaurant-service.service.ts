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
  
  get_states()
  {
    return this.http.get('https://data.covid19india.org/data.json');
  }
  
  getProducts(id:any)
  {
    return this.http.get('http://127.0.0.1:3003/restaurant/'+id);
  }

  addRestaurant(newRestaurant:any)
  {
    console.log("service is called");
    
    return this.http.post('http://127.0.0.1:3003/restaurant',newRestaurant,{headers:this.headers});
  }

  addProduct(newProduct:any,id:any)
  {
    return this.http.post('http://127.0.0.1:3003/product/'+id,newProduct,{headers:this.headers});
  }

  deleteProduct(r_id:any,p_id:any)
  {
    return this.http.delete('http://127.0.0.1:3003/product/delete/'+r_id+'/'+p_id);
  }
}
