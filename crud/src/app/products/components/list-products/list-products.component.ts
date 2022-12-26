import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit{
  public products!: Product[];

  constructor(private productsService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.products = this.productsService.listProduct();
  }

  public editProduct(id: string): void {
    this.router.navigate(['/products/edit/', id]);
  }

  public deleteProduct(id: string): void {
    this.productsService.deleteProduct(id);
    this.getProducts();
  }
}
