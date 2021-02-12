import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteConfirmation } from './confirmation.component';

describe('DeleteConfirmation', () => {
  let component: DeleteConfirmation;
  let fixture: ComponentFixture<DeleteConfirmation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConfirmation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
