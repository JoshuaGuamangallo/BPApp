import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { ProductsMaintenanceComponent } from './product/products-maintenance/products-maintenance.component';
import { ProductsListComponent } from './product/products-list/products-list.component';
import { PaginationPipe } from './pipes/pagination.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductsMaintenanceComponent,
    PaginationPipe,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [
    PaginationPipe,
    SearchPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
