import { UsersService } from './../../services/users.service';
import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { States } from '../../models/states.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  registerForm!: FormGroup;
  user!: User;
  public states!: States[];

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.buildForm();
    this.getStates();
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

  public onSubmit() {
    this.user = this.registerForm.getRawValue();
    this.usersService.saveUser(this.user);
    this.registerForm.reset();
    this.router.navigate(['/users']);
  }

}
