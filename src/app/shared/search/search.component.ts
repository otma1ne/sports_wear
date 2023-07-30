import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, debounceTime } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { handleSearchState } from 'src/app/store/actions/header.action';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  header$: Observable<any>;
  showSearch: boolean = false;
  products: Product[] = [];
  isLoading: boolean = false;

  constructor(
    private store: Store<{ header: any }>,
    private productService: ProductsService
  ) {
    this.header$ = this.store.select('header');
    this.header$.subscribe((headerData) => {
      this.showSearch = headerData.isSearchOpen;
    });
  }

  closeSideSearch() {
    const body = document.querySelector('body');
    this.store.dispatch(handleSearchState({ state: false }));
    body!.style.overflow = 'auto';
  }

  handleSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.trim();
    if (searchTerm.length > 0) {
      this.isLoading = true;
      this.productService
        .search(searchTerm)
        .pipe(debounceTime(500))
        .subscribe({
          next: (products: Product[]) => {
            this.products = products;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error fetching products:', error);
            this.isLoading = false;
          },
        });
    } else {
      this.isLoading = false;
      this.products = [];
    }
  }
}
