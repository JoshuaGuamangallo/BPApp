import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() total_products: number = 0;
  options: number[] = [];

  constructor() {
  }

  ngOnInit() {
          this.generateItemsPerPage();
}

  ngOnChanges(changes: SimpleChanges) {

    if ('total_products' in changes) {
      this.generateItemsPerPage();
    }
  }

  generateItemsPerPage() {
    for(let i = 5; i <=this.total_products ; i++){
      if(i % 5 === 0){
        if(i <= this.total_products  - 1){
          this.options.push(i + 5)
        }
      }
    }

  }

}
