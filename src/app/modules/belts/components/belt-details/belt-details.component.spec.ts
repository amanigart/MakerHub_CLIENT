import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeltDetailsComponent } from './belt-details.component';

describe('BeltDetailsComponent', () => {
  let component: BeltDetailsComponent;
  let fixture: ComponentFixture<BeltDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeltDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeltDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
