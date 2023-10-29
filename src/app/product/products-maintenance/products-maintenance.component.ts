import { ProductService } from './../services/product.service';

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-maintenance',
  templateUrl: './products-maintenance.component.html',
  styleUrls: ['./products-maintenance.component.scss']
})
export class ProductsMaintenanceComponent implements OnInit {
  product?: Product;
  activatePutProduct = false
  productForm: FormGroup;
  isDisabled: boolean = true;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,) {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10),]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: [new Date().toISOString().substring(0, 10), [Validators.required]],
      date_revision: [{value: new Date().toISOString().substring(0, 10) , disabled: true}, [Validators.required]],
    });

  }

  ngOnInit(): void {

    const routeStr = this.route.snapshot.paramMap.get('id');
    if (routeStr !== 'new' && routeStr !== null) {
      return this.loadData(routeStr)

    }
    this.addOneYearDateRevision()
  }

  loadData(id:string){
      this.productService.getProducts().subscribe(resp => {
        this.product =resp.find(prod => prod.id === id);
        if(this.product){

          this.activatePutProduct = true
          this.product.date_release = this.product.date_release.toString().substring(0, 10)
          this.product.date_revision = this.product?.date_revision.toString().substring(0, 10)
          this.onPatchValue()
        }
      })
  }

  onPatchValue(){
    this.productForm.get('id')?.disable()
      this.productForm.patchValue(this.product!);
  }

  saveForm() {
    if(this.productForm.invalid){return;}
    this.product = this.productForm.value
    this.product!.date_revision = this.productForm.get('date_revision')!.value

    if(this.activatePutProduct){
      this.product!.id = this.productForm.get('id')!.value
      this.productService.putProduct(this.product!).subscribe(resp =>{
        this.router.navigateByUrl('')
      }, error =>{
        console.error(error)
      })
      return;
    }

    this.productService.postProduct(this.product!).subscribe(resp =>{
      console.log(resp)
      this.router.navigateByUrl('')
    }, error =>{
      console.error(error)
    })
  }

  currentDateReleaseValidator() {
    const controlDate = this.productForm.get('date_release')?.value
    const selectedDate = new Date(controlDate).toISOString().substring(0, 10);
    const currentDate = new Date().toISOString().substring(0, 10);
    if (selectedDate !< currentDate) {
      console.log(selectedDate !< currentDate)
      return this.productForm.get('date_release')?.setErrors({currentDate: true})
    }
    return this.productForm.get('date_release')?.setErrors(null);
  }

  addOneYearDateRevision() {
    const currentDate = new Date(this.productForm.get('date_release')!.value);
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    this.productForm.get('date_revision')!.setValue(currentDate.toISOString().substring(0, 10));
  }

  verificationIdProduct(){
    const valueId = this.productForm.get('id')?.value
    let verification = null
    if (valueId) {
      this.productService.getVerificationProduct(valueId).subscribe(resp => {
        verification = resp
        verification? this.productForm.get('id')?.setErrors({notUnique: true}) : this.productForm.get('id')?.setErrors(null);
      }, error =>{
        return null;
      })
    }
    return null;
  }

  resetForm(){
    if(!this.activatePutProduct){
      this.productForm.reset()
    }
  }
}
