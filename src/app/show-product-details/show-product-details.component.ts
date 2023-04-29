import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';

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
    'Картинки',
    'Изменить',
    'Удалить',
  ];

  constructor(
    private productService: ProductService,
    public imagesDialog: MatDialog,
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

  showImages(product: Product) {
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages,
      },
      height: '500px',
      width: '800px',
    });
  }
}