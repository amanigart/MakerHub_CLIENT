import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeltsListComponent } from './belts-list.component';

describe('BeltsListComponent', () => {
  let component: BeltsListComponent;
  let fixture: ComponentFixture<BeltsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeltsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeltsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
