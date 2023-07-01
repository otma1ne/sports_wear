import { Component } from '@angular/core';
import { pageTransitions } from '../page-transitions';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss', './shop_responsive.component.scss'],
  animations: [pageTransitions],
})
export class ShopComponent {
  products: Product[] = [
    {
      id: 'product1',
      name: 'Top Dri FIT Academy',
      images: [
        'Top-Dri-FIT-Academy-1.jpg.webp',
        'Top-Dri-FIT-Academy-2.jpg.webp',
      ],
      rating: 5,
      price: 265,
      isHot: true,
      isSale: false,
    },
    {
      id: 'product2',
      name: 'Short Sleeve T-Shirt',
      images: [
        'Short-Sleeve-T-Shirt-1.jpg.webp',
        'Short-Sleeve-T-Shirt-2.jpg.webp',
      ],
      rating: 3,
      price: 265,
      isHot: true,
      isSale: false,
    },
    {
      id: 'product3',
      name: 'Water Repellent Jacket',
      images: [
        'Water-Repellent-Jacket-1.jpg.webp',
        'Water-Repellent-Jacket-2.jpg.webp',
      ],
      rating: 4,
      price: 265,
      isHot: true,
      isSale: true,
      salePercentage: 10,
    },
    {
      id: 'product4',
      name: 'BackBeat FIT 2100 Grey',
      images: [
        'BackBeat-FIT-2100-Grey.jpg.webp',
        'BackBeat-FIT-2100-Grey1.jpg.webp',
      ],
      rating: 4,
      price: 265,
      isHot: true,
      isSale: false,
    },
    {
      id: 'product3',
      name: 'Water Repellent Jacket',
      images: [
        'Water-Repellent-Jacket-1.jpg.webp',
        'Water-Repellent-Jacket-2.jpg.webp',
      ],
      rating: 4,
      price: 265,
      isHot: true,
      isSale: true,
      salePercentage: 10,
    },
    {
      id: 'product1',
      name: 'Top Dri FIT Academy',
      images: [
        'Top-Dri-FIT-Academy-1.jpg.webp',
        'Top-Dri-FIT-Academy-2.jpg.webp',
      ],
      rating: 5,
      price: 265,
      isHot: true,
      isSale: false,
    },
    {
      id: 'product2',
      name: 'Short Sleeve T-Shirt',
      images: [
        'Short-Sleeve-T-Shirt-1.jpg.webp',
        'Short-Sleeve-T-Shirt-2.jpg.webp',
      ],
      rating: 3,
      price: 265,
      isHot: true,
      isSale: false,
    },
  ];
}
