import { Component, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Product } from '../models/product';
import { pageTransitions } from '../page-transitions';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.scss'],
  animations: [pageTransitions],
})
export class PdpComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  product?: Product;
  activeImgIndex: number = 0;
  quantity: number = 1;
  isLoading: boolean = true;
  error: string = '';

  config: SwiperOptions = {
    allowTouchMove: false,
  };

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.productService
        .getProduct(productId)
        .pipe(
          catchError((err) => {
            this.isLoading = false;
            this.error = 'An error occurred while fetching the product.';
            return throwError(err);
          })
        )
        .subscribe((product) => {
          this.product = product.product;
          this.isLoading = false;
          this.error = '';
        });
    });
  }

  slideToIndex(index: number): void {
    this.swiper?.swiperRef.slideTo(index);
    this.activeImgIndex = index;
  }

  incrementQuantity(): void {
    if (this.quantity < 10) this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }
}
