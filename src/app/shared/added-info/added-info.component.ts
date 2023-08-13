import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { handleAddedInfoState } from 'src/app/store/actions/quickView.action';

@Component({
  selector: 'app-added-info',
  templateUrl: './added-info.component.html',
  styleUrls: ['./added-info.component.scss'],
})
export class AddedInfoComponent {
  @ViewChild('progress') progress?: ElementRef;
  isInfoShowed: boolean = false;
  quickView$: Observable<any>;

  constructor(private quickView: Store<{ quickView: any }>) {
    this.quickView$ = this.quickView.select('quickView');
    this.quickView$.subscribe((data) => {
      this.isInfoShowed = data.showAddedInfo;
      if (this.progress && this.isInfoShowed) {
        const element = this.progress?.nativeElement;
        setTimeout(() => {
          element.style.width = '100%';
        }, 1);
        const interval = setInterval(() => {
          this.quickView.dispatch(handleAddedInfoState({ state: false }));
          element.style.width = '0%';
          clearInterval(interval);
        }, 3000);
      }
    });
  }
}
