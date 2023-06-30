import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { pageTransitions } from '../page-transitions';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: [pageTransitions],
})
export class ShopComponent {
  constructor(private translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');

    // Add additional supported languages
    this.translate.addLangs(['fr', 'en']);

    // Use browser language as the fallback
    this.translate.use(this.translate?.getBrowserLang() ?? 'en');
  }
}
