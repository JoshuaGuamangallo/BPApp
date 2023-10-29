import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsMaintenanceComponent } from './products-maintenance.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';
import { Product } from 'src/app/models/product';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ProductsMaintenanceComponent', () => {
  let component: ProductsMaintenanceComponent;
  let fixture: ComponentFixture<ProductsMaintenanceComponent>;
  let fb: FormBuilder;
  let productService: ProductService;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getVerificationProduct', 'postProduct', 'putProduct']);
    await TestBed.configureTestingModule({
      declarations: [ProductsMaintenanceComponent],
      providers: [
        {provide: ProductService, useValue: productServiceSpy}, 
        FormBuilder],
      imports: [AppModule, SharedModule, HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsMaintenanceComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    productService = TestBed.inject(ProductService);
    component.productForm = fb.group({
      id: '' , name: '', description: '', logo: '', date_release: '' ,date_revision: ''
    });
  });

  it('should create the component maintenance product', () => {
    expect(component).toBeTruthy();
  });

  it('should add one year to date_revision', () => {
    const dateRelease = new Date().toISOString().substring(0, 10);
    component.productForm.get('date_release')!.setValue(dateRelease);
    component.addOneYearDateRevision();
    const dateRevision = new Date(dateRelease);
    dateRevision.setFullYear(dateRevision.getFullYear() + 1);
    expect(component.productForm.get('date_revision')!.value).toEqual(dateRevision.toISOString().substring(0, 10));
  });


  it('should reset the product form ', () => {
    const product: Product = {id: 'tar-1' , name: 'tarjeta preoductops', description: 'multiples productos', logo: '', date_release: '29-10-2023' ,date_revision: '29-10-2024'}
    component.productForm.setValue(product)
    component.resetForm();
    expect(component.productForm.get(['id', 'name', 'description', 'logo', 'date_release', 'date_revision'])).toBeNull()
  });

  it('should verification product', () => {
    const valueId = 'tar-1'; 
    const successResponse = true;
    productServiceSpy.getVerificationProduct.and.returnValue(of(successResponse));
    component.productForm.get('id')?.setValue(valueId);
    component.verificationIdProduct();
    expect(productServiceSpy.getVerificationProduct).toHaveBeenCalledWith(valueId);
    expect(component.productForm.get('id')?.hasError('notUnique')).toBe(true);
  });


  it('should create new product', () => {
    const router = TestBed.inject(Router);
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

    const dataProduct: Product = {
      id: 'tar-1',
      name: 'tar credit',
      description: 'Description tar',
      logo: 'URL',
      date_release: '2023-10-29',
      date_revision: '2024-10-29',
    }
    component.activatePutProduct = false;
    component.productForm.setValue(dataProduct);

    productServiceSpy.postProduct.and.returnValue(of(dataProduct!));
    component.saveForm();

    expect(productService.postProduct).toHaveBeenCalledOnceWith(component.productForm.value);
    expect(navigateByUrlSpy).toHaveBeenCalledWith('');
  });


  
  it('should put product', () => {
    const router = TestBed.inject(Router);
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

    const dataProduct: Product = {
      id: 'tar-1-u',
      name: 'tar credit update',
      description: 'Description tar update',
      logo: 'URL update',
      date_release: '2023-11-29',
      date_revision: '2024-11-29',
    }
    component.activatePutProduct = true;
    component.productForm.setValue(dataProduct);

    productServiceSpy.putProduct.and.returnValue(of(dataProduct!));
    component.saveForm();

    expect(productService.putProduct).toHaveBeenCalledOnceWith(component.productForm.value);
    expect(navigateByUrlSpy).toHaveBeenCalledWith('');
  });
});
