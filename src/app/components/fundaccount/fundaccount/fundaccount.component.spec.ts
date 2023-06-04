import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundaccountComponent } from './fundaccount.component';

describe('FundaccountComponent', () => {
  let component: FundaccountComponent;
  let fixture: ComponentFixture<FundaccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundaccountComponent]
    });
    fixture = TestBed.createComponent(FundaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
