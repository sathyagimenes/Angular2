import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  public users!: User[];

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.users = this.usersService.listUser();
  }

  public editUser(id: string): void{
    this.router.navigate(['/users/edit/',id]);
  }

}
