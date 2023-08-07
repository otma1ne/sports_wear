import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  activeTab: string = '';

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      this.activeTab = params['activeTab'] || '';
    });
  }

  switchTabs(value: string): void {
    this.activeTab = value;
  }
}
