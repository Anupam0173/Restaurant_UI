import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { any } from 'sequelize/types/lib/operators';
import { RestaurantServiceService } from '../restaurant-service.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {
  r_id:any;
  constructor(private restaurantService:RestaurantServiceService,private router:ActivatedRoute) { }
  ngOnInit(): void {
    //code for catching of id which is passed by other component
  this.router.params.subscribe(
    (params:Params)=>
    {
      this.r_id=params['id'];
    })
    this.getProducts();

  }

  products=[];
  registration_status=false;
 
  image: any;
 
  
  //code related to registration of products
  registration_message:any;
  prod_registrationBTN_text="Show products registration form";
  show_prod_reg=true;
  display_prod_registration()
  {
    this.show_prod_reg=!this.show_prod_reg;
    this.prod_registrationBTN_text=!this.show_prod_reg?"Show products registration form":"Hide registration form";
  }

  //on click of show registraion btn form
  addProduct(form:any)
  {
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
         this.getProducts();
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

getProducts()
{
  try {
    this.restaurantService.getProducts(this.r_id)
    .subscribe(
      (products:any)=>{
       if(products)
       {
         let temp=products;
         this.prods=temp[0].products;
       }else
       {
         console.log("data not saved",products);
       }

      }
    );  
  } catch (error) {
    console.log("there is an error");
  }
}


//logic for show products of restaurants
  show_products=true;
  dispaly_productBTN_text="View registered products"
  register_products:any;
  prods:any
  // r_prods:any
  display_products()
  {
    this.show_products=!this.show_products;
    this.dispaly_productBTN_text=!this.show_products?"view Registered Products":"hide list"
    this.getProducts();

}


}





  // selectImage(event:any)
  // {
  //   if(event.target.files.length>0)
  //   {
  //     const file=event.target.file;
  //     this.image=file;
  //   }
  // }
 