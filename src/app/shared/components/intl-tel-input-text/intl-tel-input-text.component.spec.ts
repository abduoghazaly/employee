import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntlTelInputTextComponent } from './intl-tel-input-text.component';

describe('IntlTelInputTextComponent', () => {
  let component: IntlTelInputTextComponent;
  let fixture: ComponentFixture<IntlTelInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntlTelInputTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntlTelInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
