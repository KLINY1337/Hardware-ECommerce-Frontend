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

  status: string = 'All';

  displayedColumns = [
    'Номер заказа',
    'Имя получателя',
    'Адрес доставки',
    'Номер телефона',
    'Дополнительный номер',
    'Стоимость заказа',
    'Статус заказа',
    'Логин пользователя',
    'Отметка о доставке',
  ];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getAllOrders(this.status);
  }

  getAllOrders(status: string) {
    this.productService.getAllOrders(status).subscribe(
      (response) => {
        console.log(response);
        this.orders = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  markOrderAsDelivered(orderId: any) {
    this.productService.markOrderAsDelivered(orderId).subscribe(
      (response) => {
        this.getAllOrders(this.status);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
