import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css'],
})
export class ShowProductDetailsComponent {
  productDetails: Product[] = [];
  displayedColumns: string[] = [
    'Артикул',
    'Название',
    'Описание',
    'Цена без скидки',
    'Цена со скидкой',
    'Изменить',
    'Удалить',
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        console.log(response);
        this.productDetails = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      (response: any) => {
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
