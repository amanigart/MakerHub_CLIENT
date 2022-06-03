import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersUpdateComponent } from './members-update.component';

describe('MembersUpdateComponent', () => {
  let component: MembersUpdateComponent;
  let fixture: ComponentFixture<MembersUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
