import { Product } from 'src/app/models/product';
import { ProductService } from './../services/product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  textoBusqueda:string = ''
  products: Product[] = []
  openDropdownIndex: number = -1;
  totalProducts: number = 0
  page = 0
  constructor(
    private productService: ProductService 
  ) { }

  ngOnInit(): void {
    this.loadData()
}

loadData(){
  this.productService.getProducts().subscribe(resp =>{
    this.totalProducts = resp.length
    this.products = resp
  })
}

toggleDropdown(index: number) {
  if (this.openDropdownIndex === index) {
    this.openDropdownIndex = -1;
  } else {
    this.openDropdownIndex = index;
  }
}

controlPagination(event:any){
  console.log(+event.target.value)
  this.page = +event.target.value
}

deleteProduct(id: any){

  const confirmation = window.confirm('Deseas eliminar el producto?')
  if(confirmation){
    this.productService.deleteProduct(id).subscribe(resp =>{
      if(resp){
        this.loadData()
      }
    },error =>{
      console.log(error)
    })
  }else{
    return;
  }
}


}
