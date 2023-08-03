import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  activeTab: Number = 0;

  switchTabs(value: Number): void {
    this.activeTab = value;
  }
}
