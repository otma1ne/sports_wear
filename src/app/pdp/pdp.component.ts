import { Component, ViewChild } from '@angular/core';
import SwiperCore, { SwiperOptions, Zoom, EffectFade } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Product } from '../models/product.model';
import { pageTransitions } from '../page-transitions';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';

SwiperCore.use([EffectFade, Zoom]);

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.scss'],
  animations: [pageTransitions],
})
export class PdpComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  product?: Product;
  relatedProducts?: Product[];
  activeImgIndex: number = 0;
  quantity: number = 1;
  isLoading: boolean = true;
  error: string = '';

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    zoom: {
      maxRatio: 2,
      minRatio: 3,
      toggle: true,
    },
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
        .subscribe((data) => {
          console.log(data);
          this.product = data.product;
          this.relatedProducts = data.relatedProducts;
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
