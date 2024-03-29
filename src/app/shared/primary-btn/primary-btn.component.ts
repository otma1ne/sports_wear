import {
  Component,
  Input,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-primary-btn',
  templateUrl: './primary-btn.component.html',
  styleUrls: ['./primary-btn.component.scss'],
})
export class PrimaryBtnComponent {
  @Input() textBtn: string = '';
  @Input() theme: string = '';
  @Input() isFull: boolean = false;
  @Input() isLarge: boolean = false;
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;

  @Output() onClick = new EventEmitter<any>();

  @HostBinding('class.dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  @HostBinding('class.full')
  get isButtonFull(): boolean {
    return this.isFull;
  }

  @HostBinding('class.large')
  get isButtonLarge(): boolean {
    return this.isLarge;
  }

  btnClick(e: Event) {
    e.preventDefault();
    this.onClick.emit();
  }
}
