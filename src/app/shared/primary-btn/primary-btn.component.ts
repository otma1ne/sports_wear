import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-primary-btn',
  templateUrl: './primary-btn.component.html',
  styleUrls: ['./primary-btn.component.scss'],
})
export class PrimaryBtnComponent {
  @Input() textBtn: string = '';
  @Input() theme: string = '';
  @Input() isFull: boolean = false;

  @HostBinding('class.dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  @HostBinding('class.full')
  get isButtonFull(): boolean {
    return this.isFull;
  }
}
