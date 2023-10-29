import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(products: Product[],page: number = 0,): Product[] {
    console.log(products.slice(page, page + 5))
    return products.slice(page, page + 5)
  }
}
