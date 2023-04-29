import { FileHandle } from './file-handle.model';

export interface Product {
  productId: number | any;
  productName: string;
  productDescription: string;
  productDiscountedPrice: number;
  productActualPrice: number;
  productImages: FileHandle[];
}
