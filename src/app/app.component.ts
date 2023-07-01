import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
import { pageTransitions } from './page-transitions';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [pageTransitions],
})
export class AppComponent {
  title = 'sportswear';
  langChangeSubject: Subject<string> = new Subject<string>();
  isRtl: boolean = false;

  constructor(
    private translate: TranslateService,
    public loaderService: LoaderService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['fr', 'en']);
    this.translate.use(this.translate?.getBrowserLang() ?? 'en');
  }

  ngOnInit() {
    this.isRtl = this.translate.currentLang === 'ar';
    document.body.dir = this.isRtl ? 'rtl' : 'ltr';

    this.translate.onLangChange.subscribe((event) => {
      this.langChangeSubject.next(event.lang);
      this.isRtl = event.lang === 'ar';
      document.body.dir = this.isRtl ? 'rtl' : 'ltr';
    });
  }
}
