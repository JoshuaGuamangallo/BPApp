import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { urlApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers = new HttpHeaders({
    'authorId': '1727389650'
  })
  constructor(private http: HttpClient, ) {
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${urlApi}/bp/products`, {headers: this.headers})
  }

  getVerificationProduct(id: string){
    return this.http.get<Boolean>(`${urlApi}/bp/products/verification`, {headers: this.headers, params: {id: id} })
  }

  postProduct(product: Product){
    return this.http.post<Product>(`${urlApi}/bp/products`,product,{headers: this.headers})
  }

  putProduct(product: Product){
    return this.http.put<Product>(`${urlApi}/bp/products`,product,{headers: this.headers})
  }

  deleteProduct(productID: string){
    console.log(this.headers)
    return this.http.delete(`${urlApi}/bp/products`,{params: {id: productID}, headers: this.headers})
  }
}
