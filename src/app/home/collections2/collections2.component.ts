import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections2',
  templateUrl: './collections2.component.html',
  styleUrls: ['./collections2.component.scss'],
})
export class Collections2Component {
  constructor(private router: Router) {}

  handleNavigate(path: string) {
    this.router.navigate(['/shop'], { queryParams: { category: path } });
  }
}
