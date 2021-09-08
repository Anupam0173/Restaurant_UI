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
  restaurant_name:any;

  constructor(private restaurantService:RestaurantServiceService,private router:ActivatedRoute) { }

  ngOnInit(): void 
  {
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
 
  // image: any;
 
  file_pic: File | undefined;

  // Create form data
  formData = new FormData(); 
      // On file Select
      onChange(event:any) {
        this.file_pic = <File>event.target.files[0];
                
  // Store form name as "file" with file data
  this.formData.append("file",this.file_pic, this.file_pic.name);
  // console.log("form data-------------->",this.formData);
  // console.log("printing-----------file----------------",this.file_pic);
    }

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
  price:Number=0;
  addProduct(form:any)
  {
    try
    {
      this.formData.append("name" , form.product_name);
      this.formData.append("price" , form.product_price);
      this.formData.append("category" , form.product_category);

        this.restaurantService.addProduct(this.formData,this.r_id)
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
        });  
    }
    catch(e)
    {
      console.log("there is an error");
    }
    
  }


temp:any;
// this method fetch all products list and it is displayed in tablular form
getProducts()
{
  try {
    this.restaurantService.getProducts(this.r_id)
    .subscribe(
      (products:any)=>{
       if(products)
       {
         this.temp=products;
         this.restaurant_name=products[0].name
         this.prods=this.temp[0].products;
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
  display_products()
  {
    this.show_products=!this.show_products;
    this.dispaly_productBTN_text=!this.show_products?"view Registered Products":"hide list"
    this.getProducts();
  }


//code for deletion of product
deletion_message:any;
delete_msg_status=false;
delete_product(p_id:any)
{ 
  try {
    this.restaurantService.deleteProduct(this.r_id,p_id)
    .subscribe(
      (resp:any)=>{
        if(resp)
        {
          this.delete_msg_status=true;
          let dataJson = JSON.parse(JSON.stringify(resp))
          this.deletion_message=dataJson.message;
          console.log("data saved successfully",resp);
          this.getProducts();
        }else
        {
          console.log("data not saved",resp);
        }
      }
    );  
  } catch (error) {
    console.log("there is an error");
  }
}



}


