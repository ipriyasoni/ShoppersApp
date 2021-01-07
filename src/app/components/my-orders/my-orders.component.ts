import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  order$: Observable<Order[]>;

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    this.order$ = this.authService.user$.pipe(
      switchMap(user => {
        return this.orderService.getOrdersByUserId(user.uid).valueChanges();
      })
    );
  }

}
