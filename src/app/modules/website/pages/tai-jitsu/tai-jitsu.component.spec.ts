import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiJitsuComponent } from './tai-jitsu.component';

describe('TaiJitsuComponent', () => {
  let component: TaiJitsuComponent;
  let fixture: ComponentFixture<TaiJitsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaiJitsuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiJitsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
