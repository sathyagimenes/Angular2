import { User } from './../models/user.model';

import { Injectable } from '@angular/core';
import { States } from '../models/states.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users!: User[];
  user!: User;
  constructor() { }

  public getStatesOfBrazil(): States[] {
    return (
      [
        { name: 'Acre', abbr: 'AC' },
        { name: 'Alagoas', abbr: 'AL' },
        { name: 'Amapá', abbr: 'AP' },
        { name: 'Amazonas', abbr: 'AM' },
        { name: 'Bahia', abbr: 'BA' },
        { name: 'Ceará', abbr: 'CE' },
        { name: 'Distrito Federal', abbr: 'DF' },
        { name: 'Espírito Santo', abbr: 'ES' },
        { name: 'Goiás', abbr: 'GO' },
        { name: 'Maranhão', abbr: 'MA' },
        { name: 'Mato Grosso', abbr: 'MT' },
        { name: 'Mato Grosso do Sul', abbr: 'MS' },
        { name: 'Minas Gerais', abbr: 'MG' },
        { name: 'Pará', abbr: 'PA' },
        { name: 'Paraíba', abbr: 'PB' },
        { name: 'Paraná', abbr: 'PR' },
        { name: 'Pernambuco', abbr: 'PE' },
        { name: 'Piauí', abbr: 'PI' },
        { name: 'Rio de Janeiro', abbr: 'RJ' },
        { name: 'Rio Grande do Norte', abbr: 'RN' },
        { name: 'Rio Grande do Sul', abbr: 'RS' },
        { name: 'Rondônia', abbr: 'RO' },
        { name: 'Roraima', abbr: 'RR' },
        { name: 'Santa Catarina', abbr: 'SC' },
        { name: 'São Paulo', abbr: 'SP' },
        { name: 'Sergipe', abbr: 'SE' },
        { name: 'Tocantins', abbr: 'TO' }
      ]
    );
  }

  public getUsers(): Observable<any> {
    const users = this.listUser()
    return of(users);
  }

  public saveUser(user: User): void {
    user = {
      ...user,
      id: crypto.randomUUID(),
      address: {
        ...user.address,
        id: crypto.randomUUID(),
      }
    }

    const users = this.listUser()
    users.push(user);
    localStorage.setItem('USERS', JSON.stringify(this.users));
  }

  deleteUser(userId: string): void {
    this.users = this.listUser();
    const index = this.users.findIndex(user => user.id === userId);
    if (index < 0) {
      return
    }
    this.users.splice(index, 1);
    localStorage.setItem('USERS', JSON.stringify(this.users));
  }


  public updateUser(newUser: User): void {
    const users = this.listUser()
    const filteredUser = users.find(user => user.id === newUser.id) as User
    this.deleteUser(filteredUser.id);
    this.saveUser(newUser);
  }

  public listUser(): User[] {
    return this.users = JSON.parse(localStorage.getItem('USERS') || '[]');
  }

  public getUserById(userId: string): Observable<User> {
    const users = this.listUser()
    // return users.find(user => user.id === userId) as User;
    return of(users.find(user => user.id === userId) as User);
  }

  public findUser(userId: string): User {
    const users = this.listUser()
    return users.find(user => user.id === userId) as User;
  }
}
