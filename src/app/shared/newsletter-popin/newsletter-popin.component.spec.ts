import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterPopinComponent } from './newsletter-popin.component';

describe('NewsletterPopinComponent', () => {
  let component: NewsletterPopinComponent;
  let fixture: ComponentFixture<NewsletterPopinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterPopinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterPopinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
