import { UsersService } from './../../services/users.service';
import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { States } from '../../models/states.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  public registerForm!: FormGroup;
  public user!: User;
  public states!: States[];
  public id!: string;

  constructor(private usersService: UsersService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.buildForm();
    this.getStates();
    this.getRouteParams();
  }

  private getRouteParams() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.setFormValue();
  }

  private setFormValue() {
    const filteredUser = this.usersService.getUserById(this.id);
    if (filteredUser != null)
    {
      this.registerForm.get('documentNumber')?.disable();
      const submitBtn = window.document.getElementsByName('submitBtn');
      submitBtn.item(0).innerText = 'Editar';
      const titulo = window.document.getElementsByName('titulo');
      titulo.item(0).innerText = 'Edição de cadastro';
    }
    this.registerForm.patchValue(filteredUser);
    console.log(filteredUser)
  }

  private buildForm(): void {
    this.registerForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      profession: new FormControl(null, [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]*$')]),
      address: new FormGroup({
        id: new FormControl(),
        zipCode: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]),
        street: new FormControl(null, [Validators.required]),
        number: new FormControl(null, [Validators.required]),
        complement: new FormControl(null),
        neighborhood: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
      }),
      contact: new FormGroup({
        phone: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]*$')]),
        email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      })
    });
  }

  private getStates(): void {
    this.states = this.usersService.getStatesOfBrazil();
  }

  public onSubmit(): void {
    this.user = this.registerForm.getRawValue();
    const filteredUser = this.usersService.getUserById(this.id);
    if (filteredUser != null) {
      this.usersService.updateUser(this.user);
    }
    else {
      this.usersService.saveUser(this.user);
    }
    console.log(this.user)
    this.registerForm.reset();
    this.router.navigate(['/users']);
  }

}
