import { Product } from './products/models/product.model';
import { Component, OnInit } from '@angular/core';
import { User } from './users/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public users: User[] = [
    {
      id: crypto.randomUUID(),
      name: 'Amaral da Fonseca',
      profession: 'Analista de Sistemas',
      birthDate: '1988-04-15',
      documentNumber: '01234567890',
      address: {
        id: crypto.randomUUID(),
        zipCode: '69983970',
        street: 'Avenida Principal',
        number: 154,
        complement: 'Bloco 03 Apto 404',
        neighborhood: 'Centro',
        city: 'Marechal Thaumaturgo',
        state: 'AC'
      },
      contact: {
        phone: '82998745862',
        email: 'amaral@email.com'
      }
    },
    {
      id: crypto.randomUUID(),
      name: 'Murilo Moreira',
      profession: 'Operador de Empilhadeira',
      birthDate: '2001-08-19',
      documentNumber: '44222902071',
      address: {
        id: crypto.randomUUID(),
        zipCode: '69955970',
        street: 'Rua Coronel José Ferreira',
        number: 154,
        complement: 'Bloco 03 Apto 404',
        neighborhood: 'Centro',
        city: 'Santa Rosa do Purus',
        state: 'AC'
      },
      contact: {
        phone: '82999543621',
        email: 'murilo@email.com'
      }
    }
  ];

  public products: Product[] = [
    {
      id: crypto.randomUUID(),
      name: 'Cookies',
      description: 'Cookies de chocolate da vovó',
      expirationDate: '2023-04-15',
      price: '15,50',
      image: 'https://img.itdg.com.br/images/recipes/000/094/434/332855/332855_original.jpg'
    },
    {
      id: crypto.randomUUID(),
      name: 'Batata frita',
      description: 'Batatinhas fritas crocantes',
      expirationDate: '2023-01-24',
      price: '22,99',
      image: 'https://img.itdg.com.br/tdg/images/recipes/000/018/897/164773/164773_original.jpg?w=1200'
    }
  ];

  ngOnInit(): void {
    localStorage.setItem('USERS', JSON.stringify(this.users));
    localStorage.setItem('PRODUCTS', JSON.stringify(this.products));
  }
}
