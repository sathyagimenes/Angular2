import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { DialogComponent } from 'src/app/common/components/dialog/dialog.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private unsubscribe = new Subject();

  public users!: User[];

  constructor(private usersService: UsersService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    // this.users = this.usersService.listUser();
    this.usersService.getUsers()
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe({
        next: (users: User[]) => {
          this.users = users;
        },
        error: (error: any) => {
          console.log('Error message:', error)
        },
        complete: () => {
          console.log('Finalizado!')
        }
      });
  }

  public editUser(id: string): void {
    this.router.navigate(['/users/edit/', id]);
  }

  public deleteUser(id: string): void {
    this.usersService.deleteUser(id);
    this.getUsers();
  }

  public openDialog(enterAnimationDuration: string,
    exitAnimationDuration: string,
    user: User
  ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '330px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        text: `Tem certeza que deseja excluir o usuário ${user.name}?`,
        button1: 'Sim',
        button2: 'Cancelar'
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data === 'delete') {
        this.deleteUser(user.id);
      }
    });
  }

}
