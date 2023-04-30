import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css'],
})
export class ShowProductDetailsComponent {
  pageNumber: number = 0;
  showTable: boolean = false;
  showLoadMoreProductButton = false;
  productDetails: Product[] = [];
  displayedColumns: string[] = [
    'Артикул',
    'Название',
    'description',
    'Цена без скидки',
    'Цена со скидкой',
    'Действия',
  ];

  constructor(
    private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKey: string = '') {
    this.showTable = false;
    this.productService
      .getAllProducts(this.pageNumber, searchKey)
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
          //this.productDetails = response;
          response.forEach((p) => this.productDetails.push(p));
          this.showTable = true;

          if (response.length == 8) {
            this.showLoadMoreProductButton = true;
          } else {
            this.showLoadMoreProductButton = false;
          }
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

  editProductDetails(productId: number) {
    this.router.navigate(['/addNewProduct', { productId: productId }]);
  }

  loadMoreProduct() {
    this.pageNumber++;
    this.getAllProducts();
  }

  showAllProducts() {
    this.pageNumber = -1;
    this.productDetails = [];
    this.getAllProducts();
  }

  searchByKeyWord(searchKeyWord: string) {
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKeyWord);
  }
}
