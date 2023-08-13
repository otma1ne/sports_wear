import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.scss'],
})
export class Tab3Component {
  @Input() cartTotal: number = 0;

  constructor(private router: Router) {}

  backToShop() {
    this.router.navigate(['/']);
  }
}
