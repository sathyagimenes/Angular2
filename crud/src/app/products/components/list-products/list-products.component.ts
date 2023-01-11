import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/common/components/dialog/dialog.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  private unsubscribe = new Subject();

  public products!: Product[];

  constructor(private productsService: ProductService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    // this.products = this.productsService.listProduct();
    this.productsService.getProducts()
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe({
        next: (products: Product[]) => {
          this.products = products;
        },
        error: (error: any) => {
          console.log('Error message:', error)
        },
        complete: () => {
          console.log('Finalizado!')
        }
      });
  }

  public editProduct(id: string): void {
    this.router.navigate(['/products/edit/', id]);
  }

  public deleteProduct(id: string): void {
    this.productsService.deleteProduct(id);
    this.getProducts();
  }

  public openDialog(enterAnimationDuration: string,
    exitAnimationDuration: string,
    product: Product
  ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '330px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        text: `Tem certeza que deseja excluir o produto ${product.name}?`,
        button1: 'Sim',
        button2: 'Cancelar'
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data === 'delete') {
        this.deleteProduct(product.id);
      }
    });
  }
}
