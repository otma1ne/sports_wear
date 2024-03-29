import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent {
  config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 3,
      },
      998: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  };
}
