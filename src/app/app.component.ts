import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { pageTransitions } from './page-transitions';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { handleCarteState } from './store/actions/cart.action';
import { Product } from './models/product';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(
    private translate: TranslateService,
    public loaderService: LoaderService,
    private authStore: Store<{ auth: any }>,
    private cartStore: Store<{ cart: any }>,
    private cookieService: CookieService
  ) {
    this.auth$ = this.authStore.select('auth');
    this.auth$.subscribe((authData) => {
      this.isAuth = authData.isAuth;
    });
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['fr', 'en']);
    this.translate.use(this.translate?.getBrowserLang() ?? 'en');
  }

  ngOnInit() {
    this.isRtl = this.translate.currentLang === 'ar';
    document.body.dir = this.isRtl ? 'rtl' : 'ltr';

    this.translate.onLangChange.subscribe((event) => {
      this.langChangeSubject.next(event.lang);
      this.isRtl = event.lang === 'ar';
      document.body.dir = this.isRtl ? 'rtl' : 'ltr';
    });

    if (this.isAuth) {
    } else {
      this.cartStore.dispatch(
        handleCarteState({ state: this.getProductsFromCookie() })
      );
    }
  }

  getProductsFromCookie(): Product[] {
    const productsString = this.cookieService.get('cartProducts');
    if (productsString) {
      return JSON.parse(productsString);
    }
    return [];
  }
}
