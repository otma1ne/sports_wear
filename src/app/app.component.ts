import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
import { pageTransitions } from './page-transitions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [pageTransitions],
})
export class AppComponent {
  title = 'sportswear';
  constructor(public loaderService: LoaderService) {}
}
