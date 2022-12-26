import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  public form!: FormGroup;
  public product!: Product;
  public id!: string;

  // constructor(private usersService: UsersService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildForm();
    // this.getRouteParams();
  }

  // private getRouteParams() {
  //   this.id = this.activatedRoute.snapshot.params['id'];
  //   this.setFormValue();
  // }

  // private setFormValue() {
  //   const filteredUser = this.usersService.getUserById(this.id);
  //   if (filteredUser != null) {
  //     this.form.get('documentNumber')?.disable();
  //     const submitBtn = window.document.getElementsByName('submitBtn');
  //     submitBtn.item(0).innerText = 'Editar';
  //     const titulo = window.document.getElementsByName('titulo');
  //     titulo.item(0).innerText = 'Edição de cadastro';
  //   }
  //   this.form.patchValue(filteredUser);
  // }

  private buildForm(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required]),
      expirationDate: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('^[0-9]+,[0-9]{2}')])
    });
  }

  public onSubmit(): void {
    this.product = this.form.getRawValue();
    // const filteredUser = this.usersService.getUserById(this.id);
    // if (filteredUser != null) {
    //   this.usersService.updateUser(this.user);
    // }
    // else {
      // this.usersService.saveUser(this.user);
    // }
    this.form.reset();
    // this.router.navigate(['/users']);
  }


}
