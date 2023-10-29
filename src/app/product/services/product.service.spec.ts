import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClient, HttpHeaders]
    });
    service = TestBed.inject(ProductService);
  });

});
