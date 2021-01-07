import { Component, OnInit, Input } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.css']
})
export class QuantitySelectorComponent implements OnInit {
  @Input('product') product;
  @Input('cart') cart;
  
  constructor(private cartService: CartService) { }

  ngOnInit() {
    
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product) {
    this.cartService.removeFromCart(product);
  }

  getQuantity(productId) {
    if(this.cart){
      return this.cart.getItemQuantity(productId);
    }else{
      return 0;
    }
  }

}
