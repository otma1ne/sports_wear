import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ProductCart } from 'src/app/models/product_cart.model';
import { CartService } from 'src/app/services/cart.service';
import { handleCarteState } from 'src/app/store/actions/cart.action';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.scss'],
})
export class Tab2Component {
  @Input() productsCart: ProductCart[] = [];
  @Input() cartTotal: number = 0;
  @Output() switchTabs = new EventEmitter<any>();

  hasPromoCode: boolean = false;
  showAlert: boolean = false;
  isAuth: boolean = false;
  auth$: Observable<any>;
  orderForm: FormGroup;
  showError: boolean = false;

  constructor(
    private authStore: Store<{ auth: any }>,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private cookieService: CookieService,
    private cartStore: Store<{ cart: any }>
  ) {
    this.auth$ = this.authStore.select('auth');
    this.auth$.subscribe((data) => {
      this.isAuth = data.isAuth;
    });
    this.orderForm = this.formBuilder.group({
      email: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
      promoCode: [''],
    });
  }

  onPromoCode(event: any): void {
    this.hasPromoCode = event.target.checked;
  }

  handlePlaceOrder() {
    if (this.canSubmit()) {
      if (this.isAuth) {
        const userId = this.cookieService.get('userId');
        this.cartService.checkoutCart(userId).subscribe({
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
            this.switchTabs.emit('tracking');
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.showAlert = true;
      }
    }
  }

  closeAlert() {
    this.showAlert = false;
  }

  canSubmit(): boolean {
    this.showError = true;
    return this.orderForm.valid;
  }
}
