import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './product/products-list/products-list.component';
import { ProductsMaintenanceComponent } from './product/products-maintenance/products-maintenance.component';


const routes: Routes = [
  {path: '', component: ProductsListComponent},
  {path: 'create-product/:id', component: ProductsMaintenanceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
