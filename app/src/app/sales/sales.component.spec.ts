import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalseComponent } from './salse.component';

describe('SalseComponent', () => {
  let component: SalseComponent;
  let fixture: ComponentFixture<SalseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
