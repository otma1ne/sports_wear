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
    loop : true,
  };
}
