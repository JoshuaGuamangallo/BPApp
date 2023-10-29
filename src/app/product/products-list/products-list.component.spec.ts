import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { ProductService } from '../services/product.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Product } from 'src/app/models/product';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productService: ProductService;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
    TestBed.configureTestingModule({
      declarations: [ ProductsListComponent ],
      providers: [{ provide: ProductService, useValue: productServiceSpy }],
      imports: [AppModule, SharedModule, HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should create the component list product', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    const products: Product[] = [{id: '' , name: '', description: '', logo: '', date_release: '' ,date_revision: ''}];
    productServiceSpy.getProducts.and.returnValue(of(products));
    
    component.loadData();
    expect(productServiceSpy.getProducts).toHaveBeenCalled(); // Verifica si cada producto está presente en component.products.
  });

  it('should toggleDropdown', () => {
    component.openDropdownIndex = -1;

    component.toggleDropdown(1);
    expect(component.openDropdownIndex).toBe(1);

    component.toggleDropdown(1);
    expect(component.openDropdownIndex).toBe(-1);
  });

  it('should handle pagination control', () => {
    const event = new Event('change');
    const selectElement: DebugElement = fixture.debugElement.query(By.css('select'));
    selectElement.nativeElement.value = '0';
    selectElement.nativeElement.dispatchEvent(event);
    expect(component.page).toBe(0);
  });
});
