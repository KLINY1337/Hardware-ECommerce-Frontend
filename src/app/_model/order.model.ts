import { Product } from './product.model';

export interface Order {
  orderId: number;
  orderFullName: string;
  orderFullAddress: string;
  orderContactNumber: string;
  orderAlternateContactNumber: string;
  orderAmount: number;
  orderStatus: string;
  product: Product | any;
  user: any;
}
