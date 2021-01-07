import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ShopComponent } from './components/shop/shop.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import{ AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthGuardService } from './services/auth-guard.service';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { QuantitySelectorComponent } from './components/quantity-selector/quantity-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ShopComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CheckoutComponent,
    ThankyouComponent,
    MyOrdersComponent,
    ProductFormComponent,
    ManageProductsComponent,
    QuantitySelectorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'shop',
        component: ShopComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'login', 
        component: LoginComponent,
        canActivate: [LoginGuardService]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoginGuardService]
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'thankyou',
        component: ThankyouComponent
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'product-form/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuardService,AdminAuthGuardService]
      },
      {
        path: 'product-form',
        component: ProductFormComponent,
        canActivate: [AuthGuardService,AdminAuthGuardService]
      },
      {
        path: 'manage-products',
        component:ManageProductsComponent,
        canActivate: [AuthGuardService,AdminAuthGuardService]
      }
    ])
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
