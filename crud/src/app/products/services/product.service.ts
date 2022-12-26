import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products!: Product[];
  product!: Product;
  constructor() { }

  public saveProduct(product: Product): void {
    product = {
      ...product,
      id: crypto.randomUUID()
    }
    const products = this.listProduct()
    products.push(product);
    localStorage.setItem('PRODUCTS', JSON.stringify(this.products));
  }

  deleteProduct(productId: string): void {
    this.products = this.listProduct();
    const index = this.products.findIndex(product => product.id === productId);
    if (index < 0) {
      return
    }
    this.products.splice(index, 1);
    localStorage.setItem('PRODUCTS', JSON.stringify(this.products));
  }


  public updateProduct(newProduct: Product): void {
    const users = this.listProduct()
    const filteredProd = users.find(product => product.id === newProduct.id) as Product
    this.deleteProduct(filteredProd.id);
    this.saveProduct(newProduct);
  }

  public listProduct(): Product[] {
    return this.products = JSON.parse(localStorage.getItem('PRODUCTS') || '[]');
  }

  public getProductById(productId: string): Product {
    const products = this.listProduct()
    return products.find(product => product.id === productId) as Product;
  }
}
