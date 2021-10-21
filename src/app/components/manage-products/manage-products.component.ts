import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  productSubscription: Subscription; //for holding subscription
  
  constructor(private productService: ProductService) { 
    let products = this.productService.getAll().snapshotChanges(); //valuchanges = for changing value, for using key
    this.productSubscription = products.subscribe(productList => { //subscribe  AngularFireAction<DatabaseSnapshot<Product>>[]) 
      this.products = productList.map(product => { //this map is js: input array -> output array
        let productObj = product.payload.val();
        productObj['key'] = product.payload['key']; //for getting key or adding key value pair
        return productObj;
      });
      
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

  deleteProduct(productId) {
    if(confirm('Are you sure want to delete?')){
      this.productService.delete(productId);
    }
  }
}
