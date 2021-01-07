import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<Cart>;
  user$: Observable<firebase.User>;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  cart: Cart;
  userId: string;

  constructor(private cartService: CartService, private authService: AuthService, private orderService: OrderService, private router: Router) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.cartSubscription = this.cart$.subscribe(cart => {
      this.cart= cart;
    });
    this.user$ = this.authService.user$;
    this.userSubscription = this.user$.subscribe(user => {
      this.userId = user.uid;
    });
  } 

    ngOnDestroy() {
      this.cartSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
    }

  saveShipping(shippingForm) {
    let shipping = shippingForm.value;
    let result = this.orderService.placeOrder(this.cart, shipping, this.userId);
    result.then(response => {
      localStorage.removeItem('cartId');
      this.router.navigate(['/thank-you']);
    });
  }

}
