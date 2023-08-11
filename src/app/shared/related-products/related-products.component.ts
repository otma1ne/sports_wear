import { Component, Input, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss'],
})
export class RelatedProductsComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  @Input() products?: Product[];

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
}
