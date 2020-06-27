import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { ProductEditionComponent } from './components/product-edition/product-edition.component';
import { ProductsComponent } from './components/products/products.component';
import { UserComponent } from './components/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './components/loginAdmin/admin.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { AuthenticationAdminService } from './services/authentication-admin.service';
// import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductDescriptionComponent,
    ProductEditionComponent,
    ProductAddComponent,
    ProductsComponent,
    UserComponent,
    NavbarComponent,
    AdminComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    // AdminRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthenticationService, AuthenticationAdminService , AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
