import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCart } from 'src/app/models/product_cart.model';

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

  constructor() {}

  onPlaceOrder(): void {
    this.switchTabs.emit('tracking');
  }

  onPromoCode(event: any): void {
    this.hasPromoCode = event.target.checked;
  }
}
