import { HttpClientModule } from '@angular/common/http';
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
import { ProductAddComponent } from './components/product-add/product-add.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCD2l7SFPcwfs-ZsVmk7pmmtlUN8FHmZfs",
  authDomain: "agrofacil.firebaseapp.com",
  databaseURL: "https://agrofacil.firebaseio.com",
  projectId: "agrofacil",
  storageBucket: "agrofacil.appspot.com",
  messagingSenderId: "676839795549",
  appId: "1:676839795549:web:077a53353cd17ad3d416b4",
  measurementId: "G-6NPFQ20JYB"
};

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
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
