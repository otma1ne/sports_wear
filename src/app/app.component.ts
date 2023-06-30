import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
import { pageTransitions } from './page-transitions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [pageTransitions],
})
export class AppComponent {
  title = 'sportswear';

  constructor(
    private translate: TranslateService,
    public loaderService: LoaderService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['fr', 'en']);
    this.translate.use(this.translate?.getBrowserLang() ?? 'en');
  }
}
