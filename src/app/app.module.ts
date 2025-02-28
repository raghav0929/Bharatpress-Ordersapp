import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';  // For PrimeNG Buttons
import { ToolbarModule } from 'primeng/toolbar'; // For PrimeNG Toolbar
import { MenuModule } from 'primeng/menu'; // For PrimeNG Menu
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrderListComponent } from './order-list/order-list.component';
import { DropdownModule } from 'primeng/dropdown'; 
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages'; 
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderFormComponent,
    NavbarComponent,
    OrderListComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    ToolbarModule,
    MenuModule,
    SidebarModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    PaginatorModule,
    BrowserAnimationsModule,
    HttpClientModule ,
    DialogModule,
    MessagesModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
