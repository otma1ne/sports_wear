import { Component, ViewChild } from '@angular/core';
import SwiperCore, { SwiperOptions, Zoom, EffectFade } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Product } from '../models/product.model';
import { pageTransitions } from '../page-transitions';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ProductCart } from '../models/product_cart.model';
import { Store } from '@ngrx/store';
import { handleCarteState } from '../store/actions/cart.action';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../services/cart.service';
import { handleAddedInfoState } from '../store/actions/quickView.action';
import { Meta, Title } from '@angular/platform-browser';

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

  auth$: Observable<any>;
  isAuth: boolean = false;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private store: Store<{ auth: any }>,
    private cartStore: Store<{ cart: any }>,
    private cookieService: CookieService,
    private cartService: CartService,
    private quickViewStore: Store<{ quickView: any }>,
    protected meta: Meta,
    protected title: Title
  ) {
    this.auth$ = this.store.select('auth');
    this.auth$.subscribe((authData) => {
      this.isAuth = authData.isAuth;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.isLoading = true;
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
          this.product = data.product;
          this.relatedProducts = data.relatedProducts;
          this.isLoading = false;
          this.error = '';
          this.title.setTitle(`Azura | ${this.product?.name ?? ''}`);
          this.meta.updateTag({
            name: 'description',
            content: this.product?.description ?? '',
          });
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

  async handleAddToCart(event: any) {
    event.stopPropagation();
    var products: ProductCart[] = [];
    if (this.isAuth) {
      this.addProductToBd();
    } else {
      this.addProductToCookie();
      products = this.getProductsFromCookie();
      this.cartStore.dispatch(handleCarteState({ state: products }));
      this.quickViewStore.dispatch(handleAddedInfoState({ state: true }));
    }
  }

  addProductToBd() {
    const userId = this.cookieService.get('userId');
    const productId = this.product?.id ?? '';
    const quantity = this.quantity;
    this.cartService.addProductToCart(userId, productId, quantity).subscribe({
      next: (result) => {
        const productCart: ProductCart[] = [];
        result.user.cart.map((cart: any) => {
          const mapedProduct: ProductCart = {
            ...cart.product,
            quantity: cart.quantity,
          };
          productCart.push(mapedProduct);
        });
        this.cartStore.dispatch(handleCarteState({ state: productCart }));
        this.quickViewStore.dispatch(handleAddedInfoState({ state: true }));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToCookie() {
    const products = this.getProductsFromCookie();
    const existingProduct = products.find((p) => p.id === this.product?.id);
    if (existingProduct) {
      existingProduct.quantity += this.quantity;
    } else {
      products.push({ ...this.product!, quantity: this.quantity });
    }
    this.cookieService.set('cartProducts', JSON.stringify(products));
  }

  getProductsFromCookie(): ProductCart[] {
    const productsString = this.cookieService.get('cartProducts');
    if (productsString) {
      return JSON.parse(productsString);
    }
    return [];
  }
}
