import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SighinViewComponent } from './sighin-view.component';

describe('SighinViewComponent', () => {
  let component: SighinViewComponent;
  let fixture: ComponentFixture<SighinViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SighinViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SighinViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
