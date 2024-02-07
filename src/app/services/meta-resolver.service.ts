import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MetaResolverService {
  constructor(protected meta: Meta, protected title: Title) {}

  resolve(route: ActivatedRouteSnapshot): any {
    const path = route.routeConfig?.path;
    switch (path) {
      case '':
        this.title.setTitle('Azura | Home page');
        this.meta.updateTag({
          name: 'description',
          content: 'Azura website | Home page description',
        });
        break;

      case 'shop':
        this.title.setTitle('Azura | Shop');
        this.meta.updateTag({
          name: 'description',
          content: 'Azura website | Shop description',
        });
        break;

      default:
        this.title.setTitle('Azura');
        this.meta.updateTag({
          name: 'description',
          content: 'Azura website | Default description',
        });
        break;
    }
  }
}
