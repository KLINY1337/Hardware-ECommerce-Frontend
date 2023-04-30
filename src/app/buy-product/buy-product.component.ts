import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css'],
})
export class BuyProductComponent implements OnInit {
  productDetails: Product[] = [];

  isSingleProductCheckout: string | any = '';
  orderDetails: OrderDetails = {
    fullName: this.getUserFullName(),
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: [],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private userAuthService: UserAuthService
  ) {}
  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get(
      'isSingleProductCheckout'
    );
    this.productDetails.forEach((x) =>
      this.orderDetails.orderProductQuantityList.push({
        productId: x.productId,
        quantity: 1,
      })
    );
  }

  public placeOrder(orderForm: NgForm) {
    this.productService
      .placeOrder(this.orderDetails, this.isSingleProductCheckout)
      .subscribe(
        (response) => {
          console.log(response);
          orderForm.reset();
          this.router.navigate(['/orderConfirmation']);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getQuantityForProduct(productId: any) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }

  getCalculatedTotalSum(productId: any, productDiscountedPrice: number) {
    return this.getQuantityForProduct(productId) * productDiscountedPrice;
  }

  onQuantityChanged(quantity: number | any, productId: any) {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = quantity;
  }

  getCalculatedGrandTotalSum() {
    let grandTotal = 0;

    this.orderDetails.orderProductQuantityList.forEach((productQuantity) => {
      const price = this.productDetails.filter(
        (product) => product.productId === productQuantity.productId
      )[0].productDiscountedPrice;

      grandTotal += price * productQuantity.quantity;
    });

    return grandTotal;
  }

  getUserFullName(): string {
    console.log(this.userAuthService.getUserFullName());
    return this.userAuthService.getUserFullName();
  }
}
