import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-primary-btn',
  templateUrl: './primary-btn.component.html',
  styleUrls: ['./primary-btn.component.scss'],
})
export class PrimaryBtnComponent {
  @Input() textBtn: String = '';
  @Input() theme: String = '';
}
