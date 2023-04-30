import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productDetails: Product[] = [];
  displayedColumns: string[] = [
    'Артикул',
    'Название',
    'description',
    'Цена без скидки',
    'Цена со скидкой',
  ];

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getCartDetails();
  }

  public getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response) => {
        this.productDetails = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
