import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isScrolled: boolean = false;
  isSideMenuActive: boolean = false;

  constructor(private translate: TranslateService, private router: Router) {
    translate.setDefaultLang('en');
  }

  switchLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;
    this.translate.use(lang);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  hnadleMenuClick(value: boolean): void {
    this.isSideMenuActive = value;
  }

  handleMenuItemClick(path: string): void {
    this.router.navigate([path]);
    this.isSideMenuActive = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 0;
  }
}
