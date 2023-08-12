import { Component, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  products: Product[] = [];
  isPrevDisabled = true;
  isNextDisabled = false;
  isLoading: boolean = true;
  activeCategory: string = 'bestSelling';

  config: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 20,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      500: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      998: {
        slidesPerView: 4,
      },
    },
  };

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchProducts();

    if (this.swiper) {
      this.swiper.swiperRef.on('slideChange', () => {
        this.updateNextPrevButtons();
      });
      this.updateNextPrevButtons();
    }
  }

  fetchProducts() {
    this.isLoading = true;
    let productObservable: Observable<Product[]>;

    switch (this.activeCategory) {
      case 'topRating':
        productObservable = this.productService.getTopRating();
        break;
      case 'bestSelling':
        productObservable = this.productService.getBestSelling();
        break;
      case 'featured':
        productObservable = this.productService.getTrendingProduct();
        break;
      default:
        console.error('Invalid product type');
        return;
    }
    productObservable.subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      },
    });
  }

  nextSlide(): void {
    this.swiper?.swiperRef.slideNext();
    this.updateNextPrevButtons();
  }

  prevSlide(): void {
    this.swiper?.swiperRef.slidePrev();
    this.updateNextPrevButtons();
  }

  updateNextPrevButtons() {
    if (this.swiper) {
      this.isPrevDisabled = this.swiper.swiperRef.isBeginning;
      this.isNextDisabled = this.swiper.swiperRef.isEnd;
    }
  }

  naviagteToAllProduct() {
    this.router.navigate(['/shop']);
  }

  handleClickCat(value: string) {
    this.activeCategory = value;
    this.fetchProducts();
  }
}
