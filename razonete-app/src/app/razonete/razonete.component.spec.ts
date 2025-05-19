import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RazoneteComponent } from './razonete.component';

describe('RazoneteComponent', () => {
  let component: RazoneteComponent;
  let fixture: ComponentFixture<RazoneteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RazoneteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RazoneteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
