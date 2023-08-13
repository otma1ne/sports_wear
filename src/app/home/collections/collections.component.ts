import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent {
  constructor(private router: Router) {}

  handleNavigate(path: string) {
    this.router.navigate(['/shop'], { queryParams: { category: path } });
  }
}
