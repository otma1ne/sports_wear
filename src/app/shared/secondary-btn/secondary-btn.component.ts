import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-secondary-btn',
  templateUrl: './secondary-btn.component.html',
  styleUrls: ['./secondary-btn.component.scss'],
})
export class SecondaryBtnComponent {
  @Input() textBtn: String = '';
  @Input() isFull: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() onClick = new EventEmitter<any>();

  btnClick(e: Event) {
    e.preventDefault();
    this.onClick.emit();
  }
}
