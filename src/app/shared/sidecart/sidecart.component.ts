import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { handleCartState } from 'src/app/store/actions/header.action';

@Component({
  selector: 'app-sidecart',
  templateUrl: './sidecart.component.html',
  styleUrls: ['./sidecart.component.scss'],
})
export class SidecartComponent {
  header$: Observable<any>;
  showCart: boolean = false;

  constructor(private store: Store<{ header: any }>) {
    this.header$ = store.select('header');
    this.header$.subscribe((headerData) => {
      this.showCart = headerData.isCartOpen;
    });
  }

  closeSidecart(): void {
    const body = document.querySelector('body');
    this.store.dispatch(handleCartState({ state: false }));
    body!.style.overflow = 'auto';
  }
}
