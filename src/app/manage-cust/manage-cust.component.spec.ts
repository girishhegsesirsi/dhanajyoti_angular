import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustComponent } from './manage-cust.component';

describe('ManageCustComponent', () => {
  let component: ManageCustComponent;
  let fixture: ComponentFixture<ManageCustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
