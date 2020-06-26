import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { UserComponent } from './components/user/user.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductEditionComponent } from './components/product-edition/product-edition.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';

const routes: Routes = [
  {
    path: 'logar',
    component: LoginComponent,
  },
  {
    path: 'registrar',
    component: RegisterComponent,
  },
  {
    path: 'usuario',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'produtos',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'produtos/editar/:id',
    component: ProductEditionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'produtos/descricao/:id',
    component: ProductDescriptionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'produtos',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
