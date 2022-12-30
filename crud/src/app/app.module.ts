import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './users/components/create-user/create-user.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { ListComponent } from './users/components/list/list.component';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CreateProductComponent } from './products/components/create-product/create-product.component';
import { ListProductsComponent } from './products/components/list-products/list-products.component';
import { ProductsComponent } from './products/products.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './common/components/dialog/dialog.component';


const material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDialogModule
]

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CreateUserComponent,
    NotFoundComponent,
    ListComponent,
    CreateProductComponent,
    ListProductsComponent,
    ProductsComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    material,
    ReactiveFormsModule
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
