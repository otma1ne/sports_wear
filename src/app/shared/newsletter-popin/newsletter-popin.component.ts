import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { handleNewsletterState } from 'src/app/store/actions/newsletter.action';

@Component({
  selector: 'app-newsletter-popin',
  templateUrl: './newsletter-popin.component.html',
  styleUrls: ['./newsletter-popin.component.scss']
})
export class NewsletterPopinComponent {

  showNewsletter: boolean = false;
  newsletter$: Observable<any>;

  constructor(
    private store: Store<{ newsletter: any }>
  ) {
    this.newsletter$ = store.select('newsletter');
    this.newsletter$.subscribe((headerData) => {
      this.showNewsletter = headerData.isNewsletterOpen;
    });
  }


  closePopin(): void {
    this.store.dispatch(handleNewsletterState({ state : false }));
  }

}
