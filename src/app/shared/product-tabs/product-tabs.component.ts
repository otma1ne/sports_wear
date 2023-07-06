import { Component } from '@angular/core';

@Component({
  selector: 'app-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.scss'],
})
export class ProductTabsComponent {
  activeTab: number = 0;

  changeTab(index: number): void {
    this.activeTab = index;
  }
}
