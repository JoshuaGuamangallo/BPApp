import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProductsListComponent } from './product/products-list/products-list.component';
import { ProductsMaintenanceComponent } from './product/products-maintenance/products-maintenance.component';
import { PaginationPipe } from './pipes/pagination.pipe';
import { SearchPipe } from './pipes/search.pipe';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        ProductsListComponent,
        ProductsMaintenanceComponent,
        PaginationPipe,
        SearchPipe
      ],
      providers: [HeaderComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
