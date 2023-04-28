import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  PATH_OF_API = 'http://localhost:9090';
  constructor(private httpClient: HttpClient) {}

  public addProduct(product: Product) {
    return this.httpClient.post<Product>(
      this.PATH_OF_API + '/addNewProduct',
      product
    );
  }
}
