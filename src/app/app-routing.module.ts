import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { RestaurantRegistrationComponent } from './restaurant-registration/restaurant-registration.component';

const routes: Routes = [
  { path:'',component:HomeComponent},
  { path:'restaurant',component:RestaurantRegistrationComponent},
  // { path:'add_product/:id',component:ProductRegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
