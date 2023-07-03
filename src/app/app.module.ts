import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SvgIconDirective } from './shared/svg-icon/svg-icon.directive';
import { ShowcaseComponent } from './home/showcase/showcase.component';
import { CollectionsComponent } from './home/collections/collections.component';

import { PrimaryBtnComponent } from './shared/primary-btn/primary-btn.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';

import { SwiperModule } from 'swiper/angular';
import { StarRatingModule } from 'angular-star-rating';
import { Collections2Component } from './home/collections2/collections2.component';
import { BrandsComponent } from './home/brands/brands.component';
import { NewsletterComponent } from './home/newsletter/newsletter.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ShopComponent } from './shop/shop.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PdpComponent } from './pdp/pdp.component';
import { SecondaryBtnComponent } from './shared/secondary-btn/secondary-btn.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    SvgIconDirective,
    ShowcaseComponent,
    CollectionsComponent,
    PrimaryBtnComponent,
    CategoriesComponent,
    ProductCardComponent,
    Collections2Component,
    BrandsComponent,
    NewsletterComponent,
    LoaderComponent,
    ShopComponent,
    PdpComponent,
    SecondaryBtnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StarRatingModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
