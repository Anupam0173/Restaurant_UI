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
  this.router.params.subscribe(
    (params:Params)=>
    {
      this.r_id=params['id'];
    })
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



  // this.show_prod_reg=!this.show_prod_reg;
  // this.prod_registrationBTN_text=!this.show_prod_reg?"Show products registration form":"Hide products registration form";
  // this.show_products
//logic for show products of restaurants
  show_products=true;
  dispaly_productBTN_text="View registered products"
  register_products:any;
    
  r_prods:any
  display_products()
  {
    this.show_products=!this.show_products;
    this.dispaly_productBTN_text=!this.show_products?"view Registered Products":"hide list"
 
  try {
    this.restaurantService.getProducts(this.r_id)
    .subscribe(
      products=>{
       if(products)
       {
        this.register_products=products;
        // this.register_products=products.products;
        // prods=this.register_products.products;
        // for product in 
        console.log("----------------------------",this.register_products.name);
        // for (var product of this.r_prods) {
        //   console.log(product)
    
        // }
        console.log("------------------------",this.register_products.products);
    
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


}





  // selectImage(event:any)
  // {
  //   if(event.target.files.length>0)
  //   {
  //     const file=event.target.file;
  //     this.image=file;
  //   }
  // }
 