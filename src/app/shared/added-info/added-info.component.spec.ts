import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedInfoComponent } from './added-info.component';

describe('AddedInfoComponent', () => {
  let component: AddedInfoComponent;
  let fixture: ComponentFixture<AddedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
