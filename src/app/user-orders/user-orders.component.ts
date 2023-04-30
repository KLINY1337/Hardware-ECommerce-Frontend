import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Order } from '../_model/order.model';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];

  displayedColumns = [
    'Номер заказа',
    'Имя получателя',
    'Адрес доставки',
    'Номер телефона',
    'Дополнительный номер',
    'Стоимость заказа',
    'Статус заказа',
  ];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.productService.getOrderDetails().subscribe(
      (response) => {
        console.log(response);
        this.orders = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
