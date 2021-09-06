import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {
  r_id:any;
  constructor(private router:ActivatedRoute) { 
    // id:router.snapshot.data;
    // console.log("in register ts file",this.id)

  }

  ngOnInit(): void {
  this.router.params.subscribe(
    (params:Params)=>
    {
      this.r_id=params['id'];
      console.log("in register ts file---->",this.r_id);
      
    }
  )
  }

  


}
