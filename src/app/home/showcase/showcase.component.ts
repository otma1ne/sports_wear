import {
  Component,
  ViewChild,
  ChangeDetectorRef,
  Inject,
  ElementRef,
} from '@angular/core';
import SwiperCore, { SwiperOptions, EffectFade, Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { gsap } from 'gsap';
import { DOCUMENT } from '@angular/common';
import SplitType from 'split-type';

SwiperCore.use([Autoplay, EffectFade]);

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  showcaseImg!: ElementRef<HTMLDivElement>;
  currentPage = 1;
  totalPages = 3;
  myText = new SplitType('#text__showcase');

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    effect: 'fade',
    autoplay: true,
    allowTouchMove: false,
  };

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  onSwiper(event: any) {
    this.swiperAnimations();
  }

  onSlideChange(): void {
    this.currentPage = (this.swiper?.swiperRef.activeIndex || 0) + 1;
    this.cdr.detectChanges();
    this.swiperAnimations();
  }

  slideToIndex(index: number): void {
    this.swiper?.swiperRef.slideTo(index);
  }

  swiperAnimations(): void {
    gsap.from(this.document.getElementsByClassName('img__showcase'), {
      duration: 0.5,
      display: 'none',
      delay: 0.3,
      x: '50%',
    });

    gsap.from(this.document.getElementsByClassName('overlay'), {
      duration: 0.5,
      display: 'none',
      delay: 0.3,
      x: '-100%',
    });

    gsap.from(this.document.getElementsByClassName('text__anim__2'), {
      duration: 0.3,
      delay: 0.8,
      y: '200%',
      opacity: 0.5,
    });

    /* gsap.from(this.document.getElementsByClassName('text__anim__1'), {
      duration: 0.5,
      delay: 0.3,
      opacity: 0,
      x: '-100%',
    }); */

    gsap.from(this.document.getElementsByClassName('text__overlay'), {
      duration: 0.5,
      delay: 0.5,
      x: '50%',
    });

    gsap.from(this.document.getElementsByClassName('img__discount'), {
      duration: 0.6,
      delay: 0.3,
      scale: 1.5,
      opacity: 0,
    });

    gsap.from(this.document.getElementsByClassName('nav__overlay'), {
      duration: 0.5,
      delay: 0.5,
      y: '-100%',
    });

    gsap.from(this.document.getElementsByClassName('nav__txt__overlay'), {
      duration: 0.5,
      delay: 0.7,
      y: '-100%',
    });
  }
}
