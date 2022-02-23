import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermDepositAccountComponent } from './term-deposit-account.component';

describe('TermDepositAccountComponent', () => {
  let component: TermDepositAccountComponent;
  let fixture: ComponentFixture<TermDepositAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermDepositAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermDepositAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
