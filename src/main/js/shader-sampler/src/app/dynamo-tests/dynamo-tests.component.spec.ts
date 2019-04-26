import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamoTestsComponent } from './dynamo-tests.component';

describe('DynamoTestsComponent', () => {
  let component: DynamoTestsComponent;
  let fixture: ComponentFixture<DynamoTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamoTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamoTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
