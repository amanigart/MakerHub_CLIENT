import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiuJitsuComponent } from './jiu-jitsu.component';

describe('JiuJitsuComponent', () => {
  let component: JiuJitsuComponent;
  let fixture: ComponentFixture<JiuJitsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JiuJitsuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JiuJitsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
