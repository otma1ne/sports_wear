import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Collections2Component } from './collections2.component';

describe('Collections2Component', () => {
  let component: Collections2Component;
  let fixture: ComponentFixture<Collections2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Collections2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Collections2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
