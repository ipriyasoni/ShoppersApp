import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart>;
  cartisempty
  constructor(private cartService: CartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  removeCartItem(cartItemId) {
    this.cartService.removeCartItem(cartItemId);
  }

}
