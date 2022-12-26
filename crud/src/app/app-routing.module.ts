import { ListComponent } from './users/components/list/list.component';
import { CreateUserComponent } from './users/components/create-user/create-user.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { CreateProductComponent } from './products/components/create-product/create-product.component';
import { ListProductsComponent } from './products/components/list-products/list-products.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  {
    path: 'users', component: UsersComponent,
    children: [
      { path: 'create', component: CreateUserComponent },
      { path: 'edit/:id', component: CreateUserComponent },
      { path: '', component: ListComponent }]
  },
  {
    path: 'products', component: ProductsComponent,
    children: [
      { path: 'create', component: CreateProductComponent },
      { path: 'edit/:id', component: CreateProductComponent },
      { path: '', component: ListProductsComponent }]
  },
  // { path: 'create-user', component: CreateUserComponent },
  {
    path: '', redirectTo: 'users', pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
