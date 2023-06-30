import { Component } from '@angular/core';
import { pageTransitions } from '../page-transitions';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: [pageTransitions],
})
export class ShopComponent {}
