import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Product } from "src/app/models/Product";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  product: Product;
  pageTitle = "Add Product";
  id: string;
  errorMessage;
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.has("id")) {
        this.pageTitle = "Edit Product";
        this.id = params.get("id");
        this.productService
          .get(this.id)
          .valueChanges()
          .subscribe((product) => {
            this.product = product;
          });
      }
    });
  }

  saveproduct(productForm) {
    let product = productForm.value;
    if (this.id) {
      //update product
      this.productService.update(this.id, product);
    } else {
      //create product
      this.productService.create(product);
    }

    this.router.navigate(["/manage-products"]);
  }
}
