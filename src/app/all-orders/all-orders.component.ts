import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Order } from '../_model/order.model';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css'],
})
export class AllOrdersComponent implements OnInit {
  orders: Order[] = [];

  displayedColumns = [
    'Номер заказа',
    'Имя получателя',
    'Адрес доставки',
    'Номер телефона',
    'Дополнительный номер',
    'Стоимость заказа',
    'Статус заказа',
    'Логин пользователя',
  ];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.productService.getAllOrders().subscribe(
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
