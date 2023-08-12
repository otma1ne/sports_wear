import { Component } from '@angular/core';
import { pageTransitions } from '../page-transitions';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: [
    './shop.component.scss',
    './shop_responsive.component.scss',
    './breadcrumb.component.scss',
  ],
  animations: [pageTransitions],
})
export class ShopComponent {
  products: Product[] = [];
  showedProducts: Product[] = [];
  activeCategory: string = 'all';
  activeSort: string = 'dafault';
  maxPrice: number | null = null;
  productMinPrice: number = 0;
  productMaxPrice: number = 0;
  isLoading: boolean = true;
  shopType: string = 'shopType1';
  showFilter: boolean = false;

  constructor(
    private productService: ProductsService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchProducts();
    this.activeRoute.queryParams.subscribe((params) => {
      this.activeCategory = params['category'] || 'all';
      this.setProducts();
    });
  }

  fetchProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.isLoading = false;
        this.setProducts();
        this.getMinMaxPrice();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      },
    });
  }

  getCategoryLength(category: string): Number {
    if (category === 'all') return this.products.length;
    const productCat = this.products.filter(
      (product) =>
        product.category.toLocaleLowerCase() === category.toLocaleLowerCase()
    );
    return productCat.length;
  }

  setCategory(category: string): void {
    this.activeCategory = category;
    this.router.navigate([], { queryParams: { category: category } });
    this.setProducts();
  }

  setSort(event: any): void {
    this.activeSort = event.target.value;
    this.setProducts();
  }

  getMinMaxPrice() {
    if (this.products.length > 0) {
      const minPrice = Math.min(
        ...this.products.map((product) => product.price)
      );
      const maxPrice = Math.max(
        ...this.products.map((product) => product.price)
      );
      this.productMinPrice = minPrice;
      this.productMaxPrice = maxPrice;
      this.maxPrice = maxPrice;
    }
  }

  setMaxPrice(event: any): void {
    this.maxPrice = event.target.value;
    this.setProducts();
  }

  setProducts() {
    let filtredProducts = this.products;
    if (this.activeCategory !== 'all') {
      filtredProducts = this.products.filter(
        (product) =>
          product.category.toLocaleLowerCase() ===
          this.activeCategory.toLocaleLowerCase()
      );
    }

    if (this.maxPrice) {
      filtredProducts = filtredProducts.filter((product) => {
        return product.price <= this.maxPrice!;
      });
    }

    switch (this.activeSort) {
      case 'by_name':
        filtredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'by_price_desc':
        filtredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'by_price_asc':
        filtredProducts.sort((a, b) => b.price - a.price);
    }

    this.showedProducts = filtredProducts;
  }

  setShopType(shopType: string) {
    this.shopType = shopType;
  }

  handleShowFilter(value: boolean) {
    this.showFilter = value;
  }
}
