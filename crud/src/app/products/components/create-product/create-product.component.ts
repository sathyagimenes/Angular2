import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  public form!: FormGroup;
  public product!: Product;
  public id!: string;

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildForm();
    this.getRouteParams();
  }

  private getRouteParams() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.setFormValue();
  }

  private setFormValue() {
    const filteredProduct = this.productService.getProductById(this.id);
    if (filteredProduct != null) {
      const submitBtn = window.document.getElementsByName('submitBtn');
      submitBtn.item(0).innerText = 'Editar';
      const titulo = window.document.getElementsByName('titulo');
      titulo.item(0).innerText = 'Edição de produto';
    }
    this.form.patchValue(filteredProduct);
  }

  private buildForm(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required]),
      expirationDate: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('^[0-9]+,[0-9]{2}')]),
      image: new FormControl(null)
    });
  }

  public onSubmit(): void {
    this.product = this.form.getRawValue();
    const filteredProduct = this.productService.getProductById(this.id);
    if (filteredProduct != null) {
      this.productService.updateProduct(this.product);
    }
    else {
      this.productService.saveProduct(this.product);
    }
    this.form.reset();
    this.router.navigate(['/products']);
  }


}
