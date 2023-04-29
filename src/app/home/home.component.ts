import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productDetails: Product[] = [];
  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService
      .getAllProducts()
      .pipe(
        map((x: Product[], i: number) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (response: Product[]) => {
          console.log(response);
          this.productDetails = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
}
