import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { RelatedProductsComponent } from './shared/related-products/related-products.component';
import { NewsletterPopinComponent } from './shared/newsletter-popin/newsletter-popin.component';
import { StoreModule } from '@ngrx/store';
import { headerReducer } from './store/reducers/header.reducer';
import { EffectsModule } from '@ngrx/effects';
import { newsletterReducer } from './store/reducers/newsletter.reducer';
import { ProductTabsComponent } from './shared/product-tabs/product-tabs.component';
import { SidecartComponent } from './shared/sidecart/sidecart.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { ProductCartComponent } from './shared/product-cart/product-cart.component';
import { authReducer } from './store/reducers/auth.reducer';
import { CookieService } from 'ngx-cookie-service';
import { cartReducer } from './store/reducers/cart.reducer';
import { ProductCardSkeletonComponent } from './shared/product-card-skeleton/product-card-skeleton.component';
import { SearchComponent } from './shared/search/search.component';

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
    RelatedProductsComponent,
    NewsletterPopinComponent,
    ProductTabsComponent,
    SidecartComponent,
    LoginComponent,
    RegisterComponent,
    ProductCartComponent,
    ProductCardSkeletonComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    StoreModule.forRoot({
      header: headerReducer,
      newsletter: newsletterReducer,
      auth: authReducer,
      cart: cartReducer,
    }),
    EffectsModule.forRoot([]),
    NgxSkeletonLoaderModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
