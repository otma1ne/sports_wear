import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { pageTransitions } from './page-transitions';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { handleCarteState } from './store/actions/cart.action';
import { Product } from './models/product.model';
import { CookieService } from 'ngx-cookie-service';
import { ProductCart } from './models/product_cart.model';
import { handleAuthState, handleUserState } from './store/actions/auth.action';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [pageTransitions],
})
export class AppComponent {
  title = 'sportswear';
  langChangeSubject: Subject<string> = new Subject<string>();
  isRtl: boolean = false;
  auth$: Observable<any>;
  isAuth: boolean = false;
  userId: string = '';

  constructor(
    public loaderService: LoaderService,
    private translate: TranslateService,
    private authStore: Store<{ auth: any }>,
    private cartStore: Store<{ cart: any }>,
    private cookieService: CookieService,
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.auth$ = this.authStore.select('auth');
    this.auth$.subscribe((authData) => {
      this.isAuth = authData.isAuth;
      this.userId = authData.userId;
      if (this.isAuth && this.userId) {
        const cartItems: { productId: string; quantity: number }[] = [];
        const cookieProducts = this.getProductsFromCookie();
        cookieProducts.map((cookieProduct) => {
          cartItems.push({
            productId: cookieProduct.id,
            quantity: cookieProduct.quantity,
          });
        });
        if (cartItems.length > 0) {
          this.cartService.addProductsToCart(this.userId, cartItems).subscribe({
            next: (res) => {
              this.getUserProduct();
              cookieService.delete('cartProducts');
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
        this.getUserProduct();
      } else {
        this.cartStore.dispatch(
          handleCarteState({ state: this.getProductsFromCookie() })
        );
      }
    });
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['fr', 'en']);
    this.translate.use(this.translate?.getBrowserLang() ?? 'en');
  }

  ngOnInit() {
    this.checkAuth();
    this.isRtl = this.translate.currentLang === 'ar';
    document.body.dir = this.isRtl ? 'rtl' : 'ltr';

    this.translate.onLangChange.subscribe((event) => {
      this.langChangeSubject.next(event.lang);
      this.isRtl = event.lang === 'ar';
      document.body.dir = this.isRtl ? 'rtl' : 'ltr';
    });
  }

  getProductsFromCookie(): ProductCart[] {
    const productsString = this.cookieService.get('cartProducts');
    if (productsString) {
      return JSON.parse(productsString);
    }
    return [];
  }

  getUserProduct() {
    const token = this.cookieService.get('auth_token');
    this.authService.getUser(token).subscribe({
      next: (res) => {
        const items = res.cart;
        const cartItems: any = [];
        items?.map((item) => {
          cartItems.push({
            quantity: item.quantity,
            ...item.product,
          });
        });
        this.cartStore.dispatch(handleCarteState({ state: cartItems }));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  checkAuth(): void {
    if (this.cookieService.get('is_auth') === 'true') {
      this.authStore.dispatch(handleAuthState({ state: true }));
      this.authStore.dispatch(
        handleUserState({ state: this.cookieService.get('userId') })
      );
    }
  }
}
