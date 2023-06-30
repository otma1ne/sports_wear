import { Component } from '@angular/core';
import { pageTransitions } from '../page-transitions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [pageTransitions],
})
export class HomeComponent {}
