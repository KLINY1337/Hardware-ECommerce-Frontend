import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

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

  constructor(private productService: ProductService, private router: Router) {}
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

  checkout() {
    this.router.navigate([
      '/buyProduct',
      {
        isSingleProductCheckout: false,
        id: -1,
      },
    ]);
  }
}
