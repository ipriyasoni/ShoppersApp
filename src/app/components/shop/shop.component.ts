import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Subscription, Observable, of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/CartItem';
import { map, take } from 'rxjs/operators';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  products: Product[];
  productSubscription: Subscription;
  cartSubscription: Subscription;
  cart: Cart;
  
  constructor(private productService: ProductService, private cartService: CartService) { 
    let products = this.productService.getAll().snapshotChanges();
    this.productSubscription = products.subscribe(productList => {
      this.products = productList.map(product => {
        let productObj = product.payload.val();
        productObj['key'] = product.payload.key;
        return productObj;
      });
      /*for(let product of this.products) {
        console.log(product);
      }
      for(let key in this.products) {
        console.log(key);
      }*/
    });
    
  }

  async ngOnInit() {
    this.cartSubscription = (await this.cartService.getCart()).subscribe(cart => {
      this.cart = cart;
    });
    
    /*this.cartSubscription = (await this.cartService.getCartOld()).valueChanges().subscribe(cart => {
      console.log('Cart Old',cart);
    });*/
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  getQuantity(productId) {
    if(this.cart){
      return this.cart.getItemQuantity(productId);
    }else{
      return 0;
    }
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }
}
