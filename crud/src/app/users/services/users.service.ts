import { User } from './../models/user.model';

import { Injectable } from '@angular/core';
import { States } from '../models/states.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users!: User[];
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

  public listUser(): User[] {
    return this.users = JSON.parse(localStorage.getItem('USERS') || '[]');
  }


}
