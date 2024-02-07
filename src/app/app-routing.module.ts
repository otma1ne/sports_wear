import { NgModule } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
  Routes,
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { LoaderService } from './services/loader.service';
import { filter } from 'rxjs/operators';
import { PdpComponent } from './pdp/pdp.component';
import { CartComponent } from './cart/cart.component';
import { MetaResolverService } from './services/meta-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      metaData: MetaResolverService,
    },
  },
  {
    path: 'shop',
    component: ShopComponent,
    resolve: {
      metaData: MetaResolverService,
    },
  },
  {
    path: 'product/:id',
    component: PdpComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router, private loaderService: LoaderService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.loaderService.show();
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loaderService.hide();
      });
  }
}
