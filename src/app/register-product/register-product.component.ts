import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestaurantServiceService } from '../restaurant-service.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {
  r_id:any;
  constructor(private restaurantService:RestaurantServiceService,private router:ActivatedRoute) { 

  }

  ngOnInit(): void {
  this.router.params.subscribe(
    (params:Params)=>
    {
      this.r_id=params['id'];
      console.log("in register ts file---->",this.r_id);
    })
  }

  
  products=[];
  registration_status=false;
  registration_message:any;
  image: any;

  selectImage(event:any)
  {
    if(event.target.files.length>0)
    {
      const file=event.target.file;
      this.image=file;
    }
  }
  addProduct(form:any)
  {
    console.log("add restaurant method is executed.........");
    const newProduct=
    {
      name:form.product_name,
      price:Number(form.product_price),
      category:form.product_category,
      // image:form.restaurant_image
    }
    try
    {
    
      this.restaurantService.addProduct(newProduct,this.r_id)
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
