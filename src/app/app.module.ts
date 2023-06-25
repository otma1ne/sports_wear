import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SvgIconDirective } from './shared/svg-icon/svg-icon.directive';
import { ShowcaseComponent } from './home/showcase/showcase.component';
import { CollectionsComponent } from './home/collections/collections.component';

import { SwiperModule } from 'swiper/angular';
import { PrimaryBtnComponent } from './shared/primary-btn/primary-btn.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, SwiperModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
