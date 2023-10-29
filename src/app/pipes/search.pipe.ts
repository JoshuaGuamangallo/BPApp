import { Product } from './../models/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(product: Product[], search: string = ''): Product[] {
    search = search.toString().toLocaleLowerCase()
    const filterProducts = product.filter(resp =>
      resp.id?.toLocaleLowerCase().includes(search) 
      || resp.name?.toLocaleLowerCase().includes(search)
      || resp.description?.toLocaleLowerCase().includes(search)
    )
    return filterProducts
  }

}
