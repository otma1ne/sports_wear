import { Component, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Product } from '../shared/models/product';
import { pageTransitions } from '../page-transitions';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.scss'],
  animations: [pageTransitions],
})
export class PdpComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  product: Product = {
    id: 'product2',
    name: 'Short Sleeve T-Shirt',
    images: [
      'Short-Sleeve-T-Shirt-1.jpg.webp',
      'Short-Sleeve-T-Shirt-2.jpg.webp',
    ],
    rating: 3,
    price: 265,
    isHot: true,
    isSale: false,
  };
  activeImgIndex: number = 0;
  quantity: number = 1;

  config: SwiperOptions = {
    allowTouchMove: false,
  };

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
