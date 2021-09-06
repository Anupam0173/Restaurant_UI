import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantRegistrationComponent } from './restaurant-registration/restaurant-registration.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';
import { RegisterProductComponent } from './register-product/register-product.component';
import { RestaurantHomeComponent } from './restaurant-home/restaurant-home.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantRegistrationComponent,
    RegisterRestaurantComponent,
    RegisterProductComponent,
    RestaurantHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
