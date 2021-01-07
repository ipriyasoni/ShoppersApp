import { Product } from './Product';

export class CartItem {
    product: Product;
    quantity: number;
    key: string;

    constructor(product: Product, quantity: number, key: string){
        this.product = product;
        this.quantity = quantity;
        this.key = key;
    }

    get subtotal(){
        return this.product.price * this.quantity;
    }
}