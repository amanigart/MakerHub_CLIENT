import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeltUpdateComponent } from './belt-update.component';

describe('BeltUpdateComponent', () => {
  let component: BeltUpdateComponent;
  let fixture: ComponentFixture<BeltUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeltUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeltUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
