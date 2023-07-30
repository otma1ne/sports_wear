import { Component } from '@angular/core';

@Component({
  selector: 'app-product-card-skeleton',
  templateUrl: './product-card-skeleton.component.html',
  styleUrls: ['./product-card-skeleton.component.scss'],
})
export class ProductCardSkeletonComponent {
  theme_img = { borderRadius: '4px', width: '100%', height: '100%', margin: 0};
  theme_text = { borderRadius: '4px', width: '70%', height: '20px', margin: 0, marginTop : "4px"};
}
