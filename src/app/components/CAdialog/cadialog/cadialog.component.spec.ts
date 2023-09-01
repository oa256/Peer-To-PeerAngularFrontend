import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAdialogComponent } from './cadialog.component';

describe('CAdialogComponent', () => {
  let component: CAdialogComponent;
  let fixture: ComponentFixture<CAdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CAdialogComponent]
    });
    fixture = TestBed.createComponent(CAdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
